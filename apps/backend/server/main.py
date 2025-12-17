from dotenv import load_dotenv
load_dotenv() # MUST BE FIRST

import os
import sys
import traceback
from fastapi import FastAPI, Request, Response
import uvicorn
from apps.backend.agent.graph import app_graph
from langchain_core.messages import HumanMessage
import requests

# Load .env file
load_dotenv()

app = FastAPI()

@app.get("/")
def health_check():
    return "GDG Agentathon Backend: ACTIVE (Polyglot Mode)"

@app.post("/webhook")
async def webhook(request: Request):
    print("🔔 WEBHOOK RECEIVED!", file=sys.stderr)
    try:
        # 1. Parse Data
        data = {}
        try:
            form_data = await request.form()
            data = dict(form_data)
        except:
            body = await request.body()
            from urllib.parse import parse_qs
            decoded_body = body.decode('utf-8')
            parsed = parse_qs(decoded_body)
            data = {k: v[0] for k, v in parsed.items()}

        user_msg = data.get('Body', '').strip()
        user_phone = data.get('From', '').replace("whatsapp:", "")
        media_url = data.get('MediaUrl0', '')
        media_type = data.get('MediaContentType0', '')

        # 2. Handle Media (Audio/Image)
        audio_data = None
        image_data = None
        
        if media_url:
            print(f"📦 Media Detected: {media_type}", file=sys.stderr)
            try:
                # Use User/Pass if Twilio requires, but usually public URL within 2 hours
                # Or use requests.auth.HTTPBasicAuth(SID, TOKEN)
                m_res = requests.get(media_url) 
                
                if 'audio' in media_type:
                     audio_data = m_res.content
                     user_msg += " [AUDIO SENT]"
                elif 'image' in media_type:
                     image_data = m_res.content
                     user_msg += " [IMAGE SENT]"
                     
            except Exception as e:
                print(f"⚠️ Media Download Error: {e}")

        # 3. Invoke Agent
        initial_state = {
            "messages": [HumanMessage(content=user_msg)],
            "phone_number": user_phone,
            "next_node": "",
            "audio_bytes": audio_data,
            "image_bytes": image_data,
            "language": "en", # Default
            "emotion": "neutral" # Default
        }
        
        result = app_graph.invoke(initial_state)
        final_response = result["messages"][-1].content
        
        # 4. XML Response (Polyglot)
        import html
        from apps.backend.utils.voice_generator import generate_voice
        
        secure_resp = html.escape(final_response)
        
        # --- LOG USER MSG ---
        try:
            from supabase import create_client
            sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])
            
            # Log User Input
            sb.table("messages").insert({
               "session_id": user_phone,
               "sender": "user",
               "content": user_msg,
               "msg_type": media_type or "text"
            }).execute()
        except Exception as e:
             print(f"⚠️ Log Error: {e}")

        # --- LOG AGENT RESPONSE ---
        try:
            sb.table("messages").insert({
               "session_id": user_phone,
               "sender": "agent",
               "content": final_response,
               "msg_type": "text" # Agent always returns text content internally, even if TTS later
            }).execute()
        except:
            pass

        # Voice Generation (If input was audio)
        voice_url = ""
        if audio_data:
             lang_code = result.get("language", "en") 
             voice_url = generate_voice(final_response, lang_code)
        
        if voice_url:
            twiml_resp = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>{voice_url}</Play>
</Response>"""
        else:
            twiml_resp = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{secure_resp}</Message>
</Response>"""
        
        return Response(content=twiml_resp, media_type="application/xml")

    except Exception as GlobalErr:
        print(f"🔥 CRITICAL FAILURE: {GlobalErr}", file=sys.stderr)
        traceback.print_exc()
        return Response(content=f"<?xml version='1.0'?><Response><Message>Error: {str(GlobalErr)}</Message></Response>", media_type="application/xml")

if __name__ == "__main__":
    print("🚀 GDG AGENT LISTENING ON 8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
