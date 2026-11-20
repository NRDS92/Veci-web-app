"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import type { AuthUser } from "@/features/auth/types";
import { businessService } from "@/features/business/business.service";

interface BusinessFollowControlProps {
    businessId: string;
}

type FollowRequest =
    | { businessId: string; user: AuthUser; state: "success"; isFollowing: boolean }
    | { businessId: string; user: AuthUser; state: "error" };

interface PendingFollow {
    businessId: string;
    user: AuthUser;
}

interface FollowActionError {
    businessId: string;
    user: AuthUser;
    message: string;
}

export default function BusinessFollowControl({ businessId }: BusinessFollowControlProps) {
    const router = useRouter();
    const { user, loading: authLoading, isAuthenticated } = useAuth();
    const [request, setRequest] = useState<FollowRequest | null>(null);
    const [pendingFollow, setPendingFollow] = useState<PendingFollow | null>(null);
    const [actionError, setActionError] = useState<FollowActionError | null>(null);
    const requestSequence = useRef(0);

    const loadStatus = useCallback(async (forUser: AuthUser, sequence: number) => {
        try {
            const status = await businessService.getBusinessFollowStatus(businessId);
            if (requestSequence.current === sequence) {
                setRequest({ businessId, user: forUser, state: "success", isFollowing: status.isFollowing });
            }
        } catch {
            if (requestSequence.current === sequence) {
                setRequest({ businessId, user: forUser, state: "error" });
            }
        }
    }, [businessId]);

    useEffect(() => {
        if (authLoading || !isAuthenticated || !user) return;

        const sequence = ++requestSequence.current;
        void loadStatus(user, sequence);
        return () => {
            if (requestSequence.current === sequence) requestSequence.current += 1;
        };
    }, [authLoading, isAuthenticated, loadStatus, user]);

    const requestMatchesContext = request?.businessId === businessId && request.user === user;
    const isFollowing = !isAuthenticated
        ? false
        : requestMatchesContext && request.state === "success"
          ? request.isFollowing
          : null;
    const statusError = isAuthenticated && requestMatchesContext && request.state === "error";
    const statusLoading = authLoading || (isAuthenticated && !statusError && isFollowing === null);
    const pending = pendingFollow?.businessId === businessId
        && pendingFollow.user === user;
    const visibleActionError = actionError?.businessId === businessId && actionError.user === user
        ? actionError.message
        : null;

    const retryStatus = () => {
        if (!user) return;
        setRequest(null);
        setActionError(null);
        const sequence = ++requestSequence.current;
        void loadStatus(user, sequence);
    };

    const handleFollow = async () => {
        if (!isAuthenticated || !user) {
            router.push("/login");
            return;
        }
        if (pending || statusLoading || isFollowing === null) return;

        const sequence = ++requestSequence.current;
        setPendingFollow({ businessId, user });
        setActionError(null);
        try {
            const status = isFollowing
                ? await businessService.unfollowBusiness(businessId)
                : await businessService.followBusiness(businessId);
            if (requestSequence.current === sequence) {
                setRequest({ businessId, user, state: "success", isFollowing: status.isFollowing });
            }
        } catch {
            if (requestSequence.current === sequence) {
                setActionError({
                    businessId,
                    user,
                    message: "Couldn't update your follow status. Please try again.",
                });
            }
        } finally {
            setPendingFollow((current) =>
                current?.businessId === businessId && current.user === user ? null : current,
            );
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
            {statusError ? (
                <button
                    type="button"
                    onClick={retryStatus}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-medium text-orange-800 hover:bg-orange-100"
                >
                    Retry follow status
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
            {visibleActionError && <p role="alert" className="text-xs text-red-700">{visibleActionError}</p>}
            {statusError && <p role="alert" className="text-xs text-red-700">Couldn&apos;t load follow status. Try again.</p>}
        </div>
    );
}
