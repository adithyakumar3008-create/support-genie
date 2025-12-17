import os
import json
from datetime import datetime, timezone
import google.generativeai as genai
from supabase import create_client

# Connect DB
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

# Connect Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model_flash = genai.GenerativeModel("gemini-1.5-flash") # Fast for tools

def visual_forensics(image_bytes: bytes) -> dict:
    """
    Analyzes an image for damage using Gemini Vision.
    """
    print("👁️ VISUAL FORENSICS: Analyzing Image...")
    try:
        prompt = """
        Analyze this product image for a Refund Claim.
        Return JSON ONLY:
        {
            "item_identified": "string",
            "damage_detected": true/false,
            "damage_description": "string (concise)",
            "condition_rating": "New/Used/Destroyed"
        }
        """
        # Gemini accepts bytes dict
        cookie_picture = {"mime_type": "image/jpeg", "data": image_bytes}
        
        response = model_flash.generate_content([prompt, cookie_picture])
        # Naive JSON extract (in production use structured output)
        txt = response.text.replace("```json", "").replace("```", "").strip()
        analysis = json.loads(txt)
        return analysis
    except Exception as e:
        print(f"   ⚠️ Vision Error: {e}")
        return {"damage_detected": False, "error": str(e)}

def evaluate_refund(phone_number: str, image_analysis: dict) -> dict:
    """
    Audits refund eligibility against Policy DB.
    """
    print(f"⚖️ REFUND AUDITOR: Checking for {phone_number}...")
    
    # 1. Fetch User & Recent Order
    # Assuming we match by phone -> user_id -> latest order
    # (Simplified for Hackathon)
    
    try:
        # Get User ID
        usr = supabase.table("users").select("id").eq("phone_number", phone_number).limit(1).execute()
        if not usr.data:
            return {"approved": False, "reason": "User not found in database. Please ask admin to add your number."}
        uid = usr.data[0]['id']
        
        # Get Latest Order
        ord_res = supabase.table("orders").select("*").eq("user_id", uid).order("order_date", desc=True).limit(1).execute()
        if not ord_res.data:
             return {"approved": False, "reason": "No recent orders found."}
        
        order = ord_res.data[0]
        print(f"   Found Order: {order['item_name']} ({order['amount_inr']} INR)")
        
        # 2. Check Order Age Strategy
        # Fetch Policy for 'Electronics' (Hardcoded mapping for demo or infer from item)
        # We will assume everything is 'Electronics' for this demo unless specified.
        policy = supabase.table("refund_policies").select("*").eq("category", "Electronics").single().execute()
        wallet = policy.data
        
        order_date = datetime.fromisoformat(order["order_date"].replace('Z', '+00:00'))
        age_hours = (datetime.now(timezone.utc) - order_date).total_seconds() / 3600
        
        print(f"   Order Age: {age_hours:.1f} hours. Policy Max: {wallet['auto_approval_window_hours']} hours.")
        
        if age_hours > wallet['auto_approval_window_hours']:
             return {"approved": False, "reason": "Refund window expired (7 Days)."}
             
        # 3. Check Damage Evidence
        if wallet['requires_image']:
             if not image_analysis.get('damage_detected'):
                  return {"approved": False, "reason": "No visible damage in proof."}
                  
        # 4. Success
        # Mark as Refunded
        supabase.table("orders").update({"status": "Refunded"}).eq("id", order['id']).execute()
        
        return {
            "approved": True, 
            "reason": f"Valid claim. {image_analysis['damage_description']}",
            "amount": order['amount_inr']
        }

    except Exception as e:
        return {"approved": False, "reason": f"System Error: {str(e)}"}
