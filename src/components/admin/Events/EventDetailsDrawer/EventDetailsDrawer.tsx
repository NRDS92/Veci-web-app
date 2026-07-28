"use client";

import { X } from "lucide-react";

import { AdminEvent } from "@/features/admin/types/event";
import StatusBadge from "../../StatusBadge/StatusBadge";

interface Props {
    event: AdminEvent | null;
    open: boolean;
    onClose: () => void;

    onApprove: () => void;
    onReject: () => void;

    loading?: boolean;
}

export default function EventDetailsDrawer({
    event,
    open,
    onClose,
    onApprove,
    onReject,
    loading = false,
}: Props) {
    if (!open || !event) return null;

    const image = event.images?.[0];
    const isRemote = image?.startsWith("http");

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
                Event Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                Review this event before moderation.
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

            {/* Image */}
            <div className="p-6">

                {isRemote ? (
                <img
                    src={image}
                    alt={event.title}
                    className="h-64 w-full rounded-xl object-cover"
                />
                ) : (
                <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100">
                    <span className="text-6xl">🖼️</span>
                </div>
                )}

            </div>

            {/* Information */}
            <div className="space-y-6 px-6 pb-8">

                <div>

                <h1 className="text-3xl font-bold">
                    {event.title}
                </h1>

                <p className="mt-2 text-gray-600">
                    {event.description}
                </p>

                </div>

                <div className="grid grid-cols-2 gap-6">

                <div>

                    <p className="mb-2 text-sm text-gray-500">
                    Status
                    </p>

                    <StatusBadge
                    status={event.moderation.status}
                    />

                </div>

                <div>

                    <p className="mb-2 text-sm text-gray-500">
                    Date
                    </p>

                    <p>
                    {new Date(event.dateStart).toLocaleDateString(
                        "en-GB",
                        {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        }
                    )}
                    </p>

                </div>

                <div>

                    <p className="mb-2 text-sm text-gray-500">
                    City
                    </p>

                    <p>{event.cityId}</p>

                </div>

                <div>

                    <p className="mb-2 text-sm text-gray-500">
                    Created By
                    </p>

                    <p>{event.createdBy?.name ?? "Unknown"}</p>

                </div>

                </div>

            </div>

            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t p-6">

            <button
                onClick={onApprove}
                disabled={loading}
                className="
                    flex-1
                    rounded-lg
                    bg-green-600
                    px-4
                    py-3
                    font-medium
                    text-white
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    hover:bg-green-700
                "
            >
                {loading ? "Approving..." : "Approve"}
            </button>


            <button
            onClick={onReject}
            disabled={loading}
            className="
                flex-1
                rounded-lg
                bg-red-600
                px-4
                py-3
                font-medium
                text-white
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
                hover:bg-red-700
            "
        >
            {loading ? "Rejecting..." : "Reject"}
        </button>

            </div>

        </aside>
        </>
    );
}
