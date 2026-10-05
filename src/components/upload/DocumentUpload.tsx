"use client";

import { ChangeEvent, useRef, useState } from "react";
import { uploadService } from "@/features/upload/upload.service";

export interface DocumentUploadValue {
    url: string;
    name: string;
}


interface DocumentUploadProps {
    value?: DocumentUploadValue;
    onChange: (document: DocumentUploadValue) => void;
    onRemove?: () => void;
    disabled?: boolean;
}

export default function DocumentUpload({
    value,
    onChange,
    onRemove,
    disabled = false,
}: DocumentUploadProps) {
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

        /*
         * Validate file type
         */
        if (
            file.type !== "application/pdf" ||
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            setError("Please select a PDF file.");
            return;
        }

        /*
         * Validate file size
         */
        const maxSize = 10 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("The PDF must be smaller than 10 MB.");
            return;
        }

        try {
            setUploading(true);

            const result =
                await uploadService.uploadDocument(file);

            onChange({
                url: result.url,
                name: file.name,
            });
        } catch {
            setError(
                "The document could not be uploaded. Please try again."
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
                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xl">
                            📄
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                                {value.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                PDF uploaded successfully
                            </p>
                        </div>
                    </div>

                    {!uploading && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            disabled={disabled}
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled || uploading}
                    className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-[#FF7A00] hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading ? (
                        <>
                            <div className="mb-3 h-7 w-7 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7A00]" />

                            <span className="text-sm font-medium text-gray-700">
                                Uploading PDF...
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="mb-2 text-3xl">
                                📄
                            </span>

                            <span className="text-sm font-semibold text-gray-900">
                                Upload PDF
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                PDF · Max 10 MB
                            </span>
                        </>
                    )}
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
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