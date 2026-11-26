"use client";

import axios from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

import { authService } from "@/features/auth/auth.service";
import { PasswordSchema } from "@ndrs92/contracts";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { useTranslations } from "next-intl";

export default function ResetPasswordForm() {
    const params = useParams();
    const router = useRouter();
    const t = useTranslations("PasswordSecurity");

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
            setError(t("invalidToken"));
            return;
        }

        if (password.length === 0) {
            setError(t("required"));
            return;
        }

        if (!PasswordSchema.safeParse(password).success) {
            setError(t("policyError"));
            return;
        }

        if (password !== confirmPassword) {
            setError(t("mismatch"));
            return;
        }

        try {
            setLoading(true);

            await authService.resetPassword({
                token,
                password,
            });

            setSuccess(t("resetSuccess"));

            setPassword("");
            setConfirmPassword("");

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const code = error.response?.data?.code;
                if (code === "INVALID_RESET_TOKEN") setError(t("invalidToken"));
                else if (code === "VALIDATION_ERROR" || code === "PASSWORD_REUSE") setError(t("policyError"));
                else if (code === "RATE_LIMITED") setError(t("rateLimited"));
                else setError(t("resetError"));
            } else {
                setError(t("genericError"));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-6 pt-32 pb-20">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    {t("resetTitle")}
                </h1>

                <p className="mb-8 text-gray-500">
                    {t("resetDescription")}
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
                            {t("newPassword")}
                        </label>

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder={t("newPasswordPlaceholder")}
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        <PasswordRequirements password={password} />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            {t("confirmPassword")}
                        </label>

                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder={t("confirmPasswordPlaceholder")}
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

                        {t("showPassword")}
                    </label>

                    {error && (
                        <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? t("submitting")
                            : t("resetTitle")}
                    </button>

                    {success && (
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="w-full text-sm font-medium text-blue-600 hover:underline"
                        >
                            {t("goToLogin")}
                        </button>
                    )}

                </form>
            </div>
        </main>
    );
}
