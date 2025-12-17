import requests
import time

BASE_URL = "http://localhost:8000/webhook"

print("🚀 GDG AGENTATHON: LIVE SIMULATION STARTING...\n")
print("(Keep your eyes on the Dashboard 'Cognitive Stream')\n")

# SCENARIO 1: RAMESH (Hindi User) -> Angry Complaint
# Heuristics in graph.py look for "mera" or "nahi" to detect Hindi.
payload_hindi = {
    "From": "whatsapp:+919876543210", # Ramesh
    "Body": "Mera TV chalu nahi ho raha hai! I am very angry!" 
}
print(f"🔹 Sending Hindi Complaint (Ramesh): '{payload_hindi['Body']}'...")
try:
    res = requests.post(BASE_URL, data=payload_hindi)
    print(f"   ✅ Server Replied: {res.status_code}")
except Exception as e:
    print(f"   ❌ Failed: {e}")

time.sleep(3) # Wait for dashboard pulse

# SCENARIO 2: SURESH (Telugu User) -> Broken Item
# Heuristics look for "idi" or "pagilipoyindi" for Telugu.
payload_telugu = {
    "From": "whatsapp:+919988776655", # Suresh
    "Body": "Idi pagilipoyindi. Naku refund kavali." # "This is broken. I want refund."
}
print(f"\n🔹 Sending Telugu Refund Request (Suresh): '{payload_telugu['Body']}'...")
try:
    res = requests.post(BASE_URL, data=payload_telugu)
    print(f"   ✅ Server Replied: {res.status_code}")
except Exception as e:
    print(f"   ❌ Failed: {e}")

time.sleep(2)

print("\n✨ SIMULATION COMPLETE.")
print("Check the Dashboard for:")
print("1. [hi] / [te] Language Tags.")
print("2. [angry] Emotion Tags.")
print("3. Response text in Hindi/Telugu.")
