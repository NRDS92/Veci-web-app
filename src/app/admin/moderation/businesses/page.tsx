"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AdminBusiness } from "@/features/admin/business/types/business";

import {
    getBusinesses,
} from "@/features/admin/business/services/business.admin.service";

import Toolbar from "@/components/admin/ui/Toolbar/Toolbar";
import SearchInput from "@/components/admin/ui/SearchInput/SearchInput";
import EmptyState from "@/components/admin/ui/EmptyState/EmptyState";

export default function BusinessesPage() {

    const [businesses, setBusinesses] =
        useState<AdminBusiness[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

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

    const filteredBusinesses =
        businesses.filter((business) =>
            business.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading businesses...

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

                <pre>

                    {JSON.stringify(
                        filteredBusinesses,
                        null,
                        2
                    )}

                </pre>

            )}

        </div>

    );

}