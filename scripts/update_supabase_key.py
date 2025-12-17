import os

env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
new_key = "sb_publishable_1dcPi_ZEnF1NggNZPVZLOA_ApEEJ5DX"

try:
    with open(env_path, "r") as f:
        lines = f.readlines()

    with open(env_path, "w") as f:
        found = False
        for line in lines:
            if line.startswith("SUPABASE_KEY="):
                f.write(f"SUPABASE_KEY={new_key}\n")
                found = True
            else:
                f.write(line)
        if not found:
            f.write(f"\nSUPABASE_KEY={new_key}\n")
            
    print("✅ .env Updated Successfully (Supabase).")
except Exception as e:
    print(f"❌ Error updating .env: {e}")
