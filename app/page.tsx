
import { Suspense } from "react";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { desc } from "drizzle-orm";

import { MobileHeader } from "@/components/mobile-header";
import { TodoList } from "@/components/todo-list";
import { TodoListSkeleton } from "@/components/todo-list-skeleton";
import { BottomNav } from "@/components/bottom-nav";

export const dynamic = "force-dynamic";

async function TodoContent() {
  const todoItems = await db
    .select()
    .from(todos)
    .orderBy(desc(todos.createdAt));

  const pendingCount = todoItems.filter(
    (todo) => !todo.completed
  ).length;

  const completedCount = todoItems.filter(
    (todo) => todo.completed
  ).length;

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Today
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {pendingCount === 0
              ? "You're all caught up 🎉"
              : `${pendingCount} ${pendingCount === 1
                ? "task"
                : "tasks"
              } remaining`}
          </p>
        </div>

        <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
          {completedCount}/{todoItems.length}
        </div>
      </div>

      <TodoList todos={todoItems} />
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-gray-900">
      <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl">
        <div className="relative min-h-screen pb-24">
          <MobileHeader pendingCount={0} />

          <section className="px-5 pt-6">
            <Suspense fallback={<TodoListSkeleton />}>
              <TodoContent />
            </Suspense>
          </section>

          <BottomNav />
        </div>
      </div>
    </main>
  );
}
