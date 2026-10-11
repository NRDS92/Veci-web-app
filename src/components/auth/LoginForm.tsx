"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";

import { authService } from "../../features/auth/auth.service";
import { useAuth } from "./AuthProvider";
import ColombiaLoader from "../../components/ui/loader/ColombiaLoader";
import { useTranslations } from "next-intl";
import { useNotification } from "@/components/notifications/NotificationProvider";
import {
    Empanada,
    Jaguar,
    Colibri ,
    CarnavalBarranquilla 
} from "@mteherandev/colombia-icons-react";

export default function LoginForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const t = useTranslations("LoginForm");
    const { notify } = useNotification();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
    ) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
        notify({
        type: "warning",
        title: t("validation.emailRequired.title"),
        message: t("validation.emailRequired.message"),
        });
        return;
    }

    if (!password) {
        notify({
        type: "warning",
        title: t("validation.passwordRequired.title"),
        message: t("validation.passwordRequired.message"),
        });
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

        notify({
        type: "success",
        title: t("success.title"),
        message: t("success.message"),
        });

        router.push("/");
    } catch (error: unknown) {
        console.error("Login error:", error);

        if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.code;

        switch (errorCode) {
            case "INVALID_CREDENTIALS":
            notify({
                type: "error",
                title: t("errors.invalidCredentials.title"),
                message: t("errors.invalidCredentials.message"),
            });
            break;

            case "EMAIL_NOT_VERIFIED":
            notify({
                type: "warning",
                title: t("errors.emailNotVerified.title"),
                message: t("errors.emailNotVerified.message"),
            });
            break;

            case "GOOGLE_ACCOUNT":
            notify({
                type: "info",
                title: t("errors.googleAccount.title"),
                message: t("errors.googleAccount.message"),
            });
            break;

            default:
            notify({
                type: "error",
                title: t("errors.generic.title"),
                message: t("errors.generic.message"),
            });
        }
        } else {
        notify({
            type: "error",
            title: t("errors.generic.title"),
            message: t("errors.generic.message"),
        });
        }
    } finally {
        setLoading(false);
    }
    };


    return (
        <>
            {/* =========================
                LOGIN LOADING
            ========================== */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.96,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <ColombiaLoader
                                size="lg"
                                text={t("loader")}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =========================
                PAGE
            ========================== */}

            <main className="min-h-screen bg-[#F8F8F6] p-3 md:p-5 mt-25">

                <div className="grid min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[28px] bg-white shadow-sm md:grid-cols-2 md:min-h-[calc(100vh-2.5rem)]">

                    {/* =========================
                        BRAND / IMAGE PANEL
                    ========================== */}

                    <section className="relative hidden min-h-[700px] overflow-hidden md:block">
                        <Image
                            src="/login1.webp"
                            alt="Latin American community in Europe"
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Dark gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/25 to-[#111827]/10" />
                        {/* Decorative icons */}
                        <motion.div
                            className="absolute right-[15%] top-[15%] z-10"
                            animate={{
                                y: [0, -10, 0],
                                rotate: [-5, 5, -5],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Empanada
                                size={44}
                                color="#F2C94C"
                            />
                        </motion.div>
                        <motion.div
                            className="absolute right-[8%] top-[32%] z-10"
                            animate={{
                                y: [0, 8, 0],
                                rotate: [5, -5, 5],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Jaguar 
                                size={48}
                                color="#FFFFFF"
                            />
                        </motion.div>
                        <motion.div
                            className="absolute left-[8%] top-[22%] z-10"
                            animate={{
                                y: [0, 8, 0],
                                rotate: [5, -5, 5],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <CarnavalBarranquilla  
                                size={48}
                                color="#FFFFFF"
                            />
                        </motion.div>

                        <motion.div
                            className="absolute left-[12%] top-[38%] z-10"
                            animate={{
                                y: [0, -7, 0],
                                x: [0, 5, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Colibri 
                                size={80}
                                color="#F2C94C"
                            />
                        </motion.div>
                        {/* Bottom content */}
                        <div className="absolute bottom-10 left-8 right-8 z-20">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="h-px w-10 bg-[#F2C94C]" />
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                                    Colombia → Europe
                                </span>
                            </div>
                            <h2 className="max-w-lg text-4xl font-bold leading-[1.05] tracking-tight text-white lg:text-5xl">
                                {t("headline.first")}
                                <br />
                                {t("headline.second")}
                                <br />
                                <span className="text-[#F2C94C]">
                                    {t("headline.third")}
                                </span>
                            </h2>
                            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
                                {t("description")}
                            </p>
                        </div>
                    </section>

                    {/* =========================
                        FORM PANEL
                    ========================== */}
                    <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
                        <div className="w-full max-w-md">
                            {/* Mobile logo */}
                            <div className="mb-12 md:hidden">
                                <span className="text-xl font-black tracking-[0.25em] text-[#111827]">
                                    VECI
                                </span>
                            </div>
                            {/* Header */}
                            <div className="mb-10">
                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#4C76F2]">
                                    {t("welcome")}
                                </p>
                                <h1 className="text-4xl font-bold tracking-tight text-[#111827]">
                                    {t("heading")}
                                </h1>
                                <p className="mt-3 max-w-sm leading-relaxed text-gray-500">
                                    {t("subtitle")}
                                </p>
                            </div>
                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-[#111827]"
                                    >
                                        {t("email")}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder={t("emailPlaceholder")}
                                        autoComplete="email"
                                        disabled={loading}
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#4C76F2] focus:bg-white focus:ring-4 focus:ring-[#4C76F2]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                                {/* Password */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-[#111827]"
                                        >
                                            {t("password")}
                                        </label>
                                        <button
                                            type="button"
                                            className="text-xs font-medium text-[#4C76F2] hover:underline"
                                        >
                                            {t("forgotPassword")}
                                        </button>

                                    </div>

                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        placeholder={t("passwordPlaceholder")}
                                        autoComplete="current-password"
                                        disabled={loading}
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#4C76F2] focus:bg-white focus:ring-4 focus:ring-[#4C76F2]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0,
                                                y: -5,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            className="overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={!loading ? { y: -1 } : {}}
                                    whileTap={!loading ? { scale: 0.99 } : {}}
                                    className="h-12 w-full rounded-xl bg-[#111827] font-semibold text-white shadow-lg shadow-[#111827]/10 transition hover:bg-[#1F2937] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {t("submit")}
                                </motion.button>

                            </form>

                            {/* Register */}
                            <div className="mt-10 text-center">

                                <p className="text-sm text-gray-500">
                                    {t("noAccount")}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => router.push("/register")}
                                    disabled={loading}
                                    className="mt-2 text-sm font-semibold text-[#4C76F2] transition hover:text-[#365FD8] hover:underline disabled:opacity-50"
                                >
                                    {t("register")}
                                </button>

                            </div>

                            {/* Small brand statement */}
                            <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#F2C94C]" />
                                <span>{t("community")}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[#4C76F2]" />
                            </div>

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}