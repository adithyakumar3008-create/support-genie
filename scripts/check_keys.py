import os
from dotenv import load_dotenv
from twilio.rest import Client

# Force load the .env from the backend folder
env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
load_dotenv(dotenv_path=env_path)

print("--- DIAGNOSTIC REPORT ---")

# 1. Check File Existence
if os.path.exists(env_path):
    print("✅ .env file found at:", env_path)
else:
    print("❌ .env file NOT found at:", env_path)

# 2. Check Variables
sid = os.environ.get("TWILIO_ACCOUNT_SID", "")
token = os.environ.get("TWILIO_AUTH_TOKEN", "")
phone = os.environ.get("TWILIO_PHONE_NUMBER", "")

print(f"🔑 Account SID: {sid[:4]}...{sid[-4:] if len(sid)>4 else 'INVALID'}")
print(f"🔑 Auth Token:  {'Loaded' if token else 'MISSING'}")
print(f"📞 Bot Number:  {phone}")

# 3. Test Connection
if not sid or not token:
    print("❌ Cannot test connection: Missing Credentials.")
    exit()

try:
    client = Client(sid, token)
    print("✅ Twilio Client Initialized.")
    
    # Allow user to specify their phone number or use a default if known (not hardcoded here)
    print("--- ATTEMPTING OUTBOUND TEST ---")
    # We will try to fetch the account details to verify creds without sending a message yet
    account = client.api.v2010.accounts(sid).fetch()
    print(f"✅ Authentication Successful! Account Name: {account.friendly_name}")
    print("✅ API Keys are VALID.")
    
except Exception as e:
    print(f"❌ API Key Error: {e}")
    print("-> Please check your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env")

print("-------------------------")
