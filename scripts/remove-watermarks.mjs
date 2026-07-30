import fs from "fs";
import path from "path";
import sharp from "sharp";
import cvReadyPromise from "@techstark/opencv-js";

const SRC_DIR = path.join(process.cwd(), "public", "configurador");
const OUT_DIR = path.join(process.cwd(), "public", "configurador-clean");
const GROUPS = ["exterior", "extras", "bano", "cocina", "piso", "modelos"];

function isWatermarkPixel(r, g, b) {
  const avg = (r + g + b) / 3;
  const dbr = b - r;
  const dbg = b - g;
  return avg > 175 && avg < 253 && dbr > 3 && dbr < 40 && dbg > 2 && dbg < 35;
}

function buildMask(data, width, height, channels) {
  function avgAt(x, y) {
    const idx = (y * width + x) * channels;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
  }
  function hasNearbyDarkInk(x, y, radius = 7, threshold = 160) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (avgAt(nx, ny) < threshold) return true;
      }
    }
    return false;
  }

  const mask = new Uint8Array(width * height);
  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const idx = i * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (isWatermarkPixel(r, g, b) && !hasNearbyDarkInk(x, y)) {
        mask[i] = 255;
        count++;
      }
    }
  }
  return { mask, count };
}

function sliceRGB(data, width, height, channels) {
  if (channels === 3) return data;
  const out = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    out[i * 3] = data[i * channels];
    out[i * 3 + 1] = data[i * channels + 1];
    out[i * 3 + 2] = data[i * channels + 2];
  }
  return out;
}

async function processImage(cv, srcPath, outPath) {
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const { mask, count } = buildMask(data, width, height, channels);

  const srcMat = cv.matFromArray(height, width, cv.CV_8UC3, Array.from(sliceRGB(data, width, height, channels)));
  const maskMat = cv.matFromArray(height, width, cv.CV_8UC1, Array.from(mask));
  const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
  const dilated = new cv.Mat();
  cv.dilate(maskMat, dilated, kernel, new cv.Point(-1, -1), 2);

  const dst = new cv.Mat();
  cv.inpaint(srcMat, dilated, dst, 5, cv.INPAINT_TELEA);

  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(dst.data), { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);

  srcMat.delete();
  maskMat.delete();
  dilated.delete();
  dst.delete();
  kernel.delete();

  return { count, pct: (count / (width * height)) * 100 };
}

async function main() {
  const cv = await cvReadyPromise;
  const results = [];

  for (const group of GROUPS) {
    const groupDir = path.join(SRC_DIR, group);
    if (!fs.existsSync(groupDir)) continue;
    const files = fs.readdirSync(groupDir).filter((f) => f.endsWith(".jpg"));
    for (const file of files) {
      const srcPath = path.join(groupDir, file);
      const outPath = path.join(OUT_DIR, group, file);
      const { count, pct } = await processImage(cv, srcPath, outPath);
      results.push({ group, file, count, pct });
      console.log(`✓ ${group}/${file} — ${count}px marcados (${pct.toFixed(1)}%)`);
    }
  }

  console.log(`\n${results.length} imágenes procesadas → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
