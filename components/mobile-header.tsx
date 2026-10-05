export function MobileHeader() {
    return (
        <header className="px-5 pb-2 pt-8">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        Good evening 👋
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                        Your Tasks
                    </h1>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
                    👤
                </div>
            </div>


        </header>
    );
}