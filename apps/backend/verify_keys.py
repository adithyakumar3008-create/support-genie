import os
from dotenv import load_dotenv
import google.generativeai as genai
from supabase import create_client

# Force Request to use correct SSL/Session adapter if needed (often helps in restricted envs)
import requests

load_dotenv()

print("--- 🔐 KEY VERIFICATION PROTOCOL ---")

# 1. SUPABASE CHECK
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")
print(f"\n[1/3] Checking Supabase...")
print(f"      URL: {sb_url[:10]}..." if sb_url else "      URL: ❌ MISSING")
print(f"      KEY: {sb_key[:10]}..." if sb_key else "      KEY: ❌ MISSING")

if sb_url and sb_key:
    try:
        # Test Connection by fetching profiles
        sb = create_client(sb_url, sb_key)
        res = sb.table("profiles").select("*", count="exact").limit(1).execute()
        print(f"      ✅ Connection SUCCESS.")
        print(f"      ✅ Profiles Found: {len(res.data) if res.data else 0}")
    except Exception as e:
        print(f"      ❌ Connection FAILED: {str(e)}")
else:
    print("      ⚠️ Skipping Connection Test (Credentials Missing)")

# 2. GEMINI CHECK
gemini_key = os.getenv("GOOGLE_API_KEY")
print(f"\n[2/3] Checking Gemini (Google AI)...")
print(f"      KEY: {gemini_key[:10]}..." if gemini_key else "      KEY: ❌ MISSING")

if gemini_key:
    try:
        genai.configure(api_key=gemini_key)
        model = genai.GenerativeModel("gemini-1.5-flash") # Use a lightweight model for ping
        resp = model.generate_content("Ping")
        text = resp.text.strip()
        print(f"      ✅ Connection SUCCESS.")
        print(f"      ✅ Model Replied: {text}")
    except Exception as e:
        print(f"      ❌ Connection FAILED: {str(e)}")
else:
    print("      ⚠️ Skipping Connection Test (Credentials Missing)")

print("\n--- END PROTOCOL ---")
