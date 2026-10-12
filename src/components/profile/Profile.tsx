
"use client";
import { useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useNotification } from "@/components/notifications/NotificationProvider";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileAccount from "./ProfileAccount";
import { userService } from "@/features/users/user.service";
export default function Profile() {
  const { refreshUser } = useAuth();
  const { notify } = useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const handleChangeImage = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      notify({
        type: "error",
        title: "Invalid image",
        message: "Choose a JPG, PNG or WEBP image.",
      });
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify({
        type: "error",
        title: "Image too large",
        message: "The maximum image size is 5 MB.",
      });
      event.target.value = "";
      return;
    }
    setUploading(true);
    try {
      await userService.uploadProfileImage(file);
      await refreshUser();
      notify({
        type: "success",
        title: "Profile photo updated",
        message: "Your new profile photo is ready.",
      });
    } catch (error: unknown) {
      console.error("PROFILE IMAGE ERROR:", error);
      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }
            ).response?.data?.message
          : undefined;
      notify({
        type: "error",
        title: "Upload failed",
        message:
          responseMessage ||
          "Unable to upload your profile photo. Please try again.",
      });
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


          {/* Profile header */}
          <ProfileHeader
            uploading={uploading}
            onChangeImage={handleChangeImage}
          />

          {/* Hidden image input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={uploading}
            className="hidden"
          />

          {/* Profile content */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <ProfileForm />

            <ProfileAccount />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
