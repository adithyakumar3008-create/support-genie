import requests
import sys

# Testing Localhost to skip Ngrok latency for verification
url = "http://localhost:8000/webhook"
print(f"🚀 Testing Real Sales Report: {url}")

try:
    response = requests.post(
        url,
        data={"Body": "which phones have sold yesterday", "From": "whatsapp:+123456789"},
        timeout=30
    )
    print(f"✅ Status Code: {response.status_code}")
    print(f"📜 Response Body (First 500 chars):\n{response.text[:500]}")
    
    # Check for items we know are in the SQL
    if "iPhone 15" in response.text or "Samsung S24" in response.text:
         print("✅ SUCCESS: Found Real Sales Data!")
    elif "No sales records" in response.text:
         print("⚠️ WARNING: DB connected but query returned empty (Check Timezone).")
    else:
         print("❌ FAILED: Unexpected Response.")

except Exception as e:
    print(f"❌ FAILED: {e}")
