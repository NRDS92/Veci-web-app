"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { authService } from "../../features/auth/auth.service";

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cityId, setCityId] = useState("Cologne");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedName) {
            setError("Name is required.");
            return;
        }

        if (!normalizedEmail) {
            setError("Email is required.");
            return;
        }

        if (!password) {
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

        if (!cityId) {
            setError("City is required.");
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                name: normalizedName,
                email: normalizedEmail,
                password,
                cityId,
            });

            setSuccess(
                "Your account has been created. Please check your email to verify your account."
            );

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error: unknown) {
            console.error("Register error:", error);

            if (axios.isAxiosError(error)) {
                const errorCode = error.response?.data?.code;

                switch (errorCode) {
                    case "EMAIL_ALREADY_EXISTS":
                        setError(
                            "An account with this email already exists."
                        );
                        break;

                    case "VALIDATION_ERROR":
                        setError(
                            error.response?.data?.message ??
                                "Please check your information."
                        );
                        break;

                    default:
                        setError(
                            error.response?.data?.message ??
                                "Unable to create your account."
                        );
                }
            } else {
                setError("Unexpected error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-6 pt-32 pb-20">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Create your account
                </h1>

                <p className="mt-2 mb-8 text-gray-500">
                    Join the VECI community.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* NAME */}

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
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            autoComplete="name"
                            placeholder="Your name"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />
                    </div>

                    {/* EMAIL */}

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
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />
                    </div>

                    {/* PASSWORD */}

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
                            autoComplete="new-password"
                            placeholder="At least 8 characters"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />
                    </div>

                    {/* CONFIRM PASSWORD */}

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
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />
                    </div>

                    {/* CITY */}

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
                            onChange={(event) =>
                                setCityId(event.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        >
                            <option value="Cologne">
                                Cologne
                            </option>
                            <option value="Berlin">
                                Berlin
                            </option>
                            <option value="Hamburg">
                                Hamburg
                            </option>
                            <option value="Munich">
                                Munich
                            </option>
                            <option value="Frankfurt">
                                Frankfurt
                            </option>
                        </select>
                    </div>

                    {/* ERROR */}

                    {error && (
                        <div
                            className="
                                rounded-xl
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-600
                            "
                        >
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}

                    {success && (
                        <div
                            className="
                                rounded-xl
                                bg-green-50
                                px-4
                                py-3
                                text-sm
                                text-green-700
                            "
                        >
                            {success}
                        </div>
                    )}

                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-[#FF7A00]
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:scale-[1.01]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                    </button>
                </form>

                {/* LOGIN */}

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="
                            font-semibold
                            text-gray-900
                            hover:underline
                        "
                    >
                        Log in
                    </button>
                </p>
            </div>
        </main>
    );
}