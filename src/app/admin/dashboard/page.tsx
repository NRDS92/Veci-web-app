"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/admin/Dashboard/StatCard/StatCard";
import { getEvents } from "@/features/admin/services/admin.service";
import { AdminEvent } from "@/features/admin/types/event";

export default function DashboardPage() {
    const [events, setEvents] = useState<AdminEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error("Failed to load events", error);
        }
        };

        fetchEvents();
    }, []);

    const pending = events.filter(
        (e) => e.moderation.status === "PENDING"
    ).length;

    const approved = events.filter(
        (e) => e.moderation.status === "APPROVED"
    ).length;

    const rejected = events.filter(
        (e) => e.moderation.status === "REJECTED"
    ).length;

    return (
        <div className="grid grid-cols-4 gap-6">
        <StatCard title="Pending" value={pending} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Rejected" value={rejected} />
        <StatCard title="Total" value={events.length} />
        </div>
    );
}