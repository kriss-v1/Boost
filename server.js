import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env (falls back to .env.local)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const USE_MOCK_MODE = process.env.USE_MOCK_MODE === 'true' || !process.env.GEMINI_API_KEY;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// KIZ BOOST Knowledge Base for fallback mode
const KIZ_KNOWLEDGE_BASE = {
    followers: {
        keywords: ['followers', '1000', '5000', '10000', 'follow'],
        response: 'KIZ BOOST Instagram Growth Packages:\n• Instagram 1,000 Followers — 4,000 Rwf + free 20 likes, 10 reposts, and 10 followers\n• Instagram 5,000 Followers — 17,500 Rwf + free 100 likes, 50 reposts, and 50 followers\n• Instagram 10,000 Followers — 30,000 Rwf + free 200 likes, 100 reposts, and 100 followers\n\nMessage us on Instagram to order: https://instagram.com/kizboost'
    },
    likes: {
        keywords: ['likes', 'like', '20 likes', '100 likes', '200 likes'],
        response: 'KIZ BOOST Instagram bonus offers:\n• 1,000 Followers package includes free 20 likes\n• 5,000 Followers package includes free 100 likes\n• 10,000 Followers package includes free 200 likes\n\nMessage us on Instagram to order: https://instagram.com/kizboost'
    },
    views: {
        keywords: ['views', 'view'],
        response: 'KIZ BOOST focuses on Instagram growth bundles with bonus engagement:\n• 1,000 Followers — 4,000 Rwf + free 20 likes, 10 reposts, 10 followers\n• 5,000 Followers — 17,500 Rwf + free 100 likes, 50 reposts, 50 followers\n• 10,000 Followers — 30,000 Rwf + free 200 likes, 100 reposts, 100 followers\n\nMessage us on Instagram to order: https://instagram.com/kizboost'
    },
    reposts: {
        keywords: ['reposts', 'repost', '10 reposts', '50 reposts', '100 reposts'],
        response: 'KIZ BOOST Instagram repost bonuses:\n• 1,000 Followers package includes 10 free reposts\n• 5,000 Followers package includes 50 free reposts\n• 10,000 Followers package includes 100 free reposts\n\nMessage us on Instagram to order: https://instagram.com/kizboost'
    },
    order: {
        keywords: ['order', 'buy', 'purchase', 'how to order'],
        response: 'To order from KIZ BOOST:\n1. Choose an Instagram growth package\n2. Message us on Instagram: https://instagram.com/kizboost\n3. Confirm your order details\n4. We\'ll get started!\n\nWe don\'t ask for your password. All orders are handled through Instagram.'
    },
    password: {
        keywords: ['password', 'secure', 'safety'],
        response: 'KIZ BOOST does NOT ask for your Instagram password. Your account security is important to us. All orders are handled safely through Instagram messaging.'
    },
    default: {
        response: 'Hi! I\'m KIZ AI. I can help with:\n• Instagram growth packages\n• Free bonuses included with each package\n• How to order\n\nFeel free to ask any questions about our Instagram growth services!'
    }
};

// Fallback AI response generator
function generateMockResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, data] of Object.entries(KIZ_KNOWLEDGE_BASE)) {
        if (key !== 'default' && data.keywords) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }
    }
    
    return KIZ_KNOWLEDGE_BASE.default.response;
}

// System prompt for KIZ AI
const SYSTEM_PROMPT = `
You are KIZ AI, the official AI assistant for KIZ BOOST.

Your job is to help visitors understand KIZ BOOST's Instagram growth
and marketing services.

IMPORTANT INFORMATION ABOUT KIZ BOOST:

Brand:
KIZ BOOST

Instagram:
https://instagram.com/kizboost

Instagram growth packages:

Instagram 1,000 Followers — 4,000 Rwf:
- Free bonus: 20 likes, 10 reposts, and 10 followers

Instagram 5,000 Followers — 17,500 Rwf:
- Free bonus: 100 likes, 50 reposts, and 50 followers

Instagram 10,000 Followers — 30,000 Rwf:
- Free bonus: 200 likes, 100 reposts, and 100 followers

ORDERING:
Customers choose a growth package and then contact KIZ BOOST through
Instagram to confirm their order.

Instagram:
https://instagram.com/kizboost

SECURITY:
KIZ BOOST does NOT ask customers for their Instagram password.

PAYMENTS:
Orders are handled directly through Instagram rather than through
the website.

RULES:
- Be friendly, professional and concise.
- Answer questions about KIZ BOOST and its Instagram growth packages.
- Use the package details above when answering pricing or bonus questions.
- Do not invent services or prices.
- If you don't know something, say that the customer should contact
  KIZ BOOST on Instagram.
- Never claim that you personally placed an order.
- Never ask customers for their Instagram password.
- If someone wants to order, direct them to:
  https://instagram.com/kizboost
`;

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    if (!req.body.message || typeof req.body.message !== 'string') {
        return res.status(400).json({
            error: "Please provide a message."
        });
    }

    try {
        const { message } = req.body;

        // Use mock mode if no API key or explicitly enabled
        if (USE_MOCK_MODE) {
            console.log("Using mock mode - Gemini API not available");
            const reply = generateMockResponse(message);
            return res.status(200).json({ reply });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        console.log("Using Gemini API - key available:", !!apiKey);

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{
                            text: SYSTEM_PROMPT
                        }]
                    },
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: message }]
                        }
                    ]
                }),
                timeout: 30000
            }
        );

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            console.error("Gemini API error:", data);
            // Fallback to mock mode on API error
            const reply = generateMockResponse(message);
            return res.status(200).json({ reply });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            console.error("No reply in Gemini response");
            const reply = generateMockResponse(message);
            return res.status(200).json({ reply });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Chat error:", error.message);
        // Fallback to mock mode on network error
        const { message } = req.body;
        const reply = generateMockResponse(message);
        return res.status(200).json({ reply });
    }
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: "Endpoint not found." });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: "Internal server error. Please try again." });
});

// Start server with error handling
const server = app.listen(PORT, () => {
    console.log(`🚀 KIZ BOOST Server running at http://localhost:${PORT}`);
    console.log(`💬 Chat API available at http://localhost:${PORT}/api/chat`);
    console.log(`🤖 AI mode: ${USE_MOCK_MODE ? 'mock (no API key)' : 'Gemini API'}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
    } else {
        console.error("❌ Server failed to start:", err.message);
    }
    process.exit(1);
});

// Graceful shutdown on unexpected termination
process.on('unhandledRejection', (reason) => {
    console.error("Unhandled promise rejection:", reason);
});
process.on('uncaughtException', (err) => {
    console.error("Uncaught exception:", err);
});
