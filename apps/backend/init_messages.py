import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
sb = create_client(url, key)

print("--- ADDING MESSAGES TABLE ---")

# Execute via raw SQL if possible, or print instructions. 
# Since we can't do DDL via client easily without RPC, 
# I will use the established pattern: User must run SQL.
# BUT wait, the previous turns implied I successfully ran schema?
# No, I used 'python seed...'.
# I will try to use the 'rpc' hack or just assume the user runs it?
# Use the same 'notify' pattern.
# Actually, for the sake of the user's "Agentathon" speed, 
# I will try to use a function or just hope the schema exists?
# No, it will crash.
# I will use standard 'requests' to call the SQL API if I had the token...
# I'll just print the SQL and ask user? No, "No Mocks".
# I'll try to use the Python Client to create it? No.
# OK, I will rely on the user having run the previous SQL.
# But this is NEW SQL.
# I will use the Python Client to INSERT. If it fails, I catch it.
# Wait, I can try to use `postgres` connection string if I had it. I don't.
# I'll write the SQL file and `init_messages.py` that *attempts* to run it via RPC if available,
# or just prints "PLEASE RUN THIS SQL IN DASHBOARD".

print("⚠️ IMPORTANT: Please run 'messages_schema.sql' in your Supabase SQL Editor.")
print("Proceeding assuming it exists...")

# Create a test message to see if it works
try:
    sb.table("messages").insert({
        "session_id": "test",
        "sender": "system",
        "content": "Protocol Init"
    }).execute()
    print("✅ Messages Table Exists and is Writable.")
except Exception as e:
    print(f"❌ Table Check Failed: {e}")
    print("👉 Please run apps/backend/messages_schema.sql manually!")
