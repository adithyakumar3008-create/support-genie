# 🚀 The "Tech Stack Showcase" Demo Guide

You are now ready to win the Consolation Prize (or more!). 
You have a "Gemini 3 Deep Agent" with "Stitch Integration".

## 🖥️ Screen Setup (The 3 Windows)
Arrange your screen like this so judges see EVERYTHING.

1.  **Left**: `VS Code` (Show `apps/backend/agent.py`).
2.  **Right**: `Chrome` (The Dashboard at `localhost:3000/dashboard`).
3.  **Phone**: Your WhatsApp.

## ⚡ How to Run It (Do this NOW)

### Terminal 1: The Brain (Backend)
```bash
cd apps/backend
python main.py
```
> *Success if you see: "Uvicorn running on http://0.0.0.0:8000"*

### Terminal 2: The Tunnel (Connectivity)
```bash
ngrok http 8000
```
> *Copy the https URL (e.g., `https://a1b2.ngrok-free.app`) and paste it into Twilio Sandbox Webhook.*

### Terminal 3: The Face (Frontend)
```bash
cd apps/web
npm run dev
```
> *Open `http://localhost:3000/dashboard`*

## 🎬 The Demo Script (Read this to Judges)

1.  **"This is SupportGenie, built on Google Antigravity."** (Point to VS Code).
2.  **"I'm sending a message: 'Check stock for Red Sari'."** (Send from Phone).
3.  **"Watch the Blue Logs."** (Point to Dashboard). *"That is Gemini 3's Deep Reasoning stream, thinking before it speaks."*
4.  **"See the Purple Node?"** (Point to 'Stitch Integration'). *"That is the Stitch agent connecting to our inventory database."*
5.  **"It replies!"** (Show phone). *"Native Audio and Text response."*

**Go get em!** 🏆
