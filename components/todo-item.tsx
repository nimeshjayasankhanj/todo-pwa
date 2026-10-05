"use client";

import { useState, useTransition } from "react";
import type { todos } from "@/db/schema";
import {
    deleteTodo,
    toggleTodo,
    updateTodo,
} from "@/app/actions";

type Todo = typeof todos.$inferSelect;

type TodoItemProps = {
    todo: Todo;
};

function Spinner({
    dark = false,
}: {
    dark?: boolean;
}) {
    return (
        <span
            className={`h-4 w-4 animate-spin rounded-full border-2 ${dark
                ? "border-gray-300 border-t-gray-900"
                : "border-white/30 border-t-white"
                }`}
            aria-hidden="true"
        />
    );
}

export function TodoItem({
    todo,
}: TodoItemProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] =
        useState(todo.description ?? "");

    const [isPending, startTransition] =
        useTransition();

    const [operation, setOperation] = useState<
        "toggle" | "delete" | "save" | null
    >(null);

    const handleToggle = () => {
        if (isPending) return;

        setOperation("toggle");

        startTransition(async () => {
            try {
                await toggleTodo(
                    todo.id,
                    !todo.completed
                );
            } catch (error) {
                console.error(
                    "Failed to toggle todo:",
                    error
                );
            } finally {
                setOperation(null);
            }
        });
    };

    const handleDelete = () => {
        if (isPending) return;

        setOperation("delete");
        setShowMenu(false);

        startTransition(async () => {
            try {
                await deleteTodo(todo.id);
            } catch (error) {
                console.error(
                    "Failed to delete todo:",
                    error
                );

                setOperation(null);
            }
        });
    };

    const handleUpdate = () => {
        if (!title.trim() || isPending) return;

        setOperation("save");

        startTransition(async () => {
            try {
                await updateTodo(
                    todo.id,
                    title,
                    description
                );

                setEditing(false);
            } catch (error) {
                console.error(
                    "Failed to update todo:",
                    error
                );
            } finally {
                setOperation(null);
            }
        });
    };

    if (editing) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <input
                    disabled={isPending}
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Task title"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-400 focus:bg-white disabled:opacity-60"
                />

                <textarea
                    disabled={isPending}
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Description"
                    rows={3}
                    className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none focus:border-gray-400 focus:bg-white disabled:opacity-60"
                />

                <div className="mt-3 flex gap-2">
                    <button
                        onClick={handleUpdate}
                        disabled={
                            !title.trim() || isPending
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-xs font-semibold text-white disabled:opacity-50"
                    >
                        {operation === "save" ? (
                            <>
                                <Spinner />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </button>

                    <button
                        onClick={() => setEditing(false)}
                        disabled={isPending}
                        className="rounded-xl bg-gray-100 px-5 py-3 text-xs font-semibold text-gray-600 disabled:opacity-40"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative rounded-2xl border p-4 transition ${todo.completed
                ? "border-gray-100 bg-gray-50"
                : "border-gray-100 bg-white shadow-sm"
                } ${isPending ? "opacity-70" : ""}`}
        >
            <div className="flex items-start gap-3">
                <button
                    onClick={handleToggle}
                    disabled={isPending}
                    aria-label={
                        todo.completed
                            ? "Mark task incomplete"
                            : "Mark task complete"
                    }
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${todo.completed
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white hover:border-gray-500"
                        }`}
                >
                    {operation === "toggle" ? (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
                    ) : (
                        todo.completed && (
                            <span className="text-xs font-bold">
                                ✓
                            </span>
                        )
                    )}
                </button>

                <div className="min-w-0 flex-1">
                    <h3
                        className={`text-sm font-semibold ${todo.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                            }`}
                    >
                        {todo.title}
                    </h3>

                    {todo.description && (
                        <p
                            className={`mt-1 text-xs leading-5 ${todo.completed
                                ? "text-gray-400"
                                : "text-gray-500"
                                }`}
                        >
                            {todo.description}
                        </p>
                    )}

                    <div className="mt-3">
                        <span className="text-[11px] font-medium text-gray-400">
                            {todo.completed
                                ? "Completed"
                                : "Created"}{" "}
                            ·{" "}
                            {new Intl.DateTimeFormat("en", {
                                month: "short",
                                day: "numeric",
                            }).format(todo.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() =>
                            setShowMenu((value) => !value)
                        }
                        disabled={isPending}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-40"
                        aria-label="Task options"
                    >
                        ⋮
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                            <button
                                onClick={() => {
                                    setEditing(true);
                                    setShowMenu(false);
                                }}
                                disabled={isPending}
                                className="w-full px-4 py-3 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-40"
                            >
                                {operation === "delete" ? (
                                    <>
                                        <span className="h-3 w-3 animate-spin rounded-full border border-red-200 border-t-red-500" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {operation === "delete" && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
                        Deleting task...
                    </div>
                </div>
            )}
        </div>
    );
}