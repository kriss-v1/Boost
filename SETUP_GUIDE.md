# KIZ BOOST - AI Chat Setup Guide

## ✅ What Was Fixed

Your project is now properly configured for a secure AI chat system. Here's what was done:

### 1. **Security Fix** 🔐
- ✅ Removed exposed Gemini API key from frontend (`script.js`)
- ✅ Moved API key to a secure `.env` file (kept server-side only, not committed)
- ✅ Created `.gitignore` to prevent accidental commits of sensitive data

### 2. **Backend Server Setup** 🚀
- ✅ Created `server.js` - Express.js server with secure API endpoint
- ✅ API endpoint: `POST /api/chat` - handles all AI requests securely
- ✅ Server runs locally on `http://localhost:3000`

### 3. **Frontend Integration** 🎨
- ✅ Updated `script.js` to call backend API instead of Gemini directly
- ✅ Removed hardcoded API key from frontend
- ✅ Chat interface remains the same - no UI changes needed

### 4. **Dependencies** 📦
- ✅ Installed: `express`, `cors`, `dotenv`
- ✅ Updated `package.json` with start script

---

## 🚀 How to Run

### Start the Server
```bash
npm start
```

The server will start at `http://localhost:3000`

### Access the App
Open `index.html` in your browser (or serve it through the Express server on `http://localhost:3000`)

### Use the Chat
Click the ✨ button in the bottom right to open KIZ AI chat and ask questions about KIZ BOOST services.

---

## 📝 Architecture

```
User Browser
     ↓
 (script.js)
     ↓
POST /api/chat (secure backend)
     ↓
server.js
     ↓
Gemini API (with secure API key)
     ↓
AI Response ← Back to User
```

**Key Advantage**: API key is never exposed to users.

---

## 🔧 Configuration

### Environment Variables (`.env` or `.env.local`)
The server loads configuration from `.env`, then `.env.local`, so either file works.

```
GEMINI_API_KEY=your_api_key_here
USE_MOCK_MODE=false   # optional: set true to force mock mode without the API
```

**Never commit these files!** They are in `.gitignore`. Create a copy named
`.env.example` locally if you want a shareable template (do not commit the real key).

---

## 📊 API Endpoint

### POST `/api/chat`
**Request:**
```json
{
  "message": "How much is the 1,000 followers package?"
}
```

**Response:**
```json
{
  "reply": "✔ Instagram 1,000 Followers — 4,000 Rwf + free 20 likes, 10 reposts, and 10 followers. Message us on Instagram to order!"
}
```

The server uses the Gemini model `gemini-3.6-flash`. If no `GEMINI_API_KEY` is
set or the API call fails, it automatically falls back to a built-in
keyword-matching mock so the chat still responds.

---

## ✨ Features

- ✅ AI answers questions about KIZ BOOST services
- ✅ Provides accurate pricing
- ✅ Directs users to Instagram for ordering
- ✅ Never asks for passwords (built into system prompt)
- ✅ Friendly and professional responses
- ✅ Secure API key management

---

## 🛡️ Security Notes

1. **API Key Protection**: Keys are stored server-side only
2. **CORS Enabled**: Frontend can communicate with backend safely
3. **Input Validation**: All requests are validated
4. **Environment Variables**: Sensitive data uses `.env.local`

---

## 🎯 Next Steps (Optional)

1. **Deploy**: Deploy `server.js` to Vercel, Heroku, or your server
2. **Update API URL**: Change `API_BASE_URL` in `script.js` to your production URL
3. **Environment**: Set `GEMINI_API_KEY` in your hosting platform's environment variables

---

## 📞 Support

The AI is configured to:
- Answer pricing questions
- Explain KIZ BOOST services
- Direct users to Instagram (@kizboost) for ordering
- Not ask for sensitive information

---

**Your KIZ AI is now ready to answer questions! 🎉**
