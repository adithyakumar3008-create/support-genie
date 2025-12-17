import os

# Path to main.py
file_path = r"c:\Users\eshhb\Downloads\supportgenie\apps\backend\main.py"

def break_app():
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Intentionally break a variable name
    broken_content = content.replace('app = FastAPI()', 'app = FastAPI_BROKEN()')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(broken_content)
    
    print("CRASH INJECTED: main.py is now broken. Show Antigravity fixing this!")

def fix_app():
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    fixed_content = content.replace('app = FastAPI_BROKEN()', 'app = FastAPI()')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(fixed_content)
    
    print("FIX APPLIED: main.py is restored.")

if __name__ == "__main__":
    choice = input("Enter 'break' to crash app or 'fix' to restore: ")
    if choice == 'break':
        break_app()
    elif choice == 'fix':
        fix_app()
    else:
        print("Invalid choice")
