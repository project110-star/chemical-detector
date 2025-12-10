import Tesseract from "tesseract.js";

export async function readLabel(buffer) {
    const result = await Tesseract.recognize(buffer, "eng");
    return result.data.text.replace(/\n/g, " ").trim();
}