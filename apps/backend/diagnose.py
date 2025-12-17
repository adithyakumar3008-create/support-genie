import socket
import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

print("=== SUPPORTGENIE DIAGNOSTICS ===\n")

# 1. Check if port 8000 is in use
def check_port():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', 8000))
    sock.close()
    if result == 0:
        print("✅ Port 8000: SERVER IS RUNNING")
        return True
    else:
        print("❌ Port 8000: NO SERVER DETECTED")
        return False

# 2. Check environment variables
def check_env():
    required = ["GOOGLE_API_KEY", "SUPABASE_URL", "SUPABASE_KEY"]
    all_good = True
    for var in required:
        if os.getenv(var):
            print(f"✅ {var}: Set")
        else:
            print(f"❌ {var}: MISSING")
            all_good = False
    return all_good

# 3. Check ngrok
def check_ngrok():
    try:
        result = subprocess.run(['ngrok', 'version'], capture_output=True, text=True, timeout=2)
        if result.returncode == 0:
            print(f"✅ Ngrok: Installed ({result.stdout.strip()})")
            return True
    except:
        pass
    print("❌ Ngrok: NOT FOUND or not in PATH")
    return False

# 4. Test Gemini API
def test_gemini():
    try:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content("Say 'OK'")
        if "OK" in response.text:
            print("✅ Gemini API: Working")
            return True
    except Exception as e:
        print(f"❌ Gemini API: FAILED - {str(e)[:50]}")
        return False

# Run diagnostics
port_ok = check_port()
env_ok = check_env()
ngrok_ok = check_ngrok()
gemini_ok = test_gemini()

print("\n=== SUMMARY ===")
if not port_ok:
    print("🔴 CRITICAL: Start the server with: python -m apps.backend.server.main")
if not env_ok:
    print("🔴 CRITICAL: Fix your .env file")
if not ngrok_ok:
    print("🟡 WARNING: Install ngrok - WhatsApp won't reach your laptop without it")
if not gemini_ok:
    print("🔴 CRITICAL: Your GOOGLE_API_KEY is invalid or quota exceeded")

if port_ok and env_ok and ngrok_ok and gemini_ok:
    print("🟢 ALL SYSTEMS NOMINAL")
    print("\nNEXT STEPS:")
    print("1. Run: ngrok http 8000")
    print("2. Copy the URL (like https://abc123.ngrok-free.app)")
    print("3. Go to Twilio Console > WhatsApp Sandbox Settings")
    print("4. Set webhook to: YOUR_NGROK_URL/webhook")
    print("5. Send 'Hi' to your WhatsApp number")
