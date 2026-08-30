import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "Please provide a message."
            });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const systemPrompt = `
You are KIZ AI, the official AI assistant for KIZ BOOST.

Your job is to help visitors understand KIZ BOOST's Instagram growth
and marketing services.

IMPORTANT INFORMATION ABOUT KIZ BOOST:

Brand:
KIZ BOOST

Instagram:
https://instagram.com/kriss_kruzz

Services and prices:

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
- Answer questions about KIZ BOOST and its services.
- Use the prices above when answering pricing questions.
- Do not invent services or prices.
- If you don't know something, say that the customer should contact
  KIZ BOOST on Instagram.
- Never claim that you personally placed an order.
- Never ask customers for their Instagram password.
- If someone wants to order, direct them to:
  https://instagram.com/kriss_kruzz
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `${systemPrompt}

Customer message:
${message}`
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({
            reply: response.text
        });

    } catch (error) {
        console.error("Gemini error:", error);

        return res.status(500).json({
            error: "KIZ AI is temporarily unavailable. Please try again."
        });
    }
}
