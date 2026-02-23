import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { imageLimiter } from "../middleware/rateLimiter.js";
import { checkBudget } from "../lib/tokenBudget.js";
import { moderateText, moderateImage } from "../lib/contentGuard.js";
import { processImage, type StyleOpts } from "../lib/imageProcessor.js";
import { generateSVG } from "../lib/svgGenerator.js";
import { getDb } from "../lib/mongodb.js";
import { uploadToR2 } from "../lib/r2.js";
import { callClaude } from "../lib/anthropic.js";

export const bubblesRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

const STYLE_SYSTEM_PROMPT = `You are a photo style interpreter. Convert the user's style description into Sharp.js modulate parameters. Return ONLY valid JSON: {"brightness": 1.0, "saturation": 1.0, "hue": 0, "blur": 0}. brightness: 0.5-2.0, saturation: 0-3.0, hue: -180 to 180, blur: 0-5. Default to 1.0/1.0/0/0 if unclear.`;

interface BubbleDoc {
  _id: string;
  imageUrl: string;
  type: "upload" | "svg";
  createdAt: Date;
  expiresAt: Date;
}

async function saveBubble(imageUrl: string, type: "upload" | "svg"): Promise<void> {
  const db = await getDb();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  await db.collection<BubbleDoc>("bubbles").insertOne({
    _id: uuidv4(),
    imageUrl,
    type,
    createdAt: now,
    expiresAt,
  });
}

// GET /api/bubbles
bubblesRouter.get("/", async (_req, res) => {
  const db = await getDb();
  const now = new Date();
  const docs = await db
    .collection("bubbles")
    .find({ expiresAt: { $gt: now } })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();

  const urls = docs.map((d) => d.imageUrl as string).slice(0, 5);
  res.json({ urls });
});

// POST /api/bubble/image — upload + process
bubblesRouter.post("/image", imageLimiter, upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No image provided" });
    return;
  }

  try {
    await checkBudget();
  } catch {
    res.status(429).json({ error: "Service temporarily unavailable." });
    return;
  }

  const mimeType = req.file.mimetype as "image/jpeg" | "image/png" | "image/webp";
  const imageBase64 = req.file.buffer.toString("base64");

  const modResult = await moderateImage(imageBase64, mimeType);
  if (!modResult.approved) {
    res.status(422).json({ error: "Image not approved: " + (modResult.reason ?? "content policy") });
    return;
  }

  const styleText = typeof req.body.style === "string" ? req.body.style : "";
  let styleOpts: StyleOpts | undefined;

  if (styleText) {
    const modStyle = await moderateText(styleText);
    if (!modStyle.approved) {
      res.status(422).json({ error: "Style description not approved." });
      return;
    }
    const styleRaw = await callClaude(
      [{ role: "user", content: styleText }],
      { systemPrompt: STYLE_SYSTEM_PROMPT, maxTokens: 100 }
    );
    const match = styleRaw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        styleOpts = JSON.parse(match[0]) as StyleOpts;
      } catch {
        styleOpts = undefined;
      }
    }
  }

  const processed = await processImage(
    req.file.buffer,
    modResult.faceBox ?? undefined,
    styleOpts
  );

  const filename = `${uuidv4()}.png`;
  const url = await uploadToR2(processed, filename);
  await saveBubble(url, "upload");

  res.json({ url });
});

// POST /api/bubble/describe — generate SVG from description
bubblesRouter.post("/describe", imageLimiter, async (req, res) => {
  const { description } = req.body as { description?: string };

  if (!description || typeof description !== "string") {
    res.status(400).json({ error: "description required" });
    return;
  }

  try {
    await checkBudget();
  } catch {
    res.status(429).json({ error: "Service temporarily unavailable." });
    return;
  }

  const modResult = await moderateText(description);
  if (!modResult.approved) {
    res.status(422).json({ error: "Description not approved: " + (modResult.reason ?? "content policy") });
    return;
  }

  const svg = await generateSVG(description);
  const pngBuffer = await import("sharp").then(({ default: sharp }) =>
    sharp(Buffer.from(svg)).png().toBuffer()
  );

  const processed = await processImage(pngBuffer);
  const filename = `${uuidv4()}.png`;
  const url = await uploadToR2(processed, filename);
  await saveBubble(url, "svg");

  res.json({ url });
});
