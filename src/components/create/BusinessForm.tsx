
"use client";

import { FormEvent, useState } from "react";

import ImageUpload from "@/components/upload/ImageUpload";
import LocationSelector from "@/components/location/LocationSelector";

import { businessService } from "@/features/business/business.service";
import {
    BusinessCategory,
    BusinessPriceRange,
    BusinessSubCategory,
    CreateBusinessRequest,
} from "@/features/business/business.types";

import { LocationData } from "@/features/location/location.types";

const categories: {
    value: BusinessCategory;
    label: string;
}[] = [
    { value: "food", label: "Food" },
    { value: "entertainment", label: "Entertainment" },
    { value: "services", label: "Services" },
    { value: "shopping", label: "Shopping" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
];

const subCategories: {
    value: BusinessSubCategory;
    label: string;
    category: BusinessCategory;
}[] = [
    {
        value: "restaurant",
        label: "Restaurant",
        category: "food",
    },
    {
        value: "cafe",
        label: "Café",
        category: "food",
    },
    {
        value: "bar",
        label: "Bar",
        category: "food",
    },
    {
        value: "bakery",
        label: "Bakery",
        category: "food",
    },
    {
        value: "club",
        label: "Club",
        category: "entertainment",
    },
    {
        value: "event_venue",
        label: "Event Venue",
        category: "entertainment",
    },
    {
        value: "cultural_center",
        label: "Cultural Center",
        category: "entertainment",
    },
    {
        value: "beauty_salon",
        label: "Beauty Salon",
        category: "services",
    },
    {
        value: "barbershop",
        label: "Barbershop",
        category: "services",
    },
    {
        value: "repair",
        label: "Repair",
        category: "services",
    },
    {
        value: "agency",
        label: "Agency",
        category: "services",
    },
    {
        value: "latin_store",
        label: "Latin Store",
        category: "shopping",
    },
    {
        value: "supermarket",
        label: "Supermarket",
        category: "shopping",
    },
    {
        value: "clothing",
        label: "Clothing",
        category: "shopping",
    },
    {
        value: "language_school",
        label: "Language School",
        category: "education",
    },
    {
        value: "academy",
        label: "Academy",
        category: "education",
    },
    {
        value: "clinic",
        label: "Clinic",
        category: "health",
    },
    {
        value: "gym",
        label: "Gym",
        category: "health",
    },
];

const priceRanges: BusinessPriceRange[] = [
    "$",
    "$$",
    "$$$",
];

export default function BusinessForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [category, setCategory] =
        useState<BusinessCategory>("food");

    const [subCategory, setSubCategory] =
        useState<BusinessSubCategory | "">("");

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const [location, setLocation] =
        useState<LocationData | null>(null);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [menu, setMenu] = useState("");

    const [priceRange, setPriceRange] =
        useState<BusinessPriceRange | "">("");

    const [tagsInput, setTagsInput] =
        useState("");

    const [tags, setTags] =
        useState<string[]>([]);

    const [languagesInput, setLanguagesInput] =
        useState("");

    const [languages, setLanguages] =
        useState<string[]>([]);

    const [isLatinoOwned, setIsLatinoOwned] =
        useState(true);

    const [countryOfOrigin, setCountryOfOrigin] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const filteredSubCategories =
        subCategories.filter(
            (item) =>
                item.category === category
        );

    const addTag = () => {
        const value = tagsInput.trim();

        if (!value || tags.includes(value)) {
            return;
        }

        setTags((current) => [
            ...current,
            value,
        ]);

        setTagsInput("");
    };

    const removeTag = (tag: string) => {
        setTags((current) =>
            current.filter(
                (item) => item !== tag
            )
        );
    };

    const addLanguage = () => {
        const value =
            languagesInput.trim();

        if (
            !value ||
            languages.includes(value)
        ) {
            return;
        }

        setLanguages((current) => [
            ...current,
            value,
        ]);

        setLanguagesInput("");
    };

    const removeLanguage = (
        language: string
    ) => {
        setLanguages((current) =>
            current.filter(
                (item) => item !== language
            )
        );
    };

    const handleCategoryChange = (
        value: BusinessCategory
    ) => {
        setCategory(value);
        setSubCategory("");
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError(null);

        if (!name.trim()) {
            setError(
                "Please enter the business name."
            );
            return;
        }

        if (!profileImage) {
            setError(
                "Please upload a profile image."
            );
            return;
        }

        if (!location) {
            setError(
                "Please select a business location."
            );
            return;
        }

        try {
            setLoading(true);

            const payload: CreateBusinessRequest = {
                name: name.trim(),

                description:
                    description.trim() ||
                    undefined,

                category,

                subCategory:
                    subCategory || undefined,

                images: {
                    profile: profileImage,
                    cover:
                        coverImage ||
                        undefined,
                },

                location: {
                    address:
                        location.formattedAddress,

                    cityId:
                        location.city,

                    country:
                        location.country,

                    latitude:
                        location.latitude,

                    longitude:
                        location.longitude,
                },

                contact: {
                    email:
                        email.trim() ||
                        undefined,

                    phone:
                        phone.trim() ||
                        undefined,

                    website:
                        website.trim() ||
                        undefined,

                    instagram:
                        instagram.trim() ||
                        undefined,

                    whatsapp:
                        whatsapp.trim() ||
                        undefined,
                },

                menu:
                    menu.trim() ||
                    undefined,

                priceRange:
                    priceRange ||
                    undefined,

                tags,

                languages,

                isLatinoOwned,

                countryOfOrigin:
                    countryOfOrigin.trim() ||
                    undefined,
            };

            await businessService.createBusiness(
                payload
            );

            window.location.href = "/";

        } catch (err) {
            console.error(err);

            setError(
                "The business could not be created. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-10"
        >
            {/* IMAGES */}

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Business images
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add a profile image and an optional
                        cover image.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Profile image
                    </label>

                    <ImageUpload
                        value={profileImage}
                        onChange={setProfileImage}
                        onRemove={() =>
                            setProfileImage("")
                        }
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Cover image
                    </label>

                    <ImageUpload
                        value={coverImage}
                        onChange={setCoverImage}
                        onRemove={() =>
                            setCoverImage("")
                        }
                        disabled={loading}
                    />
                </div>
            </section>

            {/* BASIC INFORMATION */}

            <section className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Basic information
                </h2>

                <div>
                    <label
                        htmlFor="business-name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Business name
                    </label>

                    <input
                        id="business-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        placeholder="e.g. Colombian Café"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label
                        htmlFor="business-description"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="business-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(
                                event.target.value
                            )
                        }
                        rows={5}
                        placeholder="Tell the community about this business..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>
            </section>

            {/* CATEGORY */}

            <section className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Category
                </h2>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(event) =>
                            handleCategoryChange(
                                event.target
                                    .value as BusinessCategory
                            )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    >
                        {categories.map(
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
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Subcategory
                    </label>

                    <select
                        value={subCategory}
                        onChange={(event) =>
                            setSubCategory(
                                event.target
                                    .value as
                                    | BusinessSubCategory
                                    | ""
                            )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
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
                </div>
            </section>

            {/* LOCATION */}

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Location
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Search and select the location of the business.
                    </p>
                </div>

                <LocationSelector
                    value={location}
                    onChange={setLocation}
                    disabled={loading}
                />

                {location && (
                    <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        <p>
                            <span className="font-medium">
                                City:
                            </span>{" "}
                            {location.city}
                        </p>

                        <p>
                            <span className="font-medium">
                                Country:
                            </span>{" "}
                            {location.country}
                        </p>

                        {location.state && (
                            <p>
                                <span className="font-medium">
                                    State:
                                </span>{" "}
                                {location.state}
                            </p>
                        )}

                        <p>
                            <span className="font-medium">
                                Address:
                            </span>{" "}
                            {location.formattedAddress}
                        </p>
                    </div>
                )}
            </section>

            {/* CONTACT */}

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Contact
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        All contact information is optional.
                    </p>
                </div>

                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                        setPhone(
                            event.target.value
                        )
                    }
                    placeholder="Phone"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="url"
                    value={website}
                    onChange={(event) =>
                        setWebsite(
                            event.target.value
                        )
                    }
                    placeholder="Website"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={instagram}
                    onChange={(event) =>
                        setInstagram(
                            event.target.value
                        )
                    }
                    placeholder="Instagram"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={whatsapp}
                    onChange={(event) =>
                        setWhatsapp(
                            event.target.value
                        )
                    }
                    placeholder="WhatsApp"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />
            </section>

            {/* BUSINESS DETAILS */}

            <section className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Business details
                </h2>

                <input
                    type="url"
                    value={menu}
                    onChange={(event) =>
                        setMenu(
                            event.target.value
                        )
                    }
                    placeholder="Menu URL"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Price range
                    </label>

                    <select
                        value={priceRange}
                        onChange={(event) =>
                            setPriceRange(
                                event.target
                                    .value as
                                    | BusinessPriceRange
                                    | ""
                            )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    >
                        <option value="">
                            Select price range
                        </option>

                        {priceRanges.map(
                            (price) => (
                                <option
                                    key={price}
                                    value={price}
                                >
                                    {price}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Country of origin
                    </label>

                    <input
                        type="text"
                        value={countryOfOrigin}
                        onChange={(event) =>
                            setCountryOfOrigin(
                                event.target.value
                            )
                        }
                        placeholder="e.g. Colombia"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    />
                </div>

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isLatinoOwned}
                        onChange={(event) =>
                            setIsLatinoOwned(
                                event.target.checked
                            )
                        }
                        disabled={loading}
                        className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700">
                        Latino-owned business
                    </span>
                </label>
            </section>

            {/* TAGS */}

            <section className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Tags
                </h2>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(event) =>
                            setTagsInput(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
                                event.preventDefault();
                                addTag();
                            }
                        }}
                        placeholder="e.g. Colombian"
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    />

                    <button
                        type="button"
                        onClick={addTag}
                        disabled={loading}
                        className="rounded-xl border border-gray-300 px-4 py-3 font-medium"
                    >
                        Add
                    </button>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                    removeTag(
                                        tag
                                    )
                                }
                                className="rounded-full bg-gray-100 px-3 py-2 text-sm"
                            >
                                {tag} ×
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* LANGUAGES */}

            <section className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Languages
                </h2>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={languagesInput}
                        onChange={(event) =>
                            setLanguagesInput(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
                                event.preventDefault();
                                addLanguage();
                            }
                        }}
                        placeholder="e.g. Spanish"
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    />

                    <button
                        type="button"
                        onClick={addLanguage}
                        disabled={loading}
                        className="rounded-xl border border-gray-300 px-4 py-3 font-medium"
                    >
                        Add
                    </button>
                </div>

                {languages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {languages.map(
                            (language) => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() =>
                                        removeLanguage(
                                            language
                                        )
                                    }
                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm"
                                >
                                    {language} ×
                                </button>
                            )
                        )}
                    </div>
                )}
            </section>

            {/* ERROR */}

            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* SUBMIT */}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#FF7A00] px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Creating business..."
                    : "Create Business"}
            </button>
        </form>
    );
}

