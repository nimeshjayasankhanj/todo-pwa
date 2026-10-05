
export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f6f7fb]">
            <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl">
                <div className="flex min-h-screen flex-col">
                    {/* Header skeleton */}
                    <div className="px-5 pb-2 pt-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

                                <div className="mt-2 h-8 w-36 animate-pulse rounded-lg bg-gray-200" />
                            </div>

                            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                        </div>

                        <div className="mt-6 h-12 animate-pulse rounded-2xl bg-gray-100" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-5 pt-6">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />

                                <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-100" />
                            </div>

                            <div className="h-7 w-12 animate-pulse rounded-full bg-gray-100" />
                        </div>

                        <div className="space-y-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-gray-100 p-4"
                                >
                                    <div className="flex gap-3">
                                        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />

                                        <div className="flex-1">
                                            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

                                            <div className="mt-2 h-3 w-56 animate-pulse rounded bg-gray-100" />

                                            <div className="mt-3 h-3 w-20 animate-pulse rounded bg-gray-100" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom navigation skeleton */}
                    <div className="mt-auto flex h-20 items-center justify-around border-t border-gray-100">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-8 w-16 animate-pulse rounded-lg bg-gray-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
