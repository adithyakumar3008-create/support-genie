import os
import requests
import socket
from dotenv import load_dotenv
import base64

# Load Environment
env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
load_dotenv(dotenv_path=env_path)

print("\n🔍 --- SUPPORTGENIE DIAGNOSTIC (Protocol: HTTP) --- 🔍\n")

# 1. GOOGLE GEMINI CHECK (REST API)
print("1. [Testing] Google Gemini API...")
g_key = os.environ.get("GOOGLE_API_KEY")
if not g_key:
    print("❌ FAILED: GOOGLE_API_KEY missing")
else:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={g_key}"
    data = {"contents": [{"parts": [{"text": "Hello"}]}]}
    try:
        res = requests.post(url, json=data)
        if res.status_code == 200:
            print("✅ SUCCESS: Google API Valid (200 OK).")
        else:
            print(f"❌ FAILED: Google API Error {res.status_code}: {res.text}")
    except Exception as e:
        print(f"❌ FAILED: Connection Error: {e}")

# 2. SUPABASE CHECK (REST API)
print("\n2. [Testing] Supabase Connection...")
sb_url = os.environ.get("SUPABASE_URL")
sb_key = os.environ.get("SUPABASE_KEY")
if not sb_url or not sb_key:
    print("❌ FAILED: Credentials missing")
else:
    headers = {"apikey": sb_key, "Authorization": f"Bearer {sb_key}"}
    url = f"{sb_url}/rest/v1/agent_events?select=count&limit=1"
    try:
        res = requests.get(url, headers=headers)
        if res.status_code == 200:
            print("✅ SUCCESS: Supabase Connected (200 OK).")
        else:
            print(f"❌ FAILED: Supabase Error {res.status_code}: {res.text}")
    except Exception as e:
        print(f"❌ FAILED: Connection Error: {e}")

# 3. TWILIO CHECK (REST API)
print("\n3. [Testing] Twilio Credentials...")
sid = os.environ.get("TWILIO_ACCOUNT_SID")
token = os.environ.get("TWILIO_AUTH_TOKEN")
if not sid or not token:
    print("❌ FAILED: Credentials missing")
else:
    url = f"https://api.twilio.com/2010-04-01/Accounts/{sid}.json"
    auth = (sid, token)
    try:
        res = requests.get(url, auth=auth)
        if res.status_code == 200:
            name = res.json().get("friendly_name")
            print(f"✅ SUCCESS: Twilio Authenticated ('{name}').")
        else:
            print(f"❌ FAILED: Twilio Error {res.status_code}")
    except Exception as e:
        print(f"❌ FAILED: Connection Error: {e}")

# 4. BACKEND PORT CHECK
print("\n4. [Testing] Backend Port 8000...")
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(2)
    s.connect(('127.0.0.1', 8000))
    print("✅ SUCCESS: Backend is listening on Port 8000.")
    s.close()
except:
    print("❌ FAILED: Port 8000 is unreachable.")

print("\n-------------------------------------------")
