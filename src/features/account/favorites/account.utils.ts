
import axios from "axios";

export function getAccountErrorMessage(
    error: unknown,
    fallback: string
): string {
    if (axios.isAxiosError<{ message?: string }>(error)) {
        return error.response?.data?.message || fallback;
    }

    return fallback;
}

