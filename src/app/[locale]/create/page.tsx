import {Link} from "../../../i18n/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CreatePage() {
    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50 px-6 pb-20 pt-32">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Create on Veci
                        </h1>

                        <p className="mx-auto mt-3 max-w-xl text-gray-600">
                            Share an event or add a business to the
                            community.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Link
                            href="/create/event"
                            className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-md"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                                🎉
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900">
                                Create an Event
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Share an event with the Veci community
                                and help people discover what is happening
                                in their city.
                            </p>

                            <span className="mt-6 inline-block text-sm font-semibold text-[#FF7A00]">
                                Create Event →
                            </span>
                        </Link>

                        <Link
                            href="/create/business"
                            className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-md"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                                🏪
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900">
                                Create a Business
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Add a business to Veci and make it easier
                                for the community to discover it.
                            </p>

                            <span className="mt-6 inline-block text-sm font-semibold text-[#FF7A00]">
                                Add Business →
                            </span>
                        </Link>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}