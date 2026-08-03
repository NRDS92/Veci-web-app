"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AdminBusiness } from "@/features/admin/business/types/business";

import {
    getBusinesses,
    approveBusiness,
    rejectBusiness,
} from "@/features/admin/business/services/business.admin.service";

import {
    ModerationRejectionReason,
} from "@/features/moderation/types/moderation";

import Toolbar from "@/components/admin/ui/Toolbar/Toolbar";
import SearchInput from "@/components/admin/ui/SearchInput/SearchInput";
import EmptyState from "@/components/admin/ui/EmptyState/EmptyState";
import RejectDialog from "@/components/admin/ui/RejectDialog/RejectDialog";

import BusinessTable from "@/components/admin/BusinessTable/BusinessTable";
import BusinessDetailsDrawer from "../../../../components/admin/BusinessDetailsDrawer/BusinessDetailsDrawer";

export default function BusinessesPage() {

    const [businesses, setBusinesses] =
        useState<AdminBusiness[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [selectedBusiness, setSelectedBusiness] =
        useState<AdminBusiness | null>(null);

    const [pendingRejectBusiness, setPendingRejectBusiness] =
        useState<AdminBusiness | null>(null);

    const [rejectOpen, setRejectOpen] =
        useState(false);

    useEffect(() => {
        loadBusinesses();
    }, []);

    const loadBusinesses = async () => {

        try {

            const data =
                await getBusinesses();

            setBusinesses(data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to load businesses."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleApprove = async () => {

        if (!selectedBusiness) return;

        try {

            setActionLoading(true);

            const updated =
                await approveBusiness(
                    selectedBusiness._id
                );

            setBusinesses((previous) =>
                previous.map((business) =>
                    business._id === updated._id
                        ? updated
                        : business
                )
            );

            setSelectedBusiness(updated);

            toast.success(
                "Business approved successfully."
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to approve business."
            );

        } finally {

            setActionLoading(false);

        }

    };

    const handleReject = () => {

        if (!selectedBusiness) return;

        setPendingRejectBusiness(
            selectedBusiness
        );

        setRejectOpen(true);

    };

    const confirmReject = async (
        reason: ModerationRejectionReason,
        comment?: string
    ) => {

        if (!pendingRejectBusiness) return;

        try {

            setActionLoading(true);

            const updated =
                await rejectBusiness(
                    pendingRejectBusiness._id,
                    reason,
                    comment
                );

            setBusinesses((previous) =>
                previous.map((business) =>
                    business._id === updated._id
                        ? updated
                        : business
                )
            );

            setSelectedBusiness(updated);

            setRejectOpen(false);

            setPendingRejectBusiness(null);

            toast.success(
                "Business rejected successfully."
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to reject business."
            );

        } finally {

            setActionLoading(false);

        }

    };

    const filteredBusinesses =
        businesses.filter((business) =>
            business.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    if (loading) {

        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">
                    Loading businesses...
                </p>
            </div>
        );

    }

    return (

        <div className="space-y-6">

            <Toolbar
                title="Business Moderation"
                subtitle="Review and manage businesses"
            />

            <SearchInput
                value={search}
                onChange={setSearch}
            />

            {filteredBusinesses.length === 0 ? (

                <EmptyState
                    title="No businesses found"
                    description="Try another search."
                />

            ) : (

                <BusinessTable
                    businesses={filteredBusinesses}
                    onView={setSelectedBusiness}
                />

            )}

            <BusinessDetailsDrawer
                business={selectedBusiness}
                open={!!selectedBusiness}
                onClose={() =>
                    setSelectedBusiness(null)
                }
                onApprove={handleApprove}
                onReject={handleReject}
                loading={actionLoading}
            />

            <RejectDialog
                open={rejectOpen}
                loading={actionLoading}
                onClose={() => {
                    setRejectOpen(false);
                    setPendingRejectBusiness(null);
                }}
                onConfirm={confirmReject}
            />

        </div>

    );

}