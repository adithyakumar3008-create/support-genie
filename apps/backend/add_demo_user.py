from supabase import create_client
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

load_dotenv()

# Banner
print("\n✨ SUPPORTGENIE MAGIC ONBOARDING ✨")
print("I need to add your WhatsApp number to the 'Orders' database so the Agent can find you.\n")

# 1. Connect
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
if not url or not key:
    print("❌ Error: .env variables missing.")
    exit()
    
sb = create_client(url, key)

# 2. Input
raw_num = input("👉 Enter your WhatsApp Number (e.g. +919000012345): ").strip()
# specific fix for common formats
if raw_num.startswith("whatsapp:"):
    number = raw_num
else:
    # Ensure + is there if user forgot
    if not raw_num.startswith("+"):
        raw_num = "+" + raw_num
    number = f"whatsapp:{raw_num}"

print(f"\nCreating Mock Orders for: {number}...")

try:
    # Order 1: Recent (Refundable) - 3 Days Ago
    data_rice = {
        "customer_phone": number,
        "items_json": [{"sku": "India Gate Basmati Rice (5kg)", "qty": 1}],
        "total_amount": 850.00,
        "status": "delivered",
        "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
    }
    sb.table("orders").insert(data_rice).execute()
    print("✅ Created Order #1: Rice (3 Days ago) -> [REFUNDABLE]")

    # Order 2: Old (Non-Refundable) - 40 Days Ago
    data_soap = {
        "customer_phone": number,
        "items_json": [{"sku": "Surf Excel Matic", "qty": 1}],
        "total_amount": 450.00,
        "status": "delivered",
        "created_at": (datetime.now(timezone.utc) - timedelta(days=40)).isoformat()
    }
    sb.table("orders").insert(data_soap).execute()
    print("✅ Created Order #2: Soap (40 Days ago) -> [EXPIRED]")
    
    # Profile
    sb.table("profiles").insert({
        "phone_number": number,
        "business_name": "Demo User Store",
        "owner_name": "Demo User"
    }).execute()
    print("✅ Created User Profile")

    print("\n🎉 SUCCESS! You can now test the bot.")
    
except Exception as e:
    print(f"\n⚠️ Database Insert Error (Maybe you already exist?): {e}")
    print("Try testing anyway!")
