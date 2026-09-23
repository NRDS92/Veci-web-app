"use client";

import { ChangeEvent, useRef, useState } from "react";
import { uploadService } from "@/features/upload/upload.service";

interface ImageUploadProps {
    value?: string;
    onChange: (imageUrl: string) => void;
    onRemove?: () => void;
    disabled?: boolean;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
    disabled = false,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError(null);

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a JPG, PNG, or WebP image.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("The image must be smaller than 5 MB.");
            return;
        }

        try {
            setUploading(true);

            const imageUrl = await uploadService.uploadImage(file);

            onChange(imageUrl);
        } catch {
            setError(
                "The image could not be uploaded. Please try again."
            );
        } finally {
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        setError(null);
        onRemove?.();
    };

    return (
        <div className="space-y-3">
            {value ? (
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                    <img
                        src={value}
                        alt="Uploaded preview"
                        className="h-64 w-full object-cover"
                    />

                    {!uploading && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            disabled={disabled}
                            className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Remove
                        </button>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-900">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#FF7A00]" />
                                Uploading...
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled || uploading}
                    className="flex h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-[#FF7A00] hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading ? (
                        <>
                            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7A00]" />
                            <span className="text-sm font-medium text-gray-700">
                                Uploading image...
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="mb-2 text-3xl">📷</span>

                            <span className="text-sm font-semibold text-gray-900">
                                Upload an image
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                JPG, PNG or WebP · Max 5 MB
                            </span>
                        </>
                    )}
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={disabled || uploading}
                className="hidden"
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}