from typing import TypedDict, List, Literal, Optional
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    phone_number: str
    messages: List[BaseMessage]
    language: Literal['en', 'hi', 'te'] # Default 'en'
    emotion: Literal['neutral', 'angry', 'happy'] # Default 'neutral'
    next_node: str
    audio_bytes: Optional[bytes] # Native Input
    image_bytes: Optional[bytes] # Native Input
