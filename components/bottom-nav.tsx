"use client";

import { useState } from "react";
import { TodoForm } from "./todo-form";

export function BottomNav() {
    const [showForm, setShowForm] =
        useState(false);

    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                aria-label="Add todo"
                className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-3xl font-light text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:absolute sm:right-5"
            >
                +
            </button>

            <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-md border-t border-gray-100 bg-white/95 px-5 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-md">
                <div className="flex h-16 items-center justify-around">
                    <button className="flex min-w-[80px] flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold text-gray-900">
                        <span className="text-lg">⌂</span>
                        <span>Tasks</span>
                    </button>

                    {/* <button className="flex min-w-[80px] flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold text-gray-400">
                        <span className="text-lg">✓</span>
                        <span>Completed</span>
                    </button>

                    <button className="flex min-w-[80px] flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold text-gray-400">
                        <span className="text-lg">⚙</span>
                        <span>Settings</span>
                    </button> */}
                </div>
            </nav>

            {showForm && (
                <TodoForm
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    );
}