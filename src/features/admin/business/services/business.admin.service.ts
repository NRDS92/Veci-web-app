import api from "@/lib/api";

import { AdminBusiness } from "../types/business";

export const getBusinesses = async (
    status?: string
): Promise<AdminBusiness[]> => {

    const response = await api.get(
        "/admin/businesses",
        {
            params: {
                status,
            },
        }
    );

    return response.data.data;
};

export const approveBusiness = async (
    id: string
): Promise<AdminBusiness> => {

    const response = await api.patch(
        `/admin/businesses/${id}/approve`
    );

    return response.data.data;
};

export const rejectBusiness = async (
    id: string,
    reason: string,
    comment?: string
): Promise<AdminBusiness> => {

    const response = await api.patch(
        `/admin/businesses/${id}/reject`,
        {
            reason,
            comment,
        }
    );

    return response.data.data;
};