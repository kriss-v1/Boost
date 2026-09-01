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

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
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
