"use client";

import { useState } from "react";

import {
    ModerationRejectionReason,
} from "@/features/moderation/types/moderation";

import {
    REJECTION_REASON_OPTIONS,
} from "@/features/moderation/constants/rejectionReasons";

interface Props {
    open: boolean;
    title?: string;
    loading?: boolean;
    onClose: () => void;

    onConfirm: (
        reason: ModerationRejectionReason,
        comment?: string
    ) => void;
}

export default function RejectDialog({
    open,
    title = "Reject",
    loading = false,
    onClose,
    onConfirm,
}: Props) {

    const [reason, setReason] =
        useState<ModerationRejectionReason>("SPAM");

    const [comment, setComment] =
        useState("");

    const reset = () => {
        setReason("SPAM");
        setComment("");
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/40"
                onClick={handleClose}
            />

            <div className="fixed left-1/2 top-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-bold">
                    {title}
                </h2>

                <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium">
                        Reason
                    </label>

                    <select
                        className="w-full rounded-lg border p-3"
                        value={reason}
                        onChange={(e) =>
                            setReason(
                                e.target
                                    .value as ModerationRejectionReason
                            )
                        }
                    >
                        {REJECTION_REASON_OPTIONS.map(
                            (option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>

                </div>

                <div className="mt-5">

                    <label className="mb-2 block text-sm font-medium">
                        Comment
                    </label>

                    <textarea
                        rows={4}
                        className="w-full rounded-lg border p-3"
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => {
                            onConfirm(reason, comment);
                            reset();
                        }}
                    >
                        {loading ? "Rejecting..." : "Reject"}
                    </button>

                </div>

            </div>
        </>
    );
}