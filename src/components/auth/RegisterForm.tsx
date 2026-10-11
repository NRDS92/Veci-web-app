"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useNotification } from "@/components/notifications/NotificationProvider";
import { authService } from "../../features/auth/auth.service";
import ColombiaLoader from "../../components/ui/loader/ColombiaLoader";
import CitySelector from "../../components/ui/citySelector/CitySelector";

import {
    Empanada,
    Jaguar,
    Colibri,
    CarnavalBarranquilla,
} from '@mteherandev/colombia-icons-react';

export default function RegisterForm() {
    const router = useRouter();
    const t = useTranslations("RegisterForm");
    const { notify } = useNotification();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cityId, setCityId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
    ) => {
    e.preventDefault();

    if (!name.trim()) {
        notify({
        type: "warning",
        title: t("validation.nameRequired.title"),
        message: t("validation.nameRequired.message"),
        });
        return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
        notify({
        type: "warning",
        title: t("validation.emailRequired.title"),
        message: t("validation.emailRequired.message"),
        });
        return;
    }

    if (password.length < 8) {
        notify({
        type: "warning",
        title: t("validation.passwordLength.title"),
        message: t("validation.passwordLength.message"),
        });
        return;
    }

    if (password !== confirmPassword) {
        notify({
        type: "warning",
        title: t("validation.passwordMismatch.title"),
        message: t("validation.passwordMismatch.message"),
        });
        return;
    }

    if (!cityId) {
        notify({
        type: "warning",
        title: t("validation.cityRequired.title"),
        message: t("validation.cityRequired.message"),
        });
        return;
    }

    try {
        setLoading(true);

        await authService.register({
        name: name.trim(),
        email: normalizedEmail,
        password,
        cityId,
        });

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        notify({
        type: "success",
        title: t("success.title"),
        message: t("success.message"),
        duration: 8000,
        });
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;

        if (code === "EMAIL_ALREADY_EXISTS") {
            notify({
            type: "error",
            title: t("errors.emailExists.title"),
            message: t("errors.emailExists.message"),
            });
        } else if (code === "VALIDATION_ERROR") {
            notify({
            type: "warning",
            title: t("errors.validation.title"),
            message: t("errors.validation.message"),
            });
        } else {
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
        <main className="min-h-screen bg-[#F8F8F6] p-3 md:p-5 mt-25">
            <div className="mx-auto grid min-h-[700px] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-sm md:grid-cols-2">
                {/* =====================================================
                    LEFT — COMMUNITY / CTA
                ====================================================== */}
                <section className="relative hidden min-h-[700px] overflow-hidden md:block">
                    <Image
                        src="/register1.webp"
                        alt="Latin American community creating opportunities in Europe"
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Dark cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
                    {/* =================================================
                        DECORATIVE COLOMBIA ELEMENTS
                    ================================================== */}

                    <motion.div
                        className="absolute left-8 top-10 text-white "
                        animate={{
                            y: [0, -8, 0],
                            rotate: [-3, 3, -3],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Empanada className="h-14 w-14 drop-shadow-lg" />
                    </motion.div>

                    <motion.div
                        className="absolute right-10 top-20 text-amber-300 "
                        animate={{
                            y: [0, 10, 0],
                            rotate: [4, -4, 4],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Jaguar className="h-16 w-16 drop-shadow-lg " />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-40 left-10 text-blue-700 "
                        animate={{
                            y: [0, -10, 0],
                            rotate: [3, -3, 3],
                        }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Colibri className="h-14 w-14 drop-shadow-lg" />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-24 right-12 text-amber-700"
                        animate={{
                            y: [0, 8, 0],
                            rotate: [-4, 4, -4],
                        }}
                        transition={{
                            duration: 6.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <CarnavalBarranquilla className="h-16 w-16 drop-shadow-lg" />
                    </motion.div>
                    {/* =================================================
                        CTA COPY
                    ================================================== */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white lg:p-12">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                            {t("eyebrow")}
                        </p>
                        <h2 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-tight lg:text-6xl">
                            {t("headline.first")}
                            <br />
                            {t("headline.second")}
                            <br />
                            <span className="text-[#F2C94C]">{t("headline.third")}</span>
                        </h2>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 lg:text-lg">
                            {t("description")}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                                🎉 Events
                            </span>

                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                                🏪 Businesses
                            </span>

                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                                🚀 Opportunities
                            </span>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    RIGHT — REGISTER FORM
                ====================================================== */}

                <section className="flex min-h-[700px] items-center justify-center px-6 py-12 md:px-10 lg:px-16">
                    <div className="w-full max-w-md">
                        {/* Mobile logo */}
                        <div className="mb-10 flex justify-center md:hidden">
                            <div className="text-3xl font-black tracking-tight">
                                VECI<span className="text-[#F2C94C]">.</span>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                {t("brand")}
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                                Create your place
                                <br />
                                in the community.
                            </h1>

                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
                                Create events, discover businesses and connect
                                with opportunities across Europe.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    {t("name")}
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t("namePlaceholder")}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    {t("email")}
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("emailPlaceholder")}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    {t("password")}
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder={t("passwordPlaceholder")}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    {t("confirmPassword")}
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder={t("confirmPasswordPlaceholder")}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <CitySelector
                                    value={cityId}
                                    onChange={setCityId}
                                    disabled={loading}
                                />
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Success */}
                            <AnimatePresence>
                                {success && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-relaxed text-green-700"
                                    >
                                        {success}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CTA */}
                            <motion.button
                                whileHover={{
                                    scale: loading ? 1 : 1.01,
                                }}
                                whileTap={{
                                    scale: loading ? 1 : 0.98,
                                }}
                                type="submit"
                                disabled={loading}
                                className="mt-2 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? t("submitting") : t("submit")}
                            </motion.button>
                        </form>

                        {/* Login CTA */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                {t("alreadyRegistered")}
                                <button
                                    type="button"
                                    onClick={() => router.push("/login")}
                                    className="font-semibold text-gray-950 transition hover:text-[#4C76F2]"
                                >
                                    {t("login")}
                                </button>
                            </p>
                        </div>

                        {/* Footer */}
                        <p className="mt-10 text-center text-xs text-gray-400">
                            {t("community")}
                        </p>
                    </div>
                </section>
            </div>

            {/* =========================================================
                LOADING
            ========================================================== */}

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        <ColombiaLoader
                            text={t("loader")}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}