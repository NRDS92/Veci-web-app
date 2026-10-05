interface BusinessDocument {
    type:
        | "menu"
        | "catalog"
        | "portfolio"
        | "brochure";
    url: string;
    name?: string;
}

interface BusinessMediaProps {
    gallery?: string[];
    documents?: BusinessDocument[];
}

const documentLabels: Record<
    BusinessDocument["type"],
    string
> = {
    menu: "Menu",
    catalog: "Catalog",
    portfolio: "Portfolio",
    brochure: "Brochure",
};

export default function BusinessMedia({
    gallery = [],
    documents = [],
}: BusinessMediaProps) {
    const hasGallery = gallery.length > 0;
    const hasDocuments = documents.length > 0;

    if (!hasGallery && !hasDocuments) {
        return null;
    }

    return (
        <section
            className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                sm:p-8
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-images text-[#FF7A00]" />

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Media
                    </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Photos and documents from this business.
                </p>
            </div>

            {/* =================================================
                GALLERY
            ================================================= */}

            {hasGallery && (
                <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2">
                        <i className="fa-regular fa-image text-sm text-gray-400" />

                        <h3 className="text-base font-semibold text-gray-900">
                            Gallery
                        </h3>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            sm:grid-cols-3
                        "
                    >
                        {gallery.map(
                            (image, index) => (
                                <a
                                    key={`${image}-${index}`}
                                    href={image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        relative
                                        aspect-square
                                        overflow-hidden
                                        rounded-2xl
                                        bg-gray-100
                                    "
                                >
                                    <img
                                        src={image}
                                        alt={`Business image ${index + 1}`}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            flex
                                            items-center
                                            justify-center
                                            bg-black/0
                                            text-white
                                            transition
                                            group-hover:bg-black/30
                                        "
                                    >
                                        <i
                                            className="
                                                fa-solid
                                                fa-expand
                                                text-lg
                                                opacity-0
                                                transition
                                                group-hover:opacity-100
                                            "
                                        />
                                    </div>
                                </a>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* =================================================
                DOCUMENTS
            ================================================= */}

            {hasDocuments && (
                <div
                    className={
                        hasGallery
                            ? "mt-8"
                            : "mt-6"
                    }
                >
                    <div className="mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-paperclip text-sm text-gray-400" />

                        <h3 className="text-base font-semibold text-gray-900">
                            Documents
                        </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {documents.map(
                            (document, index) => (
                                <a
                                    key={`${document.url}-${index}`}
                                    href={document.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        transition
                                        hover:bg-gray-50
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-gray-50
                                            text-gray-500
                                        "
                                    >
                                        <i className="fa-regular fa-file" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {document.name ||
                                                documentLabels[
                                                    document.type
                                                ]}
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-400">
                                            {
                                                documentLabels[
                                                    document.type
                                                ]
                                            }
                                        </p>
                                    </div>

                                    <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400" />
                                </a>
                            )
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}