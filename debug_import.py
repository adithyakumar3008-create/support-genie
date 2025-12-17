import sys
import os

print(f"Propagating Path: {sys.path}")

try:
    print("Attempting: import apps.backend.agent.agent_tools")
    import apps.backend.agent.agent_tools
    print("✅ Success: agent_tools")
except Exception as e:
    print(f"❌ Failed: agent_tools -> {e}")

try:
    print("Attempting: import apps.backend.agent.graph")
    import apps.backend.agent.graph
    print("✅ Success: graph")
except Exception as e:
    print(f"❌ Failed: graph -> {e}")
