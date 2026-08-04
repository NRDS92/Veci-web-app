import {
    Users,
    CalendarDays,
    Building2,
    Clock3,
} from "lucide-react";

import {
    OverviewAnalytics,
} from "@/features/admin/dashboard/types/dashboard";

import OverviewCard from "./OverviewCard";

interface Props {

    overview: OverviewAnalytics;

}

export default function DashboardOverview({
    overview,
}: Props) {

    return (

        <div
            className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            <OverviewCard
                title="Users"
                value={overview.users}
                icon={<Users size={30} />}
            />

            <OverviewCard
                title="Events"
                value={overview.events}
                icon={<CalendarDays size={30} />}
            />

            <OverviewCard
                title="Businesses"
                value={overview.businesses}
                icon={<Building2 size={30} />}
            />

            <OverviewCard
                title="Pending Moderation"
                value={overview.pendingModeration}
                icon={<Clock3 size={30} />}
            />

        </div>

    );

}