"use client";

import { useDashboard } from "@/features/admin/dashboard/hooks/useDashboard";

import DashboardOverview from "./DashboardOverview/DashboardOverview";
import DashboardUsers from "./DashboardUsers/DashboardUsers";

import DashboardLoading from "./shared/DashboardLoading";
import DashboardEmpty from "./shared/DashboardEmpty";

export default function Dashboard() {

    const {
        dashboard,
        loading,
    } = useDashboard();

    if (loading) {

        return <DashboardLoading />;

    }
    if (!dashboard) {

        return (

            <DashboardEmpty
                message="Unable to load dashboard."
            />

        );

    }

    return (

        <div className="space-y-8">

            <DashboardOverview
                overview={dashboard.overview}
            />

            <DashboardUsers
                users={dashboard.users}
            />

        </div>

    );
}