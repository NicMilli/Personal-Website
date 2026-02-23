import Anthropic from "@anthropic-ai/sdk";
import { recordUsage } from "./tokenBudget.js";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY not set");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CallClaudeOpts {
  systemPrompt?: string;
  maxTokens?: number;
}

export async function callClaude(
  messages: ChatMessage[],
  opts: CallClaudeOpts = {}
): Promise<string> {
  const anthropic = getClient();
  const maxTokens = opts.maxTokens ?? 500;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: maxTokens,
    system: opts.systemPrompt,
    messages,
  });

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  await recordUsage(inputTokens + outputTokens);

  const block = response.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }
  return block.text;
}

export async function callClaudeWithImage(
  imageBase64: string,
  mimeType: "image/jpeg" | "image/png" | "image/webp",
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType,
              data: imageBase64,
            },
          },
          { type: "text", text: prompt },
        ],
      },
    ],
  });

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  await recordUsage(inputTokens + outputTokens);

  const block = response.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }
  return block.text;
}
