import express from "express";
import multer from "multer";
import { readLabel } from "./ai/ocr.js";
import { detectLiquid } from "./ai/liquid.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/analyze", upload.single("image"), async (req, res) => {
    try {
        const fullMl = Number(req.body.fullMl);
        const fullHeight = Number(req.body.fullHeight);

        const buffer = req.file.buffer;

        const chemical = await readLabel(buffer);
        const liquidHeight = await detectLiquid(buffer);

        const percentage = liquidHeight / fullHeight;
        const ml = Math.round(fullMl * percentage);

        res.json({ chemical, ml });

    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running"));