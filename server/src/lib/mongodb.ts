import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "personal-website";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) { return db; }
  if (!uri) { throw new Error("MONGODB_URI not set"); }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}
