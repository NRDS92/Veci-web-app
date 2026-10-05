"use client";

import { useState } from "react";
import DocumentUpload, {
    DocumentUploadValue,
} from "../../components/upload/DocumentUpload";

export type DocumentType =
    | "menu"
    | "catalog"
    | "portfolio"
    | "brochure";

export interface BusinessDocument {
    type: DocumentType;
    url: string;
    name: string;
}

interface BusinessDetailsSectionProps {
    documents: BusinessDocument[];
    onDocumentsChange: (documents: BusinessDocument[]) => void;
    loading: boolean;
}

const DOCUMENT_TYPES: {
    value: DocumentType;
    label: string;
    icon: string;
}[] = [
    {
        value: "menu",
        label: "Menu",
        icon: "fa-solid fa-utensils",
    },
    {
        value: "catalog",
        label: "Catalog",
        icon: "fa-solid fa-book-open",
    },
    {
        value: "portfolio",
        label: "Portfolio",
        icon: "fa-solid fa-briefcase",
    },
    {
        value: "brochure",
        label: "Brochure / Flyer",
        icon: "fa-solid fa-file-lines",
    },
];

export default function BusinessDetailsSection({
    documents,
    onDocumentsChange,
    loading,
}: BusinessDetailsSectionProps) {
    const [type, setType] = useState<DocumentType>("menu");
    const [title, setTitle] = useState("");
    const [uploadedDocument, setUploadedDocument] =
        useState<DocumentUploadValue | undefined>();

    const selectedType = DOCUMENT_TYPES.find(
        (item) => item.value === type
    );

    const handleDocumentChange = (
        document: DocumentUploadValue
    ) => {
        setUploadedDocument(document);
    };

    const handleAddDocument = () => {
        if (!uploadedDocument || !title.trim()) {
            return;
        }

        const newDocument: BusinessDocument = {
            type,
            url: uploadedDocument.url,
            name: title.trim(),
        };

        onDocumentsChange([
            ...documents,
            newDocument,
        ]);

        // Reset form
        setTitle("");
        setUploadedDocument(undefined);
        setType("menu");
    };

    const handleRemoveDocument = (index: number) => {
        onDocumentsChange(
            documents.filter((_, i) => i !== index)
        );
    };

    const canAddDocument =
        Boolean(title.trim()) &&
        Boolean(uploadedDocument);

    return (
        <section className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Business Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add useful documents such as your menu,
                    catalog, portfolio or promotional material.
                </p>
            </div>

            {/* Add document */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Document type */}
                    <div>
                        <label
                            htmlFor="document-type"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Document type
                        </label>

                        <div className="relative">
                            <i
                                className={`${selectedType?.icon} pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400`}
                            />

                            <select
                                id="document-type"
                                value={type}
                                onChange={(event) =>
                                    setType(
                                        event.target
                                            .value as DocumentType
                                    )
                                }
                                disabled={loading}
                                className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {DOCUMENT_TYPES.map(
                                    (documentType) => (
                                        <option
                                            key={
                                                documentType.value
                                            }
                                            value={
                                                documentType.value
                                            }
                                        >
                                            {
                                                documentType.label
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                        </div>
                    </div>

                    {/* Document title */}
                    <div>
                        <label
                            htmlFor="document-title"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Document title
                        </label>

                        <div className="relative">
                            <i className="fa-solid fa-heading pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                id="document-title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                placeholder="e.g. Menu 2026"
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Upload */}
                <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        PDF document
                    </label>

                    <DocumentUpload
                        value={uploadedDocument}
                        onChange={handleDocumentChange}
                        onRemove={() =>
                            setUploadedDocument(undefined)
                        }
                        disabled={loading}
                    />
                </div>

                {/* Add button */}
                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={handleAddDocument}
                        disabled={
                            loading || !canAddDocument
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <i className="fa-solid fa-plus" />
                        Add document
                    </button>
                </div>
            </div>

            {/* Documents list */}
            {documents.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-folder-open text-gray-400" />

                        <h3 className="text-sm font-semibold text-gray-900">
                            Added documents
                        </h3>

                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                            {documents.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {documents.map(
                            (document, index) => {
                                const documentType =
                                    DOCUMENT_TYPES.find(
                                        (item) =>
                                            item.value ===
                                            document.type
                                    );

                                return (
                                    <div
                                        key={`${document.url}-${index}`}
                                        className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                                                <i
                                                    className={
                                                        documentType?.icon ??
                                                        "fa-solid fa-file"
                                                    }
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {
                                                        document.name
                                                    }
                                                </p>

                                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                                    <span>
                                                        {
                                                            documentType?.label
                                                        }
                                                    </span>

                                                    <span>
                                                        •
                                                    </span>

                                                    <span className="truncate">
                                                        {
                                                            document.url
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveDocument(
                                                    index
                                                )
                                            }
                                            disabled={loading}
                                            aria-label={`Remove ${document.name}`}
                                            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}