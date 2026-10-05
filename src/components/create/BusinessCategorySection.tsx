"use client";

import {
    BusinessCategory,
    BusinessSubCategory,
} from "@/features/business/business.types";

interface BusinessCategorySectionProps {
    category: BusinessCategory;
    subCategory: BusinessSubCategory | "";

    categories: {
        value: BusinessCategory;
        label: string;
    }[];

    filteredSubCategories: {
        value: BusinessSubCategory;
        label: string;
        category: BusinessCategory;
    }[];

    onCategoryChange: (
        value: BusinessCategory
    ) => void;

    onSubCategoryChange: (
        value: BusinessSubCategory | ""
    ) => void;

    loading: boolean;
}

export default function BusinessCategorySection({
    category,
    subCategory,
    categories,
    filteredSubCategories,
    onCategoryChange,
    onSubCategoryChange,
    loading,
}: BusinessCategorySectionProps) {
    return (
        <section className="space-y-5">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-layer-group text-[#FF7A00]" />

                    <h2 className="text-lg font-semibold text-gray-900">
                        Category
                    </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Choose the category that best describes
                    your business.
                </p>
            </div>

            {/* ==================================================
                CATEGORY + SUBCATEGORY
            ================================================== */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* CATEGORY */}

                <div>
                    <label
                        htmlFor="business-category"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Category
                    </label>

                    <div className="relative">
                        {/* Left icon */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center">
                            <i className="fa-solid fa-shapes text-gray-400" />
                        </div>

                        <select
                            id="business-category"
                            value={category}
                            onChange={(event) =>
                                onCategoryChange(
                                    event.target
                                        .value as BusinessCategory
                                )
                            }
                            disabled={loading}
                            className="
                                w-full
                                appearance-none
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                py-3
                                pl-12
                                pr-10
                                text-gray-900
                                outline-none
                                transition
                                focus:border-[#FF7A00]
                                focus:ring-2
                                focus:ring-[#FF7A00]/10
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                                disabled:opacity-60
                            "
                        >
                            {categories.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>

                        {/* Chevron */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                            <i className="fa-solid fa-chevron-down text-xs text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* SUBCATEGORY */}

                <div>
                    <label
                        htmlFor="business-subcategory"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Subcategory
                    </label>

                    <div className="relative">
                        {/* Left icon */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center">
                            <i className="fa-solid fa-tags text-gray-400" />
                        </div>

                        <select
                            id="business-subcategory"
                            value={subCategory}
                            onChange={(event) =>
                                onSubCategoryChange(
                                    event.target.value as
                                        | BusinessSubCategory
                                        | ""
                                )
                            }
                            disabled={loading}
                            className="
                                w-full
                                appearance-none
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                py-3
                                pl-12
                                pr-10
                                text-gray-900
                                outline-none
                                transition
                                focus:border-[#FF7A00]
                                focus:ring-2
                                focus:ring-[#FF7A00]/10
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                                disabled:opacity-60
                            "
                        >
                            <option value="">
                                Select a subcategory
                            </option>

                            {filteredSubCategories.map(
                                (item) => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            )}
                        </select>

                        {/* Chevron */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                            <i className="fa-solid fa-chevron-down text-xs text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}