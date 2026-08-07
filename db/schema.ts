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
