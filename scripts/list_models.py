import os
import requests
import json
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), "../apps/backend/.env")
load_dotenv(dotenv_path=env_path)

g_key = os.environ.get("GOOGLE_API_KEY", "")
print(f"Using Key: {g_key[:10]}...")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={g_key}"

try:
    res = requests.get(url)
    print(f"Status: {res.status_code}")
    if res.status_code == 200:
        models = res.json().get("models", [])
        print(f"Found {len(models)} models.")
        for m in models:
            if "generateContent" in m.get("supportedGenerationMethods", []):
                print(f" - {m['name']} ({m['version']})")
    else:
        print(f"Error: {res.text}")
except Exception as e:
    print(f"Exception: {e}")
