import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EventForm from "@/components/create/EventForm";

export default function CreateEventPage() {
    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50 px-6 pb-20 pt-32">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create an Event
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Share an event with the Veci community.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                        <EventForm />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}