import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getD1() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB`.",
    );
  }
  return env.DB;
}

export function getDb() {
  return drizzle(getD1(), { schema });
}

export async function ensureEnquiriesSchema() {
  const d1 = getD1();
  await d1.batch([
    d1.prepare(
      `CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY NOT NULL,
        created_at INTEGER NOT NULL,
        kind TEXT NOT NULL,
        language TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        payload TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new'
      )`,
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS enquiries_kind_idx ON enquiries (kind)",
    ),
  ]);
}
