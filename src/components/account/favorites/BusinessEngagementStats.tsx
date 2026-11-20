"use client";

import { useEffect, useRef, useState } from "react";
import type { OwnerBusinessStats } from "@ndrs92/contracts";
import { businessService } from "@/features/business/business.service";

interface BusinessEngagementStatsProps {
    businessId: string;
}

type StatsRequest =
    | { businessId: string; state: "success"; stats: OwnerBusinessStats }
    | { businessId: string; state: "error" }
    | { businessId: string; state: "loading" };

export default function BusinessEngagementStats({ businessId }: BusinessEngagementStatsProps) {
    const [request, setRequest] = useState<StatsRequest | null>(null);
    const requestSequence = useRef(0);

    useEffect(() => {
        let active = true;
        const sequence = ++requestSequence.current;
        void businessService.getOwnerBusinessStats(businessId).then((stats) => {
            if (active && requestSequence.current === sequence) {
                setRequest({ businessId, state: "success", stats });
            }
        }).catch(() => {
            if (active && requestSequence.current === sequence) {
                setRequest({ businessId, state: "error" });
            }
        });
        return () => {
            active = false;
        };
    }, [businessId]);

    const currentRequest = request?.businessId === businessId ? request : null;
    const loading = currentRequest === null || currentRequest.state === "loading";
    const error = currentRequest?.state === "error";
    const stats = currentRequest?.state === "success" ? currentRequest.stats : null;

    const retry = () => {
        setRequest({ businessId, state: "loading" });
        const sequence = ++requestSequence.current;
        void businessService.getOwnerBusinessStats(businessId).then((stats) => {
            if (requestSequence.current === sequence) {
                setRequest({ businessId, state: "success", stats });
            }
        }).catch(() => {
            if (requestSequence.current === sequence) {
                setRequest({ businessId, state: "error" });
            }
        });
    };

    return (
        <section aria-label="Business engagement statistics" className="rounded-xl bg-gray-50 p-3">
            <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600">Engagement</h4>
                {stats && <span className="text-xs text-gray-500">Last {stats.periodDays} days</span>}
            </div>

            {loading ? (
                <p role="status" className="mt-2 text-sm text-gray-500">Loading engagement stats…</p>
            ) : error ? (
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p role="alert" className="text-sm text-red-700">Stats unavailable.</p>
                    <button type="button" onClick={retry} className="text-sm font-semibold text-orange-700 underline">
                        Retry
                    </button>
                </div>
            ) : stats ? (
                <>
                    <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                        <div><dt className="text-xs text-gray-500">Followers</dt><dd className="font-semibold text-gray-900">{stats.followersCount}</dd></div>
                        <div><dt className="text-xs text-gray-500">Events</dt><dd className="font-semibold text-gray-900">{stats.eventsCount}</dd></div>
                        <div><dt className="text-xs text-gray-500">Business views</dt><dd className="font-semibold text-gray-900">{stats.businessViews}</dd></div>
                        <div><dt className="text-xs text-gray-500">Menu download attempts</dt><dd className="font-semibold text-gray-900">{stats.menuDownloadAttempts}</dd></div>
                    </dl>
                    {stats.businessViews === 0 && stats.menuDownloadAttempts === 0 && (
                        <p className="mt-2 text-xs text-gray-500">No tracked activity in this period yet.</p>
                    )}
                </>
            ) : null}
        </section>
    );
}
