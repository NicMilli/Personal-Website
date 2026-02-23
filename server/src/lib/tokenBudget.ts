import { getDb } from "./mongodb.js";

const MONTHLY_BUDGET = parseInt(process.env.MONTHLY_TOKEN_BUDGET ?? "500000", 10);

interface UsageDoc {
  _id: string;
  totalTokens: number;
  updatedAt: Date;
}

function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function checkBudget(): Promise<void> {
  const db = await getDb();
  const doc = await db.collection<UsageDoc>("usage").findOne({ _id: getCurrentMonthKey() });
  if (doc && (doc.totalTokens ?? 0) >= MONTHLY_BUDGET) {
    throw new Error("MONTHLY_BUDGET_EXCEEDED");
  }
}

export async function recordUsage(tokens: number): Promise<void> {
  const db = await getDb();
  const key = getCurrentMonthKey();
  await db.collection<UsageDoc>("usage").updateOne(
    { _id: key },
    {
      $inc: { totalTokens: tokens },
      $set: { updatedAt: new Date() },
    },
    { upsert: true }
  );
}
