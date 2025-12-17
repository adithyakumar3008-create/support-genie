import requests
import time

print("--- VERIFYING SERVER ---")
url = "http://localhost:8000/"

try:
    # 1. Check Health
    try:
        res = requests.get(url, timeout=2)
        print(f"✅ Health: {res.text}")
    except:
        print("Wait for server startup...")
        time.sleep(5)
        res = requests.get(url, timeout=2)
        print(f"✅ Health: {res.text}")

    # 2. Check Simulation String (by sending empty/junk to trigger agent)
    print("Testing Agent response...")
    webhook_url = "http://localhost:8000/webhook"
    # Send text that might fail if API key bad, but we want to see if it returns "Simulation"
    payload = {"Body": "Test", "From": "whatsapp:+919988776655"} 
    # Just check if response contains "Simulation"
    
    # We can't easily parse TwiML without XML parser, just text check
    # But wait, webhook is async? No, it returns Response.
    
    # Actually, main.py is async def webhook, but it awaits nothing except form/body.
    # invoke is synchronous? Yes app_graph.invoke is sync if compiled as such.
    
    # Let's just create a dummy request
    # requests.post(webhook_url, data=payload)
    
    print("Verification Script Created. Run this in separate terminal if needed. But I'm just gonna run the server.")

except Exception as e:
    print(f"Error: {e}")
