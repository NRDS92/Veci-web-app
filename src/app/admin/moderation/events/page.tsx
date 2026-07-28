"use client";

import { useEffect, useState } from "react";
import { AdminEvent } from "@/features/admin/types/event";
import {
    getEvents,
    approveEvent,
    rejectEvent,
} from "@/features/admin/services/admin.service";

import EventTable from "@/components/admin/EventTable/EventTable";
import SearchInput from "@/components/admin/ui/SearchInput/SearchInput";
import Toolbar from "@/components/admin/ui/Toolbar/Toolbar";
import EmptyState from "@/components/admin/ui/EmptyState/EmptyState";
import EventDetailsDrawer from "../../../../components/admin/Events/EventDetailsDrawer/EventDetailsDrawer";

export default function EventsPage() {
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("ALL");
    const [selectedEvent, setSelectedEvent] =
    useState<AdminEvent | null>(null);

    const [actionLoading, setActionLoading] =
    useState(false);

    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    const handleApprove = async () => {

        if (!selectedEvent) return;

        try {

            setActionLoading(true);

            const updated =
                await approveEvent(
                    selectedEvent._id
                );

            setEvents(events =>
                events.map(event =>
                    event._id === updated._id
                        ? updated
                        : event
                )
            );

            setSelectedEvent(updated);

        } catch (error) {

            console.error(error);

        } finally {

            setActionLoading(false);

        }

    };

    const handleReject = async () => {

        if (!selectedEvent) return;

        const reason =
            window.prompt(
                "Reason for rejection"
            );

        if (!reason) return;

        try {

            setActionLoading(true);

            const updated =
                await rejectEvent(
                    selectedEvent._id,
                    reason
                );

            setEvents(events =>
                events.map(event =>
                    event._id === updated._id
                        ? updated
                        : event
                )
                
            );

            setSelectedEvent(updated);

        } catch (error) {

            console.error(error);

        } finally {

            setActionLoading(false);

        }

    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            

            <Toolbar
                title="Event Moderation"
                subtitle="Review and manage community events"
            />

            <div className="flex items-center justify-between">

                <SearchInput
                    value={search}
                    onChange={setSearch}
                />

            </div>

            {filteredEvents.length === 0 ? (
                <EmptyState
                    title="No events found"
                    description="Try another search or change your filters."
                />
            ) : (
                <EventTable
                    events={filteredEvents}
                    onView={setSelectedEvent}
                />
            )}
            <EventDetailsDrawer
                event={selectedEvent}
                open={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onApprove={handleApprove}
                onReject={handleReject}
                loading={actionLoading}
            />

        </div>
    );
}