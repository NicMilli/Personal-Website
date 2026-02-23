import { callClaude, callClaudeWithImage } from "./anthropic.js";

const TEXT_BLOCKLIST = [
  "nude", "naked", "porn", "sex", "xxx", "nsfw",
  "cocaine", "heroin", "meth", "weed", "cannabis",
  "gun", "rifle", "pistol", "bomb", "weapon", "terrorist",
  "nazi", "fascist", "kkk",
  "kill", "rape", "murder",
  "trump", "biden", "obama", "maga", "democrat", "republican",
];

const MODERATION_SYSTEM_PROMPT = `You are a content moderation assistant. Evaluate whether the given content is appropriate for a personal portfolio website. Return ONLY valid JSON: {"approved": true} or {"approved": false, "reason": "short reason"}. Reject: nudity, sexual content, alcohol, smoking, drugs, weapons, political content, violence, hate speech, recognisable celebrities.`;

export interface ModerationResult {
  approved: boolean;
  reason?: string;
}

export async function moderateText(text: string): Promise<ModerationResult> {
  const lower = text.toLowerCase();
  for (const word of TEXT_BLOCKLIST) {
    if (lower.includes(word)) {
      return { approved: false, reason: `Blocked term detected: ${word}` };
    }
  }

  const response = await callClaude(
    [{ role: "user", content: `Evaluate this text: "${text}"` }],
    { systemPrompt: MODERATION_SYSTEM_PROMPT, maxTokens: 100 }
  );

  return parseModResult(response);
}

export interface ImageModerationResult extends ModerationResult {
  type?: "person" | "object" | "scene" | "abstract";
  faceBox?: { x: number; y: number; w: number; h: number };
}

export async function moderateImage(
  imageBase64: string,
  mimeType: "image/jpeg" | "image/png" | "image/webp"
): Promise<ImageModerationResult> {
  const prompt = `Analyze this image for content safety and identify the subject. Return ONLY valid JSON matching this schema: {"approved": boolean, "type": "person|object|scene|abstract", "faceBox": {"x": 0.0, "y": 0.0, "w": 0.0, "h": 0.0} | null, "reason": "string if not approved"}. faceBox values are fractions of image dimensions (0.0 to 1.0). Only include faceBox if type is "person". Reject: nudity, sexual content, alcohol, smoking, drugs, weapons, political content, violence, hate speech, celebrities.`;

  const response = await callClaudeWithImage(imageBase64, mimeType, prompt);
  return parseModResult(response) as ImageModerationResult;
}

function parseModResult(raw: string): ModerationResult {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { approved: false, reason: "Could not parse moderation response" };
  }
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return { approved: false, reason: "Could not parse moderation response" };
  }
}
