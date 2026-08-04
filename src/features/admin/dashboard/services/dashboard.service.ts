import api from "@/lib/api";

import {
    DashboardAnalytics,
} from "../types/dashboard";

export const getDashboard = async (): Promise<DashboardAnalytics> => {

    const response = await api.get(
        "/admin/dashboard"
    );

    return response.data.data;

};