"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { OwnerBusinessResponseSchema, type OwnerBusiness } from "@ndrs92/contracts";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BusinessForm from "@/components/create/BusinessForm";
import { businessService } from "@/features/business/business.service";
import { getApiError } from "@/lib/api/apiError";

type LoadState =
    | { status: "loading" }
    | { status: "ready"; business: OwnerBusiness }
    | { status: "error"; message: string };

export default function EditBusinessPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id;
    const [state, setState] = useState<LoadState>({ status: "loading" });

    useEffect(() => {
        let active = true;

        const loadBusiness = async () => {
            try {
                const ownedResponse = await businessService.getMyBusinesses();
                const ownedBusinesses = ownedResponse.data.data;
                if (!ownedBusinesses.some((business) => business._id === id)) {
                    if (active) setState({ status: "error", message: "You are not authorized to edit this business." });
                    return;
                }

                const response = await businessService.getBusinessById(id);
                const parsed = OwnerBusinessResponseSchema.safeParse(response.data);
                if (!parsed.success) {
                    throw new Error("The business response is incomplete or invalid.");
                }

                const business = parsed.data.data;
                if (active) setState({ status: "ready", business });
            } catch (error) {
                const apiError = getApiError(error);
                if (active) {
                    setState({
                        status: "error",
                        message: apiError.code === "UNKNOWN_ERROR"
                            ? error instanceof Error ? error.message : apiError.message
                            : apiError.message,
                    });
                }
            }
        };

        void loadBusiness();
        return () => { active = false; };
    }, [id]);

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50 px-6 pb-20 pt-32">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Edit Business</h1>
                        <p className="mt-2 text-gray-600">Update your business information.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                        {state.status === "loading" && (
                            <p role="status" className="py-8 text-center text-gray-600">Loading business…</p>
                        )}
                        {state.status === "error" && (
                            <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                                {state.message}
                                <button type="button" onClick={() => router.replace("/user/myBusiness")} className="ml-2 font-semibold underline">
                                    Return to My Businesses
                                </button>
                            </div>
                        )}
                        {state.status === "ready" && <BusinessForm initialBusiness={state.business} />}
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
