from supabase import create_client
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

print("--- SEEDING AGENTATHON JUDGE DATA ---")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
if not url or not key:
    print("❌ CREDENTIALS MISSING")
    exit()

sb = create_client(url, key)

# 1. Truncate (Optional, but safer to Upsert for demo stability)
# sb.table("users").delete().neq("id", "0000").execute() 

# 2. USERS
users = [
    {
        "phone_number": "+919032684083", 
        "name": "Arjun Rao (Judge 1)", 
        "preferred_language": "en",
        "trust_score": 85
    },
    {
        "phone_number": "+919948518088", 
        "name": "Sneha Reddy (Judge 2)", 
        "preferred_language": "te",
        "trust_score": 90
    }
]

user_map = {}

for u in users:
    res = sb.table("users").upsert(u, on_conflict="phone_number").select().execute()
    if res.data:
        uid = res.data[0]['id']
        user_map[u['phone_number']] = uid
        print(f"✅ User Ready: {u['name']}")

# 3. ORDERS
# Arjun's Orders
arjun_id = user_map.get("+919032684083")
if arjun_id:
    orders_arjun = [
        # Happy Path
        {
            "user_id": arjun_id,
            "item_name": "Sony WH-1000XM5 Noise Cancelling Headphones",
            "amount_inr": 24990,
            "status": "Delivered",
            "order_date": (datetime.now() - timedelta(days=3)).isoformat()
        },
        # Policy Rejection (45 Days)
        {
            "user_id": arjun_id,
            "item_name": "Spigen Armor Case for iPhone 15",
            "amount_inr": 1200,
            "status": "Delivered",
            "order_date": (datetime.now() - timedelta(days=45)).isoformat()
        },
        # Escalation (>30k)
        {
            "user_id": arjun_id,
            "item_name": "ASUS ROG Strix G16 Gaming Laptop",
            "amount_inr": 120000,
            "status": "Delivered",
            "order_date": (datetime.now() - timedelta(days=2)).isoformat()
        }
    ]
    for o in orders_arjun:
        sb.table("orders").insert(o).execute()
        print(f"   ✅ Order: {o['item_name']}")

# Sneha's Orders
sneha_id = user_map.get("+919948518088")
if sneha_id:
    orders_sneha = [
        # Where is my order? (Status Shipped)
        {
            "user_id": sneha_id,
            "item_name": "Bajaj PX 97 Torque Air Cooler",
            "amount_inr": 6500,
            "status": "Shipped",
            "order_date": (datetime.now() - timedelta(days=1)).isoformat()
        }
    ]
    for o in orders_sneha:
        sb.table("orders").insert(o).execute()
        print(f"   ✅ Order: {o['item_name']}")

# 4. POLICIES
policies = [
    {"category": "Electronics", "max_refund_amount": 30000, "requires_image": True, "auto_approval_window_hours": 168},
    {"category": "Accessories", "max_refund_amount": 2500, "requires_image": False, "auto_approval_window_hours": 48},
    {"category": "Home Appliances", "max_refund_amount": 10000, "requires_image": True, "auto_approval_window_hours": 72}
]

for p in policies:
    sb.table("refund_policies").upsert(p, on_conflict="category").execute()
    print(f"✅ Policy: {p['category']}")

print("\n🎉 DATA SEEDING COMPLETE. READY FOR AGENTATHON JUDGES.")
