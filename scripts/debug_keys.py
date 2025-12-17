import os
import requests
from dotenv import load_dotenv

# Explicitly load from backend env
env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
load_dotenv(dotenv_path=env_path)

print("--- KEY DEBUGGER ---")
print("Writing detailed logs to key_audit.txt...")

g_key = os.environ.get("GOOGLE_API_KEY", "")
models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-pro", "gemini-1.5-pro-latest"]

with open("key_audit.txt", "w", encoding="utf-8") as log:
    log.write(f"GOOGLE_KEY_PREFIX: {g_key[:10]}...\n")
    
    if len(g_key) < 20:
        log.write("❌ Key too short/empty.\n")
    else:
        for m in models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={g_key}"
            data = {"contents": [{"parts": [{"text": "Hello"}]}]}
            try:
                res = requests.post(url, json=data)
                log.write(f"[{m}] Status: {res.status_code}\n")
                if res.status_code != 200:
                    log.write(f"   Error: {res.text[:200]}\n")
                else:
                    log.write("   ✅ SUCCESS\n")
            except Exception as e:
                log.write(f"[{m}] Exception: {e}\n")

# Supabase Check
s_url = os.environ.get("SUPABASE_URL", "")
s_key = os.environ.get("SUPABASE_KEY", "")
with open("key_audit.txt", "a", encoding="utf-8") as log:
    log.write(f"\nSUPABASE_URL: {s_url}\n")
    if not s_url or not s_key:
         log.write("❌ Supabase Creds Missing\n")
    else:
        headers = {"apikey": s_key, "Authorization": f"Bearer {s_key}"}
        try:
            res = requests.get(f"{s_url}/rest/v1/", headers=headers)
            log.write(f"Supabase Status: {res.status_code}\n")
        except Exception as e:
            log.write(f"Supabase Exception: {e}\n")
            
print("Done. Check key_audit.txt")
