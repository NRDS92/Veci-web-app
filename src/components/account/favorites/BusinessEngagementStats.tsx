"use client";

import { useCallback, useEffect, useState } from "react";
import type { OwnerBusinessStats } from "@ndrs92/contracts";
import { businessService } from "@/features/business/business.service";

interface BusinessEngagementStatsProps {
    businessId: string;
}

export default function BusinessEngagementStats({ businessId }: BusinessEngagementStatsProps) {
    const [stats, setStats] = useState<OwnerBusinessStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadStats = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            setStats(await businessService.getOwnerBusinessStats(businessId));
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [businessId]);

    useEffect(() => {
        void loadStats();
    }, [loadStats]);

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
                    <button type="button" onClick={() => void loadStats()} className="text-sm font-semibold text-orange-700 underline">
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
