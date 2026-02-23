import { callClaude } from "./anthropic.js";

const PALETTE = ["#FFD6E0", "#C1E3FF", "#E0C3FC", "#C1F0C1", "#FFF3C4", "#FFDAB9", "#B5D5FF", "#F9C6D0"];

const SVG_SYSTEM_PROMPT = `You are an SVG artist. Generate a 200x200 SVG illustration based on the description. Use ONLY these pastel colors: ${PALETTE.join(", ")}. Return ONLY the SVG markup starting with <svg. No explanations. Keep it simple and abstract.`;

const DANGEROUS_TAGS = ["script", "foreignObject", "use", "image", "iframe", "animate", "set"];
const DANGEROUS_ATTRS = /\bon\w+\s*=/gi;

export function sanitizeSVG(svg: string): string {
  let safe = svg;
  for (const tag of DANGEROUS_TAGS) {
    safe = safe.replace(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"), "");
    safe = safe.replace(new RegExp(`<${tag}[^>]*/>`, "gi"), "");
  }
  safe = safe.replace(DANGEROUS_ATTRS, "data-removed=");
  safe = safe.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  return safe;
}

export async function generateSVG(description: string): Promise<string> {
  const response = await callClaude(
    [{ role: "user", content: `Create an SVG illustration of: ${description}` }],
    { systemPrompt: SVG_SYSTEM_PROMPT, maxTokens: 800 }
  );

  const svgMatch = response.match(/<svg[\s\S]*<\/svg>/i);
  if (!svgMatch) {
    throw new Error("Claude did not return valid SVG");
  }

  return sanitizeSVG(svgMatch[0]);
}
