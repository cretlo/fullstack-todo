import { date, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

//export const users = pgTable("users", {
//  id: serial("id").primaryKey(),
//  fullName: text("full_name"),
//  phone: varchar("phone", { length: 256 }),
//});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Todo = InferModel<typeof todos, "select">;
export type NewTodo = InferModel<typeof todos, "insert">;
