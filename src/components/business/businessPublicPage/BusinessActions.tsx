"use client";

import { useEffect, useRef, useState } from "react";
import BusinessFollowControl from "./BusinessFollowControl";
import { businessService } from "@/features/business/business.service";

interface BusinessDocument {
    type:
        | "menu"
        | "catalog"
        | "portfolio"
        | "brochure";
    url: string;
    name?: string;
}

interface BusinessActionsProps {
    businessId?: string;
    email?: string;
    phone?: string;
    website?: string;
    instagram?: string;
    whatsapp?: string;

    documents?: BusinessDocument[];

    likesCount?: number;

    onLike?: () => void;
}

const actionClassName =
    "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50";

export default function BusinessActions({
    businessId,
    email,
    phone,
    website,
    instagram,
    whatsapp,
    documents = [],
    likesCount = 0,
    onLike,
}: BusinessActionsProps) {
    const [copied, setCopied] = useState(false);

    const [liked, setLiked] = useState(false);

    const [localLikes, setLocalLikes] =
        useState(likesCount);
    const trackedBusinessId = useRef<string | null>(null);

    useEffect(() => {
        if (!businessId || trackedBusinessId.current === businessId) return;
        trackedBusinessId.current = businessId;
        void businessService.trackBusinessBehavior(businessId, { event: "business_view" }).catch(() => {
            // Tracking is best-effort and must not interfere with the public page.
        });
    }, [businessId]);

    const trackMenuAttempt = (documentUrl: string) => {
        if (!businessId) return;
        void businessService.trackBusinessBehavior(businessId, {
            event: "menu_download",
            documentUrl,
        }).catch(() => {
            // The direct document link remains usable if analytics is unavailable.
        });
    };

    const trimmedEmail = email?.trim();
    const emailHref = trimmedEmail && !/[\r\n]/.test(trimmedEmail)
        ? `mailto:${encodeURIComponent(trimmedEmail).replace(/%40/gi, "@")}`
        : undefined;
    const trimmedPhone = phone?.trim();
    const safePhone = trimmedPhone?.replace(/[^\d+*#,;]/g, "");
    const phoneHref = safePhone && /\d/.test(safePhone)
        ? `tel:${safePhone}`
        : undefined;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.href
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy business link:",
                error
            );
        }
    };

    const handleShare = async () => {
        const shareData: ShareData = {
            title: document.title,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }

            await handleCopyLink();
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            console.error(
                "Failed to share business:",
                error
            );
        }
    };

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLocalLikes((current) =>
                Math.max(0, current - 1)
            );
        } else {
            setLiked(true);
            setLocalLikes(
                (current) => current + 1
            );
        }

        onLike?.();
    };

    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {businessId && <BusinessFollowControl businessId={businessId} />}
            {/* =================================================
                SHARE
            ================================================= */}

            <button
                type="button"
                onClick={handleShare}
                className={actionClassName}
            >
                <i className="fa-solid fa-share-nodes text-sm" />

                <span>Share</span>
            </button>

            {/* =================================================
                COPY LINK
            ================================================= */}

            <button
                type="button"
                onClick={handleCopyLink}
                className={actionClassName}
            >
                <i
                    className={
                        copied
                            ? "fa-solid fa-check text-sm"
                            : "fa-regular fa-copy text-sm"
                    }
                />

                <span>
                    {copied
                        ? "Copied"
                        : "Copy link"}
                </span>
            </button>

            {/* =================================================
                WEBSITE
            ================================================= */}

            {website && (
                <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionClassName}
                >
                    <i className="fa-solid fa-arrow-up-right-from-square text-sm" />

                    <span>Website</span>
                </a>
            )}

            {/* =================================================
                INSTAGRAM
            ================================================= */}

            {instagram && (
                <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionClassName}
                >
                    <i className="fa-brands fa-instagram text-sm" />

                    <span>Instagram</span>
                </a>
            )}

            {/* =================================================
                WHATSAPP
            ================================================= */}

            {whatsapp && (
                <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionClassName}
                >
                    <i className="fa-brands fa-whatsapp text-sm" />

                    <span>WhatsApp</span>
                </a>
            )}

            {emailHref && trimmedEmail && (
                <a href={emailHref} aria-label={`Email ${trimmedEmail}`} className={actionClassName}>
                    <i aria-hidden="true" className="fa-regular fa-envelope text-sm" />
                    <span>{trimmedEmail}</span>
                </a>
            )}

            {phoneHref && trimmedPhone && (
                <a href={phoneHref} aria-label={`Call ${trimmedPhone}`} className={actionClassName}>
                    <i aria-hidden="true" className="fa-solid fa-phone text-sm" />
                    <span>{trimmedPhone}</span>
                </a>
            )}

            {/* =================================================
                ATTACHMENTS
            ================================================= */}

            {documents.length > 0 && (
                <div className="relative">
                    <details>
                        <summary
                            className={`${actionClassName} cursor-pointer list-none`}
                        >
                            <i className="fa-solid fa-paperclip text-sm" />

                            <span>
                                Attachments
                            </span>

                            <span className="text-xs text-gray-400">
                                ({documents.length})
                            </span>
                        </summary>

                        <div
                            className="
                                absolute
                                left-0
                                top-full
                                z-20
                                mt-2
                                min-w-64
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-2
                                shadow-lg
                            "
                        >
                            {documents.map(
                                (document, index) => (
                                    <a
                                        key={`${document.url}-${index}`}
                                        href={document.url}
                                        onClick={document.type === "menu" ? () => trackMenuAttempt(document.url) : undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-sm
                                            text-gray-700
                                            transition
                                            hover:bg-gray-50
                                        "
                                    >
                                        <i className="fa-regular fa-file text-gray-400" />

                                        <span className="min-w-0 flex-1 truncate">
                                            {document.name ||
                                                document.type}
                                        </span>

                                        <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400" />
                                    </a>
                                )
                            )}
                        </div>
                    </details>
                </div>
            )}

            {/* =================================================
                LIKE
            ================================================= */}

            <button
                type="button"
                onClick={handleLike}
                className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                        liked
                            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    }
                `}
                aria-pressed={liked}
            >
                <i
                    className={
                        liked
                            ? "fa-solid fa-heart text-sm"
                            : "fa-regular fa-heart text-sm"
                    }
                />

                <span>
                    {localLikes}
                </span>

                <span>
                    {liked ? "Liked" : "Like"}
                </span>
            </button>
        </div>
    );
}
