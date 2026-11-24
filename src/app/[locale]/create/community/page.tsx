import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CommunityForm from "@/components/create/CommunityForm";
import { useTranslations } from "next-intl";

export default function CreateCommunityPage() {
    const t = useTranslations("CommunityCreation");
    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50 px-6 pb-20 pt-32">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {t("page.title")}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {t("page.description")}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                        <CommunityForm />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
