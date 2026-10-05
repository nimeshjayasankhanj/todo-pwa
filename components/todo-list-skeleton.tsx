
export function TodoListSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <div className="h-6 w-20 rounded-md bg-gray-200" />

                    <div className="mt-2 h-4 w-32 rounded-md bg-gray-100" />
                </div>

                <div className="h-7 w-12 rounded-full bg-gray-100" />
            </div>

            {/* Todo cards */}
            <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="rounded-2xl border border-gray-100 bg-white p-4"
                    >
                        <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <div className="h-6 w-6 shrink-0 rounded-full bg-gray-200" />

                            <div className="flex-1">
                                {/* Title */}
                                <div className="h-4 w-40 rounded bg-gray-200" />

                                {/* Description */}
                                <div className="mt-2 h-3 w-56 rounded bg-gray-100" />

                                {/* Date */}
                                <div className="mt-3 h-3 w-24 rounded bg-gray-100" />
                            </div>

                            {/* Menu */}
                            <div className="h-8 w-8 rounded-full bg-gray-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
