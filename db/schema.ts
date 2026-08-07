import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable(
  "enquiries",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at").notNull(),
    kind: text("kind").notNull(),
    language: text("language").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    payload: text("payload").notNull(),
    status: text("status").notNull().default("new"),
  },
  (table) => [
    index("enquiries_created_at_idx").on(table.createdAt),
    index("enquiries_kind_idx").on(table.kind),
  ],
);

export const properties = sqliteTable(
  "properties",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    routeOrder: integer("route_order").notNull(),
    address: text("address").notNull(),
    region: text("region").notNull(),
    keyCode: text("key_code"),
    contactName: text("contact_name"),
    contactPhone: text("contact_phone"),
    lastInspectionDate: text("last_inspection_date"),
    nextInspectionDate: text("next_inspection_date"),
    inspectionIntervalMonths: integer("inspection_interval_months")
      .notNull()
      .default(3),
    notes: text("notes"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    index("properties_route_order_idx").on(table.routeOrder),
    index("properties_next_inspection_date_idx").on(table.nextInspectionDate),
    index("properties_region_idx").on(table.region),
  ],
);

export const inspections = sqliteTable(
  "inspections",
  {
    id: text("id").primaryKey(),
    propertyId: integer("property_id")
      .notNull()
      .references(() => properties.id),
    originalPlannedDate: text("original_planned_date").notNull(),
    plannedDate: text("planned_date").notNull(),
    plannedTime: text("planned_time"),
    completedDate: text("completed_date"),
    rescheduleCount: integer("reschedule_count").notNull().default(0),
    notes: text("notes"),
    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    index("inspections_property_id_idx").on(table.propertyId),
    index("inspections_planned_date_idx").on(table.plannedDate),
    index("inspections_completed_date_idx").on(table.completedDate),
  ],
);
