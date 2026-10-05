import api from "@/lib/api";
import {
    UploadImageResponse,
    UploadDocumentResponse,
} from "./upload.types";

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

    async uploadDocument(file: File) {
        const formData = new FormData();

        formData.append("document", file);

        const response =
            await api.post<UploadDocumentResponse>(
                "/upload/document",
                formData
            );

        return response.data.data;
    },
};