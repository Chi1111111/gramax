import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import inspectionSeed from "./inspection-seed.json";

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

type SeedProperty = {
  routeOrder: number;
  address: string;
  region: string;
  keyCode: string | null;
  contactName: string | null;
  contactPhone: string | null;
  lastInspectionDate: string | null;
  nextInspectionDate: string | null;
  inspectionIntervalMonths: number;
  notes: string | null;
};

export async function ensureInspectionSchema() {
  const d1 = getD1();
  await d1.batch([
    d1.prepare(
      `CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_order INTEGER NOT NULL,
        address TEXT NOT NULL,
        region TEXT NOT NULL,
        key_code TEXT,
        contact_name TEXT,
        contact_phone TEXT,
        last_inspection_date TEXT,
        next_inspection_date TEXT,
        inspection_interval_months INTEGER NOT NULL DEFAULT 3,
        notes TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`,
    ),
    d1.prepare(
      `CREATE TABLE IF NOT EXISTS inspections (
        id TEXT PRIMARY KEY NOT NULL,
        property_id INTEGER NOT NULL,
        original_planned_date TEXT NOT NULL,
        planned_date TEXT NOT NULL,
        planned_time TEXT,
        completed_date TEXT,
        reschedule_count INTEGER NOT NULL DEFAULT 0,
        notes TEXT,
        created_by TEXT NOT NULL,
        updated_by TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (property_id) REFERENCES properties(id)
      )`,
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS properties_route_order_idx ON properties (route_order)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS properties_next_inspection_date_idx ON properties (next_inspection_date)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS properties_region_idx ON properties (region)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS inspections_property_id_idx ON inspections (property_id)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS inspections_planned_date_idx ON inspections (planned_date)",
    ),
    d1.prepare(
      "CREATE INDEX IF NOT EXISTS inspections_completed_date_idx ON inspections (completed_date)",
    ),
  ]);

  const count = await d1
    .prepare("SELECT COUNT(*) AS count FROM properties")
    .first<{ count: number }>();
  if ((count?.count ?? 0) > 0) return;

  const now = Date.now();
  const seed = inspectionSeed as SeedProperty[];
  for (let offset = 0; offset < seed.length; offset += 40) {
    const chunk = seed.slice(offset, offset + 40);
    await d1.batch(
      chunk.map((property) =>
        d1
          .prepare(
            `INSERT INTO properties (
              route_order, address, region, key_code, contact_name, contact_phone,
              last_inspection_date, next_inspection_date, inspection_interval_months,
              notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          )
          .bind(
            property.routeOrder,
            property.address,
            property.region,
            property.keyCode,
            property.contactName,
            property.contactPhone,
            property.lastInspectionDate,
            property.nextInspectionDate,
            property.inspectionIntervalMonths,
            property.notes,
            now,
            now,
          ),
      ),
    );
  }

  await d1.prepare("PRAGMA optimize").run();
}
