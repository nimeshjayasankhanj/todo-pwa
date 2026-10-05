"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTodo(
    title: string,
    description: string
) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        throw new Error("Title is required");
    }

    await db.insert(todos).values({
        title: cleanTitle,
        description: description.trim() || null,
    });

    revalidatePath("/");
}

export async function updateTodo(
    id: number,
    title: string,
    description: string
) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        throw new Error("Title is required");
    }

    await db
        .update(todos)
        .set({
            title: cleanTitle,
            description: description.trim() || null,
            updatedAt: new Date(),
        })
        .where(eq(todos.id, id));

    revalidatePath("/");
}

export async function toggleTodo(
    id: number,
    completed: boolean
) {
    await db
        .update(todos)
        .set({
            completed,
            updatedAt: new Date(),
        })
        .where(eq(todos.id, id));

    revalidatePath("/");
}

export async function deleteTodo(id: number) {
    await db
        .delete(todos)
        .where(eq(todos.id, id));

    revalidatePath("/");
}