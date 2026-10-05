import { TodoItem } from "./todo-item";
import type { todos } from "@/db/schema";

type Todo = typeof todos.$inferSelect;

type TodoListProps = {
    todos: Todo[];
};

export function TodoList({
    todos: todoItems,
}: TodoListProps) {
    if (todoItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    ✓
                </div>

                <h3 className="text-base font-semibold text-gray-900">
                    No tasks yet
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                    Tap the + button below to create your first task.
                </p>
            </div>
        );
    }

    const pendingTodos = todoItems.filter(
        (todo) => !todo.completed
    );

    const completedTodos = todoItems.filter(
        (todo) => todo.completed
    );

    return (
        <div className="space-y-3">
            {pendingTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                />
            ))}

            {completedTodos.length > 0 && (
                <div className="pb-2 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Completed
                    </p>
                </div>
            )}

            {completedTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </div>
    );
}