"use client";

import axios from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

import { authService } from "@/features/auth/auth.service";

export default function ResetPasswordForm() {
    const params = useParams();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const token = params.token as string;

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await authService.resetPassword({
                token,
                password,
            });

            setSuccess("Password updated successfully.");

            setPassword("");
            setConfirmPassword("");

        } catch (error: unknown) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ??
                    "Unable to reset password."
                );
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

                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Reset password
                </h1>

                <p className="mb-8 text-gray-500">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            New password
                        </label>

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your new password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm password
                        </label>

                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm your new password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            }
                        />

                        Show password
                    </label>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Updating..."
                            : "Reset password"}
                    </button>

                    {success && (
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="w-full text-sm font-medium text-blue-600 hover:underline"
                        >
                            Go to login
                        </button>
                    )}

                </form>
            </div>
        </main>
    );
}