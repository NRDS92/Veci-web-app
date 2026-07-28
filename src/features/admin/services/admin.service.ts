import api from "@/lib/api";
import { AdminEvent } from "../types/event";

export const getEvents = async (
  status?: string
): Promise<AdminEvent[]> => {

  const response = await api.get("/admin/events", {
    params: { status },
  });

  return response.data.data;
};

export async function approveEvent(id: string) {
    const response = await api.patch(
        `/admin/events/${id}/approve`
    );

    return response.data.data;
}

export async function rejectEvent(
    id: string,
    reason: string,
    comment?: string
) {
    const response = await api.patch(
        `/admin/events/${id}/reject`,
        {
            reason,
            comment,
        }
    );

    return response.data.data;
}