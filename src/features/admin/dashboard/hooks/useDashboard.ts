import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { getDashboard } from "../services/dashboard.service";
import { DashboardAnalytics } from "../types/dashboard";

export const useDashboard = () => {

    const [dashboard, setDashboard] =
        useState<DashboardAnalytics | null>(null);

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to load dashboard."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    return {

        dashboard,

        loading,

        reload: loadDashboard,

    };

};