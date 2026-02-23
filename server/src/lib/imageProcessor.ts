import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface FaceBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface StyleOpts {
  brightness?: number;
  saturation?: number;
  hue?: number;
  blur?: number;
}

const OUTPUT_SIZE = 400;
const SHADOW_PAD = 20;

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function buildCircularMask(size: number): Buffer {
  const r = size / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`;
  return Buffer.from(svg);
}

function buildVignette(size: number): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><radialGradient id="v" cx="50%" cy="50%" r="50%"><stop offset="60%" stop-color="black" stop-opacity="0"/><stop offset="100%" stop-color="black" stop-opacity="0.45"/></radialGradient></defs><rect width="${size}" height="${size}" fill="url(#v)"/></svg>`;
  return Buffer.from(svg);
}

function buildShadow(size: number, pad: number): Buffer {
  const total = size + pad * 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}"><defs><filter id="s"><feGaussianBlur stdDeviation="8"/></filter></defs><circle cx="${total / 2}" cy="${total / 2 + 4}" r="${size / 2}" fill="rgba(0,0,0,0.3)" filter="url(#s)"/></svg>`;
  return Buffer.from(svg);
}

export async function processImage(
  inputBuffer: Buffer,
  faceBox?: FaceBox,
  styleOpts?: StyleOpts
): Promise<Buffer> {
  let img = sharp(inputBuffer);
  const meta = await img.metadata();
  const w = meta.width ?? 400;
  const h = meta.height ?? 400;

  if (faceBox) {
    const pad = 0.3;
    const fx = Math.max(0, Math.floor((faceBox.x - faceBox.w * pad) * w));
    const fy = Math.max(0, Math.floor((faceBox.y - faceBox.h * pad) * h));
    const fw = Math.min(w - fx, Math.floor(faceBox.w * (1 + 2 * pad) * w));
    const fh = Math.min(h - fy, Math.floor(faceBox.h * (1 + 2 * pad) * h));
    img = sharp(await img.extract({ left: fx, top: fy, width: fw, height: fh }).toBuffer());
  }

  if (styleOpts) {
    img = img.modulate({
      brightness: styleOpts.brightness != null ? clamp(styleOpts.brightness, 0.5, 2.0) : undefined,
      saturation: styleOpts.saturation != null ? clamp(styleOpts.saturation, 0, 3.0) : undefined,
      hue: styleOpts.hue != null ? clamp(styleOpts.hue, -180, 180) : undefined,
    });
    if (styleOpts.blur != null && styleOpts.blur > 0) {
      img = img.blur(clamp(styleOpts.blur, 0.3, 5));
    }
  }

  // Resize to square
  const resized = await img.resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "cover" }).toBuffer();

  // Circular crop via mask
  const maskSvg = buildCircularMask(OUTPUT_SIZE);
  const circled = await sharp(resized)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Vignette
  const vignetteSvg = buildVignette(OUTPUT_SIZE);
  const vignetted = await sharp(circled)
    .composite([{ input: vignetteSvg, blend: "over" }])
    .png()
    .toBuffer();

  // Drop shadow — extend canvas, composite shadow below
  const total = OUTPUT_SIZE + SHADOW_PAD * 2;
  const shadowSvg = buildShadow(OUTPUT_SIZE, SHADOW_PAD);
  const withShadow = await sharp({
    create: { width: total, height: total, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: shadowSvg, top: 0, left: 0, blend: "over" },
      { input: vignetted, top: SHADOW_PAD, left: SHADOW_PAD, blend: "over" },
    ])
    .png()
    .toBuffer();

  return withShadow;
}
