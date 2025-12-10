import Jimp from "jimp";

export async function detectLiquid(buffer) {
    const img = await Jimp.read(buffer);
    const h = img.bitmap.height;
    const w = img.bitmap.width;

    let cutoffRow = 0;

    for (let y = 0; y < h; y++) {
        let total = 0;

        for (let x = 0; x < w; x++) {
            const pixel = Jimp.intToRGBA(img.getPixelColor(x, y));
            total += (pixel.r + pixel.g + pixel.b) / 3;
        }

        const avg = total / w;

        if (avg < 120) {  
            cutoffRow = y;
        }
    }

    return cutoffRow; // pixel height of liquid
}