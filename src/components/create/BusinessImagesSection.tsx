"use client";

import ImageUpload from "@/components/upload/ImageUpload";
import MultipleImageUpload from "../../components/upload/MultipleImageUpload";

interface BusinessImagesSectionProps {
    profileImage: string;
    coverImage: string;
    galleryImages: string[];

    onProfileChange: (value: string) => void;
    onCoverChange: (value: string) => void;
    onGalleryChange: (value: string[]) => void;

    loading: boolean;
}

export default function BusinessImagesSection({
    profileImage,
    coverImage,
    galleryImages,
    onProfileChange,
    onCoverChange,
    onGalleryChange,
    loading,
}: BusinessImagesSectionProps) {
    const visibleGalleryImages = galleryImages.slice(0, 3);

    return (
        <section className="space-y-6">
            {/* ==================================================
                COVER + PROFILE
            ================================================== */}

            <div className="relative">
                {/* COVER */}
                <div className="relative h-64 overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gray-100">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt="Business cover"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-500">
                                    Add a cover image
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Recommended landscape image
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Cover uploader */}
                    <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100">
                        <ImageUpload
                            value={coverImage}
                            onChange={onCoverChange}
                            onRemove={() => onCoverChange("")}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* PROFILE */}
                <div className="absolute -bottom-16 left-6">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Business profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-center text-xs font-medium text-gray-400">
                                    Profile
                                    <br />
                                    image
                                </span>
                            </div>
                        )}

                        {/* Profile uploader */}
                        <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100">
                            <ImageUpload
                                value={profileImage}
                                onChange={onProfileChange}
                                onRemove={() => onProfileChange("")}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Space reserved for profile image */}
            <div className="h-12" />

            {/* ==================================================
                GALLERY
            ================================================== */}

            <div>
                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Gallery
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Show your business, products, services or community.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {/* Existing images */}
                    {visibleGalleryImages.map((image, index) => (
                        <div
                            key={`${image}-${index}`}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50"
                        >
                            <img
                                src={image}
                                alt={`Business gallery ${index + 1}`}
                                className="h-full w-full object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    onGalleryChange(
                                        galleryImages.filter(
                                            (_, imageIndex) =>
                                                imageIndex !== index
                                        )
                                    );
                                }}
                                disabled={loading}
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Add photo */}
                    {galleryImages.length < 8 && (
                        <MultipleImageUpload
                            value={galleryImages}
                            onChange={onGalleryChange}
                            disabled={loading}
                            maxImages={8}
                            variant="headless"
                            renderTrigger={(open, uploading) => (
                                <button
                                    type="button"
                                    onClick={open}
                                    disabled={loading || uploading}
                                    className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 transition hover:border-[#FF7A00] hover:bg-orange-50 hover:text-[#FF7A00] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#FF7A00]" />

                                            <span className="mt-2 text-xs font-medium">
                                                Uploading...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-light leading-none">
                                                +
                                            </span>

                                            <span className="mt-2 text-xs font-medium">
                                                Add photo
                                            </span>
                                        </>
                                    )}
                                </button>
                            )}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}