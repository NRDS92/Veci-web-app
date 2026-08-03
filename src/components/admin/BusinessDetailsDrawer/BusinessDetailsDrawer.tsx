"use client";

import { X } from "lucide-react";

import { AdminBusiness } from "@/features/admin/business/types/business";

import StatusBadge from "../StatusBadge/StatusBadge";

interface Props {
    business: AdminBusiness | null;
    open: boolean;

    onClose: () => void;

    onApprove: () => void;
    onReject: () => void;

    loading?: boolean;
}

export default function BusinessDetailsDrawer({
    business,
    open,
    onClose,
    onApprove,
    onReject,
    loading = false,
}: Props) {

    if (!open || !business) return null;

    const image =
        business.images.profile;

    const isRemote =
        image?.startsWith("http");

    return (
        <>
            {/* Overlay */}

            <div
                className="fixed inset-0 z-40 bg-black/40"
                onClick={onClose}
            />

            {/* Drawer */}

            <aside className="fixed right-0 top-0 z-50 flex h-screen w-[520px] flex-col bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Business Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review this business before moderation.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Content */}

                <div className="flex-1 overflow-y-auto">

                    <div className="p-6">

                        {isRemote ? (

                            <img
                                src={image}
                                alt={business.name}
                                className="h-64 w-full rounded-xl object-cover"
                            />

                        ) : (

                            <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100">

                                <span className="text-6xl">
                                    🏪
                                </span>

                            </div>

                        )}

                    </div>

                    <div className="space-y-6 px-6 pb-8">

                        <div>

                            <h1 className="text-3xl font-bold">
                                {business.name}
                            </h1>

                            <p className="mt-2 text-gray-600">
                                {business.description}
                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Status
                                </p>

                                <StatusBadge
                                    status={
                                        business.moderation.status
                                    }
                                />

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Category
                                </p>

                                <p className="capitalize">
                                    {business.category}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    City
                                </p>

                                <p>
                                    {business.location.cityId}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Country
                                </p>

                                <p>
                                    {business.location.country}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Phone
                                </p>

                                <p>
                                    {business.contact.phone ?? "-"}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Instagram
                                </p>

                                <p>
                                    {business.contact.instagram ?? "-"}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Origin
                                </p>

                                <p>
                                    {business.countryOfOrigin ?? "-"}
                                </p>

                            </div>

                            <div>

                                <p className="mb-2 text-sm text-gray-500">
                                    Languages
                                </p>

                                <p>
                                    {business.languages.join(", ")}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex gap-3 border-t p-6">

                    <button
                        onClick={onApprove}
                        disabled={loading}
                        className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Approving..."
                            : "Approve"}
                    </button>

                    <button
                        onClick={onReject}
                        disabled={loading}
                        className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Rejecting..."
                            : "Reject"}
                    </button>

                </div>

            </aside>

        </>
    );

}