import DashboardSection from "../shared/DashboardSection";
import DashboardStat from "../shared/DashboardStat";
import DashboardList from "../shared/DashboardList";

import {
    UsersAnalytics,
} from "@/features/admin/dashboard/types/dashboard";

interface Props {

    users: UsersAnalytics;

}

export default function DashboardUsers({
    users,
}: Props) {

    return (

        <DashboardSection
            title="Users"
            subtitle="Community analytics"
        >

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <DashboardStat
                    title="Verified"
                    value={users.verified}
                />

                <DashboardStat
                    title="Not Verified"
                    value={users.notVerified}
                />

                <DashboardStat
                    title="Completed Onboarding"
                    value={users.completedOnboarding}
                />

                <DashboardStat
                    title="Pending Onboarding"
                    value={users.pendingOnboarding}
                />

            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">

                <DashboardList
                    title="Countries"
                    items={users.byCountry.map(country => ({
                        label: country.country,
                        count: country.count,
                    }))}
                />

                <DashboardList
                    title="Cities"
                    items={users.byCity.map(city => ({
                        label: city.city,
                        count: city.count,
                    }))}
                />

                <DashboardList
                    title="Providers"
                    items={users.byProvider.map(provider => ({
                        label: provider.provider,
                        count: provider.count,
                    }))}
                />

                <DashboardList
                    title="Subscriptions"
                    items={users.bySubscription.map(plan => ({
                        label: plan.plan,
                        count: plan.count,
                    }))}
                />

            </div>

        </DashboardSection>

    );

}