"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

import { authService } from "../../features/auth/auth.service";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError("Email is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }
        try {
            setLoading(true);
            const response = await authService.login({
                email: normalizedEmail,
                password,
            });
            const { token } = response.data.data;
            sessionStorage.setItem("auth_token", token);
            await refreshUser();
            router.push("/");
        } catch (error: unknown) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                const errorCode = error.response?.data?.code;

                switch (errorCode) {
                    case "INVALID_CREDENTIALS":
                        setError("Invalid email or password.");
                        break;

                    case "EMAIL_NOT_VERIFIED":
                        setError(
                            "Please verify your email before logging in."
                        );
                        break;

                    case "GOOGLE_ACCOUNT":
                        setError(
                            "This account was created with Google. Please sign in with Google."
                        );
                        break;

                    default:
                        setError(
                            error.response?.data?.message ??
                            "Unable to log in."
                        );
                }
            } else {
                setError("Unexpected error.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-6 pt-32 pb-20">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back
                </h1>

                <p className="mt-2 mb-8 text-gray-500">
                    Log in to your VECI account.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Your password"
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

            </div>
        </main>
    );
}