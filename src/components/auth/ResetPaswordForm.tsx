"use client";
import axios from "axios";

import { useState } from "react";
import { useParams } from "next/navigation";
import { authService } from "../auth/auth.service";


export default function ResetPasswordForm() {

    const params = useParams();                 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const token = params.token as string;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

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

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("params", params);
        console.log("token", token);
        try {
            setLoading(true);

            await authService.resetPassword({
                token,
                password,
            });

            setSuccess("Password updated successfully.");

        } catch (error: unknown) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);
                setError(
                    error.response?.data?.message ??
                    "Something went wrong."
                );
            } else {
                setError("Unexpected error.");
            }

        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
            Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full border rounded-lg p-3 mb-4"
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <input
                className="w-full border rounded-lg p-3 mb-6"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            {error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-green-600 mb-4">
                    {success}
                </p>
            )}

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 disabled:opacity-50"
            >
            {loading ? "Updating..." : "Reset password"}
            </button>
        </form>

        </div>
    );
}