"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const router = useRouter();

    const {
        user,
        loading,
        isAuthenticated,
    } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [
        loading,
        isAuthenticated,
        router,
    ]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 pt-32 pb-20">
                <div className="mx-auto flex max-w-md justify-center">
                    <div
                        className="
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-gray-200
                            border-t-[#FF7A00]
                        "
                    />
                </div>
            </main>
        );
    }

    if (!user || !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}