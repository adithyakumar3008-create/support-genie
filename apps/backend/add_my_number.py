from supabase import create_client
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

print("--- 🚀 SETUP YOUR ACCOUNT FOR GDG DEMO ---")

# 1. Connect
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
sb = create_client(url, key)

# 2. Input
print("To test the scenarios (Arjun/Sneha/Ramesh) with YOUR WhatsApp, we need to add the items to YOUR number.")
raw_num = input("👉 Enter your WhatsApp Number (e.g. +919988776655): ").strip()
if "whatsapp:" in raw_num:
    raw_num = raw_num.replace("whatsapp:", "") 

print(f"Provisioning Assets for {raw_num}...")

try:
    # 1. Create/Update User
    user_data = {
        "phone_number": raw_num, 
        "name": "GDG Judge (Admin)", 
        "preferred_language": "en",
        "trust_score": 95
    }
    u_res = sb.table("users").upsert(user_data, on_conflict="phone_number").select().execute()
    
    if u_res.data:
        uid = u_res.data[0]['id']
        
        # 2. Add Protocol Orders (The "Asset Pack")
        orders = [
            # Scenario A (Hindi Complaint): "Mera TV..."
            {
                "user_id": uid,
                "item_name": "Samsung 32-inch Smart TV",
                "amount_inr": 12000,
                "status": "Delivered",
                "order_date": (datetime.now() - timedelta(days=2)).isoformat()
            },
            # Scenario B (Telugu Refund): "Idi pagilipoyindi..." (Broken Item)
            {
                "user_id": uid,
                "item_name": "Sony WH-1000XM5 Headphones", # High value
                "amount_inr": 24990,
                "status": "Delivered",
                "order_date": (datetime.now() - timedelta(days=3)).isoformat()
            },
            # Scenario C (Where is my order?): "Sneha Context"
            {
                "user_id": uid,
                "item_name": "Bajaj Air Cooler",
                "amount_inr": 6500,
                "status": "Shipped", # Tracking scenario
                "order_date": (datetime.now() - timedelta(days=1)).isoformat()
            },
               # Scenario D (Policy Rejection)
            {
                "user_id": uid,
                "item_name": "Old Phone Case", 
                "amount_inr": 500,
                "status": "Delivered",
                "order_date": (datetime.now() - timedelta(days=45)).isoformat() # > 7 days
            }
        ]
        
        for o in orders:
             sb.table("orders").insert(o).execute()
             print(f"   ✅ Added Order: {o['item_name']}")
             
        print("\n🎉 SETUP COMPLETE!")
        print("You can now ask:")
        print("1. 'Mera TV chalu nahi ho raha hai' (Hindi)")
        print("2. 'I want refund for Headphones' (English/Telugu)")
        print("3. 'Where is my Cooler?'")
    else:
        print("⚠️ Database Error: Could not create user.")

except Exception as e:
    print(f"❌ Error: {e}")
