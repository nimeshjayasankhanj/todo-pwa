"use client";

import { useState, useTransition } from "react";
import { createTodo } from "@/app/actions";

type TodoFormProps = {
    onClose: () => void;
};

function Spinner() {
    return (
        <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
        />
    );
}

export function TodoForm({
    onClose,
}: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");

    const [isPending, startTransition] =
        useTransition();

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!title.trim() || isPending) return;

        startTransition(async () => {
            try {
                await createTodo(title, description);

                setTitle("");
                setDescription("");

                onClose();
            } catch (error) {
                console.error("Failed to create todo:", error);
            }
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:px-4"
            onClick={isPending ? undefined : onClose}
        >
            <div
                className="w-full max-w-md rounded-t-3xl bg-white px-5 pb-8 pt-4 shadow-2xl sm:rounded-3xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-gray-200 sm:hidden" />

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            New task
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            What needs to be done?
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 disabled:opacity-40"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label className="mb-2 block text-xs font-semibold text-gray-600">
                            Title
                        </label>

                        <input
                            autoFocus
                            disabled={isPending}
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="e.g. Buy groceries"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold text-gray-600">
                            Description
                        </label>

                        <textarea
                            disabled={isPending}
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Add some details..."
                            rows={3}
                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={
                            !title.trim() || isPending
                        }
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isPending ? (
                            <>
                                <Spinner />
                                Saving...
                            </>
                        ) : (
                            "Add task"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}