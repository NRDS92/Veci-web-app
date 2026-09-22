"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";

import api from "@/lib/api";

type VerificationStatus =
    | "loading"
    | "success"
    | "error";

export default function VerifyEmail() {
    const params = useParams();
    const router = useRouter();

    const [status, setStatus] =
        useState<VerificationStatus>("loading");

    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            const tokenParam = params?.token;

            const token = Array.isArray(tokenParam)
                ? tokenParam[0]
                : tokenParam;

            if (!token) {
                setStatus("error");
                setMessage("Verification token is missing.");
                return;
            }

            try {
                await api.get(
                    `/auth/verify/${encodeURIComponent(token)}`
                );

                setStatus("success");
                setMessage(
                    "Your email has been verified successfully."
                );
            } catch (error: unknown) {
                console.error(
                    "Email verification error:",
                    error
                );

                setStatus("error");

                if (axios.isAxiosError(error)) {
                    const errorCode =
                        error.response?.data?.code;

                    if (errorCode === "INVALID_TOKEN") {
                        setMessage(
                            "This verification link is invalid or has expired."
                        );
                    } else {
                        setMessage(
                            error.response?.data?.message ??
                                "Unable to verify your email."
                        );
                    }
                } else {
                    setMessage(
                        "Unable to verify your email."
                    );
                }
            }
        };

        verifyEmail();
    }, [params]);

    return (
        <main className="min-h-screen bg-gray-50 px-6 pt-32 pb-20">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

                {status === "loading" && (
                    <>
                        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7A00]" />

                        <h1 className="text-2xl font-bold text-gray-900">
                            Verifying your email
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                            ✓
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Email verified
                        </h1>

                        <p className="mt-3 text-gray-500">
                            {message}
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-[#FF7A00]
                                px-5
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:scale-[1.01]
                            "
                        >
                            Go to login
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                            !
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Verification failed
                        </h1>

                        <p className="mt-3 text-gray-500">
                            {message}
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-5
                                py-3
                                font-semibold
                                text-gray-700
                                transition
                                hover:bg-gray-50
                            "
                        >
                            Go to login
                        </button>
                    </>
                )}
            </div>
        </main>
    );
}