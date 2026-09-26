"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";

import { authService } from "../../features/auth/auth.service";
import ColombiaLoader from "../../components/ui/loader/ColombiaLoader";

import {
    Empanada,
    Jaguar,
    Colibri,
    CarnavalBarranquilla,
} from '@mteherandev/colombia-icons-react';

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cityId, setCityId] = useState("cologne");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!cityId) {
            setError("Please select your city.");
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                name: name.trim(),
                email: email.trim(),
                password,
                cityId,
            });

            setSuccess(
                "Account created successfully. Check your email to verify your account."
            );

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const code = err.response?.data?.code;

                if (code === "EMAIL_ALREADY_EXISTS") {
                    setError("An account with this email already exists.");
                } else if (code === "VALIDATION_ERROR") {
                    setError(
                        err.response?.data?.message ||
                            "Please check your information."
                    );
                } else {
                    setError(
                        err.response?.data?.message ||
                            "Something went wrong. Please try again."
                    );
                }
            } else {
                setError("Something went wrong. Please try again.");
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

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
                            Build with your community
                        </p>

                        <h2 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-tight lg:text-6xl">
                            Create.
                            <br />
                            Connect.
                            <br />
                            <span className="text-[#F2C94C]">Grow.</span>
                        </h2>

                        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 lg:text-lg">
                            Create events, promote your business and discover
                            new opportunities with your community in Europe.
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
                                Join VECI
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
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
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
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
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
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="At least 8 characters"
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
                                    Confirm password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Repeat your password"
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label
                                    htmlFor="city"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    City
                                </label>

                                <select
                                    id="city"
                                    value={cityId}
                                    onChange={(e) =>
                                        setCityId(e.target.value)
                                    }
                                    disabled={loading}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <option value="cologne">
                                        Cologne
                                    </option>
                                </select>
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
                                {loading
                                    ? "Creating your account..."
                                    : "Create your account"}
                            </motion.button>
                        </form>

                        {/* Login CTA */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                Already part of VECI?{" "}
                                <button
                                    type="button"
                                    onClick={() => router.push("/login")}
                                    className="font-semibold text-gray-950 transition hover:text-[#4C76F2]"
                                >
                                    Log in →
                                </button>
                            </p>
                        </div>

                        {/* Footer */}
                        <p className="mt-10 text-center text-xs text-gray-400">
                            Made for our community.
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
                            text="Creating your Veci account"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}