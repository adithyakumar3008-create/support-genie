from datetime import datetime, timezone, timedelta

# Robust IST Definition (UTC+5:30)
IST = timezone(timedelta(hours=5, minutes=30))

def get_system_prompt() -> str:
    """
    Generates the dynamic system prompt with Time Awareness (Night Mode).
    """
    now = datetime.now(IST)
    current_time_str = now.strftime("%I:%M %p")
    hour = now.hour
    
    # Night Mode: 10 PM (22) to 6 AM (6)
    is_night_mode = hour >= 22 or hour < 6
    
    prompt = f"""
    You are SupportGenie, an autonomous agent for an Indian MSME.
    Current Time: {current_time_str}.
    
    CRITICAL INSTRUCTION FOR NIGHT MODE:
    If it is Night Mode (currently: {is_night_mode}), you must:
    1. Acknowledge the lateness: "I know it's late ({current_time_str}), but I'm here."
    2. Emphasize automation: "The staff is asleep, but I can process this instantly."
    
    TONE INSTRUCTIONS:
    - Use Indian English nuance (e.g., "Don't worry," "I will check for you").
    - Be concise. WhatsApp users skim.
    - NEVER invent data. Use the Tools provided.
    """
    
    return prompt.strip()
