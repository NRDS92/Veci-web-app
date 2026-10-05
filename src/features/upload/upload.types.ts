export interface UploadImageResponse {
    success: boolean;
    data: string;
    message?: string;
}

export interface UploadDocumentResponse {
    success: boolean;
    data: {
        url: string;
        publicId: string;
    };
    message?: string;
}