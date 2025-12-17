import os

env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
new_key = "AIzaSyDwPUgn-YlkWInozrMO0EeMYPraHHDDdFg"

try:
    with open(env_path, "r") as f:
        lines = f.readlines()

    with open(env_path, "w") as f:
        found = False
        for line in lines:
            if line.startswith("GOOGLE_API_KEY="):
                f.write(f"GOOGLE_API_KEY={new_key}\n")
                found = True
            else:
                f.write(line)
        if not found:
            f.write(f"\nGOOGLE_API_KEY={new_key}\n")
            
    print("✅ .env Updated Successfully.")
except Exception as e:
    print(f"❌ Error updating .env: {e}")
