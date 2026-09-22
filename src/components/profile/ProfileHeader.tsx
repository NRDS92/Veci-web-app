"use client";

import {
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";

interface ProfileHeaderProps {
  uploading: boolean;
  onChangeImage: () => void;
}

export default function ProfileHeader({
  uploading,
  onChangeImage,
}: ProfileHeaderProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400" />

      <div className="px-6 pb-6 sm:px-8">

        <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="flex items-end gap-4">

            <div className="relative">

              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={38}
                    className="text-gray-400"
                  />
                )}

              </div>

              <button
                type="button"
                onClick={onChangeImage}
                disabled={uploading}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-md transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Change profile image"
              >
                {uploading ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Camera size={16} />
                )}
              </button>

            </div>

            <div className="pb-1">

              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h2>

              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <Mail size={15} />
                <span>{user.email}</span>
              </div>

            </div>

          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">

            <CheckCircle2 size={16} />

            {user.isVerified
              ? "Verified account"
              : "Email not verified"}

          </div>

        </div>
      </div>
    </section>
  );
}