"use client";

interface BusinessBasicInformationProps {
    name: string;
    description: string;

    isLatinoOwned: boolean;
    countryOfOrigin: string;

    tagsInput: string;
    tags: string[];

    languagesInput: string;
    languages: string[];

    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;

    onLatinoOwnedChange: (value: boolean) => void;
    onCountryOfOriginChange: (value: string) => void;

    onTagsInputChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (tag: string) => void;

    onLanguagesInputChange: (value: string) => void;
    onAddLanguage: () => void;
    onRemoveLanguage: (language: string) => void;

    loading: boolean;
}

export default function BusinessBasicInformation({
    name,
    description,
    isLatinoOwned,
    countryOfOrigin,
    tagsInput,
    tags,
    languagesInput,
    languages,
    onNameChange,
    onDescriptionChange,
    onLatinoOwnedChange,
    onCountryOfOriginChange,
    onTagsInputChange,
    onAddTag,
    onRemoveTag,
    onLanguagesInputChange,
    onAddLanguage,
    onRemoveLanguage,
    loading,
}: BusinessBasicInformationProps) {
    return (
        <section className="space-y-8">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-info text-[#FF7A00]" />

                    <h2 className="text-lg font-semibold text-gray-900">
                        Basic information
                    </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Tell the community about your business.
                </p>
            </div>

            {/* ==================================================
                BUSINESS NAME
            ================================================== */}

            <div>
                <label
                    htmlFor="business-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Business name
                </label>

                <div className="relative">
                    <i className="fa-solid fa-store pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        id="business-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            onNameChange(event.target.value)
                        }
                        placeholder="e.g. Colombian Café"
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                    />
                </div>
            </div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <div>
                <label
                    htmlFor="business-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <div className="relative">
                    <i className="fa-solid fa-align-left pointer-events-none absolute left-4 top-4 text-gray-400" />

                    <textarea
                        id="business-description"
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        rows={5}
                        placeholder="Tell the community about this business..."
                        disabled={loading}
                        className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                    />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                    Describe what you offer and what makes your business
                    special.
                </p>
            </div>

            {/* ==================================================
                COMMUNITY
            ================================================== */}

            <div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
                {/* Header */}

                <div>
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-people-group text-[#FF7A00]" />

                        <h3 className="text-sm font-semibold text-gray-900">
                            Community
                        </h3>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Help people discover businesses connected to the
                        Latino community.
                    </p>
                </div>

                {/* Latino owned */}

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300">
                    <input
                        type="checkbox"
                        checked={isLatinoOwned}
                        onChange={(event) =>
                            onLatinoOwnedChange(event.target.checked)
                        }
                        disabled={loading}
                        className="h-4 w-4 accent-[#FF7A00]"
                    />

                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-heart text-gray-400" />

                        <span className="text-sm font-medium text-gray-700">
                            Latino-owned business
                        </span>
                    </div>
                </label>

                {/* Country */}

                <div>
                    <label
                        htmlFor="country-of-origin"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Country of origin
                    </label>

                    <div className="relative">
                        <i className="fa-solid fa-earth-americas pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            id="country-of-origin"
                            type="text"
                            value={countryOfOrigin}
                            onChange={(event) =>
                                onCountryOfOriginChange(
                                    event.target.value
                                )
                            }
                            placeholder="e.g. Colombia"
                            disabled={loading}
                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>
                </div>
            </div>

            {/* ==================================================
                TAGS + LANGUAGES
            ================================================== */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* ==================================================
                    TAGS
                ================================================== */}

                <div className="min-w-0 space-y-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-tags text-[#FF7A00]" />

                            <h3 className="text-sm font-semibold text-gray-900">
                                Tags
                            </h3>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Add keywords that help people discover your
                            business.
                        </p>
                    </div>

                    {/* Input */}

                    <div className="flex gap-2">
                        <div className="relative min-w-0 flex-1">
                            <i className="fa-solid fa-hashtag pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={tagsInput}
                                onChange={(event) =>
                                    onTagsInputChange(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        onAddTag();
                                    }
                                }}
                                placeholder="e.g. Colombian"
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onAddTag}
                            disabled={loading}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <i className="fa-solid fa-plus" />
                            <span>Add</span>
                        </button>
                    </div>

                    {/* Tags */}

                    {tags.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center justify-between gap-3 rounded-xl bg-gray-100 px-3 py-2"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <i className="fa-solid fa-tag shrink-0 text-xs text-gray-400" />

                                        <span className="truncate text-sm text-gray-700">
                                            {tag}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onRemoveTag(tag)
                                        }
                                        disabled={loading}
                                        aria-label={`Remove ${tag}`}
                                        className="shrink-0 text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ==================================================
                    LANGUAGES
                ================================================== */}

                <div className="min-w-0 space-y-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-language text-[#FF7A00]" />

                            <h3 className="text-sm font-semibold text-gray-900">
                                Languages
                            </h3>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Let people know which languages your business
                            supports.
                        </p>
                    </div>

                    {/* Input */}

                    <div className="flex gap-2">
                        <div className="relative min-w-0 flex-1">
                            <i className="fa-solid fa-comment-dots pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={languagesInput}
                                onChange={(event) =>
                                    onLanguagesInputChange(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        onAddLanguage();
                                    }
                                }}
                                placeholder="e.g. Spanish"
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onAddLanguage}
                            disabled={loading}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <i className="fa-solid fa-plus" />
                            <span>Add</span>
                        </button>
                    </div>

                    {/* Languages */}

                    {languages.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {languages.map((language) => (
                                <div
                                    key={language}
                                    className="flex items-center justify-between gap-3 rounded-xl bg-gray-100 px-3 py-2"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <i className="fa-solid fa-language shrink-0 text-xs text-gray-400" />

                                        <span className="truncate text-sm text-gray-700">
                                            {language}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onRemoveLanguage(language)
                                        }
                                        disabled={loading}
                                        aria-label={`Remove ${language}`}
                                        className="shrink-0 text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}