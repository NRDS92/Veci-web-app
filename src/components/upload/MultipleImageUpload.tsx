"use client";

import {
    ChangeEvent,
    ReactNode,
    useRef,
    useState,
} from "react";
import { uploadService } from "@/features/upload/upload.service";

interface MultipleImageUploadProps {
    value: string[];
    onChange: (images: string[]) => void;
    disabled?: boolean;
    maxImages?: number;

    /**
     * default:
     * Renders the complete uploader UI.
     *
     * headless:
     * Only handles file selection/upload.
     * The parent controls the UI.
     */
    variant?: "default" | "headless";

    /**
     * Custom trigger used with the headless variant.
     */
    renderTrigger?: (
        open: () => void,
        uploading: boolean
    ) => ReactNode;
}

export default function MultipleImageUpload({
    value,
    onChange,
    disabled = false,
    maxImages = 8,
    variant = "default",
    renderTrigger,
}: MultipleImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ======================================================
    // OPEN FILE PICKER
    // ======================================================

    const openFilePicker = () => {
        if (disabled || uploading) {
            return;
        }

        inputRef.current?.click();
    };

    // ======================================================
    // HANDLE FILES
    // ======================================================

    const handleFiles = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(
            event.target.files ?? []
        );

        if (!files.length) {
            return;
        }

        setError(null);

        // --------------------------------------------------
        // MAXIMUM IMAGES
        // --------------------------------------------------

        if (value.length + files.length > maxImages) {
            setError(
                `You can upload a maximum of ${maxImages} images.`
            );

            return;
        }

        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        const invalidFile = files.find(
            (file) =>
                !allowedTypes.includes(file.type) ||
                file.size > 5 * 1024 * 1024
        );

        if (invalidFile) {
            setError(
                "Images must be JPG, PNG or WebP and smaller than 5 MB."
            );

            return;
        }

        // --------------------------------------------------
        // UPLOAD
        // --------------------------------------------------

        try {
            setUploading(true);

            const uploadedImages = await Promise.all(
                files.map((file) =>
                    uploadService.uploadImage(file)
                )
            );

            onChange([
                ...value,
                ...uploadedImages,
            ]);
        } catch {
            setError(
                "Some images could not be uploaded. Please try again."
            );
        } finally {
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    // ======================================================
    // REMOVE IMAGE
    // ======================================================

    const removeImage = (index: number) => {
        setError(null);

        onChange(
            value.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            )
        );
    };

    // ======================================================
    // HIDDEN INPUT
    // ======================================================

    const fileInput = (
        <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFiles}
            disabled={disabled || uploading}
            className="hidden"
        />
    );

    // ======================================================
    // HEADLESS
    // ======================================================

    if (variant === "headless") {
        return (
            <>
                {renderTrigger?.(
                    openFilePicker,
                    uploading
                )}

                {fileInput}

                {error && (
                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </>
        );
    }

    // ======================================================
    // DEFAULT UI
    // ======================================================

    return (
        <div className="space-y-4">
            {value.length > 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {value.map((image, index) => (
                        <div
                            key={`${image}-${index}`}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                        >
                            <img
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                className="h-full w-full object-cover"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeImage(index)
                                }
                                disabled={
                                    disabled ||
                                    uploading
                                }
                                className="absolute right-2 top-2 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {value.length < maxImages && (
                <button
                    type="button"
                    onClick={openFilePicker}
                    disabled={
                        disabled ||
                        uploading
                    }
                    className="flex min-h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-[#FF7A00] hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading ? (
                        <>
                            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7A00]" />

                            <span className="text-sm font-medium text-gray-700">
                                Uploading images...
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="mb-2 text-3xl">
                                📸
                            </span>

                            <span className="text-sm font-semibold text-gray-900">
                                Add images
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                JPG, PNG or WebP · Max 5 MB each
                            </span>
                        </>
                    )}
                </button>
            )}

            {fileInput}

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}