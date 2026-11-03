import express from "express";
import cors from "cors";
import qr from "qr-image";

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Generate QR Code API
app.post("/api/generate", (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({
            message: "Please provide a valid URL or text."
        });
    }

    if (text.length > 2000) {
        return res.status(400).json({
            message: "Input must be 2000 characters or fewer."
        });
    }

    try {
        const qrCode = qr.image(text.trim(), {
            type: "png",
            size: 10,
            margin: 2
        });

        res.setHeader("Content-Type", "image/png");

        qrCode.on("error", (error) => {
            console.error("QR generation error:", error);

            if (!res.headersSent) {
                res.status(500).json({
                    message: "Failed to generate QR code."
                });
            }
        });

        qrCode.pipe(res);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});