import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

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
<<<<<<< HEAD
        keywords: ['followers', '100', '500', '1000', 'follow'],
        response: 'KIZ BOOST Instagram Followers:\n• 100 Followers — $1\n• 500 Followers — $4\n• 1,000 Followers — $9\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    likes: {
        keywords: ['likes', 'like', '500 likes', '1000 likes', '5000 likes'],
        response: 'KIZ BOOST Instagram Likes:\n• 500 Likes — $1.50\n• 1,000 Likes — $3\n• 5,000 Likes — $12\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    views: {
        keywords: ['views', 'view', '500 views', '1000 views', '10000 views'],
        response: 'KIZ BOOST Instagram Views:\n• 500 Views — $3\n• 1,000 Views — $5\n• 10,000 Views — $15\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    reposts: {
        keywords: ['reposts', 'repost', '50 reposts', '100 reposts', '1000 reposts'],
        response: 'KIZ BOOST Instagram Reposts:\n• 50 Reposts — $1\n• 100 Reposts — $2\n• 1,000 Reposts — $9\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    order: {
        keywords: ['order', 'buy', 'purchase', 'how to order'],
        response: 'To order from KIZ BOOST:\n1. Choose a service\n2. Message us on Instagram: https://instagram.com/kriss_kruzz\n3. Confirm your order details\n4. We\'ll get started!\n\nWe don\'t ask for your password. All orders are handled through Instagram.'
=======
        keywords: ['followers', '1000', '5000', '10000', 'follow'],
        response: 'KIZ BOOST Instagram Growth Packages:\n• Instagram 1,000 Followers — 4,000 Rwf + free 20 likes, 10 reposts, and 10 followers\n• Instagram 5,000 Followers — 17,500 Rwf + free 100 likes, 50 reposts, and 50 followers\n• Instagram 10,000 Followers — 30,000 Rwf + free 200 likes, 100 reposts, and 100 followers\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    likes: {
        keywords: ['likes', 'like', '20 likes', '100 likes', '200 likes'],
        response: 'KIZ BOOST Instagram bonus offers:\n• 1,000 Followers package includes free 20 likes\n• 5,000 Followers package includes free 100 likes\n• 10,000 Followers package includes free 200 likes\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    views: {
        keywords: ['views', 'view'],
        response: 'KIZ BOOST focuses on Instagram growth bundles with bonus engagement:\n• 1,000 Followers — 3,500 Rwf + free 20 likes, 10 reposts, 10 followers\n• 5,000 Followers — free 100 likes, 50 reposts, 50 followers\n• 10,000 Followers — free 200 likes, 100 reposts, 100 followers\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    reposts: {
        keywords: ['reposts', 'repost', '10 reposts', '50 reposts', '100 reposts'],
        response: 'KIZ BOOST Instagram repost bonuses:\n• 1,000 Followers package includes 10 free reposts\n• 5,000 Followers package includes 50 free reposts\n• 10,000 Followers package includes 100 free reposts\n\nMessage us on Instagram to order: https://instagram.com/kriss_kruzz'
    },
    order: {
        keywords: ['order', 'buy', 'purchase', 'how to order'],
        response: 'To order from KIZ BOOST:\n1. Choose an Instagram growth package\n2. Message us on Instagram: https://instagram.com/kriss_kruzz\n3. Confirm your order details\n4. We\'ll get started!\n\nWe don\'t ask for your password. All orders are handled through Instagram.'
>>>>>>> ee72df136185d6553df69aea85860e4ff4eec897
    },
    password: {
        keywords: ['password', 'secure', 'safety'],
        response: 'KIZ BOOST does NOT ask for your Instagram password. Your account security is important to us. All orders are handled safely through Instagram messaging.'
    },
    default: {
<<<<<<< HEAD
        response: 'Hi! I\'m KIZ AI. I can help with:\n• Service pricing\n• How to order\n• What KIZ BOOST offers\n\nFeel free to ask any questions about our Instagram growth services!'
=======
        response: 'Hi! I\'m KIZ AI. I can help with:\n• Instagram growth packages\n• Free bonuses included with each package\n• How to order\n\nFeel free to ask any questions about our Instagram growth services!'
>>>>>>> ee72df136185d6553df69aea85860e4ff4eec897
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
https://instagram.com/kriss_kruzz

<<<<<<< HEAD
Services and prices:
=======
Instagram growth packages:
>>>>>>> ee72df136185d6553df69aea85860e4ff4eec897

Instagram Followers:
- 100 Followers — $1
- 500 Followers — $4
- 1,000 Followers — $9

Instagram Likes:
- 500 Likes — $1.50
- 1,000 Likes — $3
- 5,000 Likes — $12

Instagram Views:
- 500 Views — $3
- 1,000 Views — $5
- 10,000 Views — $15

Instagram Reposts:
- 50 Reposts — $1
- 100 Reposts — $2
- 1,000 Reposts — $9

ORDERING:
Customers choose a service and then contact KIZ BOOST through Instagram
to confirm their order.

Instagram:
https://instagram.com/kriss_kruzz

SECURITY:
KIZ BOOST does NOT ask customers for their Instagram password.

PAYMENTS:
Orders are handled directly through Instagram rather than through
the website.

RULES:
- Be friendly, professional and concise.
<<<<<<< HEAD
- Answer questions about KIZ BOOST and its services.
- Use the prices above when answering pricing questions.
=======
- Answer questions about KIZ BOOST and its Instagram growth packages.
- Use the package details above when answering pricing or bonus questions.
>>>>>>> ee72df136185d6553df69aea85860e4ff4eec897
- Do not invent services or prices.
- If you don't know something, say that the customer should contact
  KIZ BOOST on Instagram.
- Never claim that you personally placed an order.
- Never ask customers for their Instagram password.
- If someone wants to order, direct them to:
  https://instagram.com/kriss_kruzz
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
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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

// Start server
app.listen(PORT, () => {
    console.log(`🚀 KIZ BOOST Server running at http://localhost:${PORT}`);
    console.log(`💬 Chat API available at http://localhost:${PORT}/api/chat`);
});
