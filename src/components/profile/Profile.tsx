"use client";

import {
  useRef,
  useState,
} from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileAccount from "./ProfileAccount";

import { userService } from "@/features/users/user.service";

export default function Profile() {
  const {
    refreshUser,
  } = useAuth();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "The image must be smaller than 5MB."
      );
      return;
    }

    setUploading(true);

    try {
      await userService.uploadProfileImage(file);

      await refreshUser();

      setMessage(
        "Profile image updated successfully."
      );
    } catch (error: any) {
      console.error(
        "PROFILE IMAGE ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error?.response?.data
      );

      setError(
        error?.response?.data?.message ||
          "Unable to upload the image."
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <ProtectedRoute>

      <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6">

        <div className="mx-auto max-w-5xl">

          {/* Page heading */}

          <div className="mb-8">

            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
              Account
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your personal information and VECI account.
            </p>

          </div>

          {/* Header */}

          <ProfileHeader
            uploading={uploading}
            onChangeImage={handleChangeImage}
          />

          {/* Hidden upload input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Feedback */}

          {(message || error) && (
            <div className="mt-6">

              {message && (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

            </div>
          )}

          {/* Content */}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">

            <ProfileForm
              onMessage={setMessage}
              onError={setError}
            />

            <ProfileAccount />

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}