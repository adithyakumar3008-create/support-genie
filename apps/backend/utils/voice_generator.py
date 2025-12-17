import os
from google.cloud import texttospeech
from supabase import create_client

# Init Clients
tts_client = texttospeech.TextToSpeechClient()
sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])

def generate_voice(text: str, language_code: str) -> str:
    """
    Converts Text -> Audio (MP3) -> Public URL.
    """
    print(f"🗣️ TTS: Generating {language_code} audio...")

    # 1. Select Voice
    # Hindi: hi-IN-Neural2-A, Telugu: te-IN-Standard-A
    voice_name = "en-IN-Neural2-A" # Default
    if language_code == 'hi': voice_name = "hi-IN-Neural2-A"
    if language_code == 'te': voice_name = "te-IN-Standard-A"

    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code=language_code if language_code != 'te' else 'te-IN',
        name=voice_name
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # 2. Call Google API
    try:
        response = tts_client.synthesize_speech(
            input=input_text, voice=voice, audio_config=audio_config
        )
    except Exception as e:
        print(f"   ⚠️ TTS Error: {e}")
        return ""

    # 3. Upload to Supabase Storage
    path = f"audio_responses/{os.urandom(8).hex()}.mp3"
    try:
         sb.storage.from_("media").upload(
            path=path,
            file=response.audio_content,
            file_options={"content-type": "audio/mp3"}
         )
         # Get Public URL
         public_url = sb.storage.from_("media").get_public_url(path)
         print(f"   🔗 Audio URL: {public_url}")
         return public_url
    except Exception as e:
        print(f"   ⚠️ Storage Error: {e}")
        return ""
