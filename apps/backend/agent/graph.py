import os
import json
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from apps.backend.agent.state import AgentState
from apps.backend.agent.prompts import get_system_prompt
from apps.backend.agent.agent_tools import evaluate_refund, visual_forensics
import google.generativeai as genai

KEY = os.getenv("GOOGLE_API_KEY")
if KEY:
    genai.configure(api_key=KEY)

# --- NODES ---

def perceive_node(state: AgentState):
    """
    Multimodal Perception: Text/Audio/Image -> Lang/Emotion
    """
    print("🧠 PERCEIVING...")
    user_msg = state["messages"][-1].content
    
    # Defaults
    detected_lang = "en"
    detected_emotion = "neutral"
    image_analysis = {}

    # 1. VISION CHECK
    if state.get("image_bytes"):
        print("   🖼️ Image Detected. Analyzing...")
        image_analysis = visual_forensics(state["image_bytes"])
        user_msg += f"\n[SYSTEM: Image Analysis Result: {json.dumps(image_analysis)}]"
    
    # 2. INTELLIGENT PERCEPTION (Gemini 1.5 Flash)
    print("   🤔 Classifying Intent/Lang...")
    try:
        clf_model = genai.GenerativeModel("gemini-1.5-flash")
        clf_prompt = f"""
        Analyze this input: "{user_msg}"
        Return JSON ONLY:
        {{
            "language": "hi" or "te" or "en" (ISO code),
            "emotion": "angry" or "happy" or "neutral" or "confused"
        }}
        """
        clf_res = clf_model.generate_content(clf_prompt)
        text_res = clf_res.text.replace("```json", "").replace("```", "").strip()
        perception_data = json.loads(text_res)
        
        detected_lang = perception_data.get("language", "en")
        detected_emotion = perception_data.get("emotion", "neutral")
    except Exception as e:
        print(f"   ⚠️ Perception Model Error: {e}")
        # Fallbacks
        detected_lang = "en"
        detected_emotion = "neutral"
        
    print(f"   Detected: {detected_lang} | {detected_emotion}")
    
    # 3. REFUND CHECK (If context implies)
    # If image + refund word?
    refund_result = None
    if "refund" in user_msg.lower() or "return" in user_msg.lower() or image_analysis.get('damage_detected'):
        refund_result = evaluate_refund(state['phone_number'], image_analysis)
        user_msg += f"\n[SYSTEM: Refund Audit: {json.dumps(refund_result)}]"

    # --- LOGGING (GOD MODE) ---
    try:
        from supabase import create_client
        sb_log = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])
        sb_log.table("thought_logs").insert({
            "session_id": state['phone_number'],
            "step_name": "Perception",
            "thought_content": f"Lang: {detected_lang} | Emotion: {detected_emotion} | Vision: {bool(image_analysis)}",
            "detected_language": detected_lang,
            "detected_emotion": detected_emotion
        }).execute()
    except Exception as e:
        print(f"Log Error: {e}")

    # Update Message with Context
    return {
        "language": detected_lang, 
        "emotion": detected_emotion, 
        "messages": [HumanMessage(content=user_msg)],
        "next_node": "response_gen"
    }

def response_gen_node(state: AgentState):
    """
    Generates Answer based on Persona
    """
    prompt = get_system_prompt(state["language"], state["emotion"])
    user_msg = state["messages"][-1].content
    
    # Real Generation
    # Strategy: Try 1.5 Pro (Brain) -> Fallback to 1.5 Flash (Speed) -> Error
    
    content_parts = [prompt, user_msg]
    if state.get("audio_bytes"):
         # Native Audio Blob (Twilio usually sends audio/ogg)
         # Ensure we label it correctly for Gemini
         content_parts.append({"mime_type": "audio/ogg", "data": state["audio_bytes"]})
    
    ans = ""
    # LEVEL 1: PRO + AUDIO
    try:
        print("   🧠 TRY 1: Gemini 1.5 Pro (Multimodal)")
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(content_parts)
        ans = response.text
    except Exception as e1:
        print(f"   ⚠️ L1 Failed: {e1}")
        
        # LEVEL 2: FLASH + AUDIO
        try:
            print("   ⚡ TRY 2: Gemini 1.5 Flash (Multimodal)")
            model_flash = genai.GenerativeModel("gemini-1.5-flash")
            response_flash = model_flash.generate_content(content_parts)
            ans = response_flash.text
        except Exception as e2:
             print(f"   ❌ L2 Failed: {e2}")
             
             # LEVEL 3: FAILURE RESPONSE (Text Only)
             # If audio failed, we can't "hear", so we must apologize.
             ans = "I am unable to process your audio message right now due to a network issue. Please type your message."
             print("   🏳️ L3: Returning Text Fallback.")

    return {"messages": [AIMessage(content=ans)], "next_node": END}

# --- GRAPH ---
workflow = StateGraph(AgentState)
workflow.add_node("perceive", perceive_node)
workflow.add_node("response_gen", response_gen_node)

workflow.set_entry_point("perceive")
workflow.add_edge("perceive", "response_gen")
workflow.add_edge("response_gen", END)

app_graph = workflow.compile()
