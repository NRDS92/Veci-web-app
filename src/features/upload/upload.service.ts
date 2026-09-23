import api from "@/lib/api";
import { UploadImageResponse } from "./upload.types";

export const uploadService = {
    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();

        formData.append("image", file);

        const response = await api.post<UploadImageResponse>(
            "/upload",
            formData
        );

        return response.data.data;
    },
};