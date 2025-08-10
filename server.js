import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file from public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Available models to try
const GEMINI_MODELS = [
    'gemini-1.5-flash'
];

// Chat endpoint with multiple model fallback
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            console.error("❌ Google API key missing");
            return res.status(500).json({ error: "Google API key missing" });
        }

        console.log("📤 Sending message to Gemini:", userMessage);

        // Try different models
        for (const model of GEMINI_MODELS) {
            try {
                console.log(`🔄 Trying model: ${model}`);
                
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                    {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [{ text: userMessage }]
                                }
                            ],
                            generationConfig: {
                                temperature: 0.7,
                                topK: 40,
                                topP: 0.95,
                                maxOutputTokens: 1024,
                            }
                        })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log("📥 API Response received");

                    let aiReply = null;
                    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                        aiReply = data.candidates[0].content.parts[0].text;
                    }

                    if (aiReply) {
                        console.log(`✅ Success with model: ${model}`);
                        console.log("✅ AI Reply:", aiReply);
                        return res.json({ reply: aiReply, model: model });
                    }
                } else {
                    const errorText = await response.text();
                    console.log(`❌ Model ${model} failed:`, response.status, errorText);
                }
            } catch (modelError) {
                console.log(`❌ Model ${model} error:`, modelError.message);
                continue;
            }
        }

        // If all models failed
        return res.status(500).json({ 
            error: "All Gemini models failed. Please check your API key and try again.",
            suggestion: "Go to https://aistudio.google.com/app/apikey to get a new API key"
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        hasApiKey: !!process.env.GOOGLE_API_KEY
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔑 API Key present: ${!!process.env.GOOGLE_API_KEY}`);
});

