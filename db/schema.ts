import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    title: varchar("title", {
        length: 255,
    }).notNull(),

    description: text("description"),

    completed: boolean("completed")
        .notNull()
        .default(false),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});