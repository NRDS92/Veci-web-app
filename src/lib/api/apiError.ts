import axios from "axios";

export interface ApiErrorResponse {
    success: false;
    message: string;
    code: string;
}

export const getApiError = (
    error: unknown
): ApiErrorResponse => {

    if (axios.isAxiosError(error)) {

        const data = error.response?.data;

        if (
            data &&
            typeof data.message === "string" &&
            typeof data.code === "string"
        ) {
            return {
                success: false,
                message: data.message,
                code: data.code,
            };
        }
    }

    return {
        success: false,
        message: "Something went wrong. Please try again.",
        code: "UNKNOWN_ERROR",
    };
};