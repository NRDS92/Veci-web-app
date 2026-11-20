"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { businessService } from "@/features/business/business.service";

interface BusinessFollowControlProps {
    businessId: string;
}

export default function BusinessFollowControl({ businessId }: BusinessFollowControlProps) {
    const router = useRouter();
    const { loading: authLoading, isAuthenticated } = useAuth();
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    const [statusLoading, setStatusLoading] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadStatus = useCallback(async () => {
        setStatusLoading(true);
        setError(null);
        try {
            const status = await businessService.getBusinessFollowStatus(businessId);
            setIsFollowing(status.isFollowing);
        } catch {
            setError("Couldn't load follow status. Try again.");
        } finally {
            setStatusLoading(false);
        }
    }, [businessId]);

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) {
            setIsFollowing(false);
            setStatusLoading(false);
            setError(null);
            return;
        }
        void loadStatus();
    }, [authLoading, isAuthenticated, loadStatus]);

    const handleFollow = async () => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        if (pending || statusLoading || isFollowing === null) return;

        setPending(true);
        setError(null);
        try {
            const status = isFollowing
                ? await businessService.unfollowBusiness(businessId)
                : await businessService.followBusiness(businessId);
            setIsFollowing(status.isFollowing);
        } catch {
            setError("Couldn't update your follow status. Please try again.");
        } finally {
            setPending(false);
        }
    };

    const disabled = authLoading || pending || statusLoading || (isAuthenticated && isFollowing === null);
    const label = authLoading
        ? "Checking sign-in…"
        : !isAuthenticated
          ? "Log in to follow"
          : pending
            ? "Saving…"
            : statusLoading
              ? "Loading…"
              : isFollowing
                ? "Unfollow"
                : "Follow business";

    return (
        <div className="flex flex-col items-start gap-1">
            {isAuthenticated && error && isFollowing === null ? (
                <button
                    type="button"
                    onClick={() => void loadStatus()}
                    disabled={statusLoading}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-medium text-orange-800 hover:bg-orange-100 disabled:opacity-60"
                >
                    {statusLoading ? "Loading…" : "Retry follow status"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => void handleFollow()}
                    disabled={disabled}
                    aria-pressed={isAuthenticated ? Boolean(isFollowing) : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-medium text-orange-800 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <i aria-hidden="true" className={`fa-solid ${isFollowing ? "fa-heart" : "fa-heart-circle-plus"}`} />
                    {label}
                </button>
            )}
            {error && !(isAuthenticated && isFollowing === null) && (
                <p role="alert" className="text-xs text-red-700">{error}</p>
            )}
            {error && isAuthenticated && isFollowing === null && (
                <p role="alert" className="text-xs text-red-700">{error}</p>
            )}
        </div>
    );
}
