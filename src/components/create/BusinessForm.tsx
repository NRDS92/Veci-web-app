"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/notifications/NotificationProvider";
import { getApiError } from "@/lib/api/apiError";
import LocationSelector from "@/components/location/LocationSelector";
import { businessService } from "@/features/business/business.service";
import {
    BusinessCategory,
    BusinessSubCategory,
    BusinessPricingType,
    CreateBusinessRequest,
    BusinessOpeningHours,
} from "@/features/business/business.types";
import { LocationData } from "@/features/location/location.types";
import DocumentUpload, {
    type DocumentUploadValue,
} from "../../components/upload/DocumentUpload";
import BusinessImagesSection from "./BusinessImagesSection";
import BusinessBasicInformation from "./BusinessBasicInformation";
import BusinessCategorySection from "./BusinessCategorySection";
import BusinessPricingSection from "./BusinessPricingSection";
import BusinessContactSection from "./BusinessContactSection";
import BusinessDetailsSection, {
    BusinessDocument,
} from "./BusinessDetailsSection";
import BusinessOpengHours from "./BusinessOpenHours";
// ======================================================
// CATEGORIES
// ======================================================
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
// ======================================================
// SUBCATEGORIES
// ======================================================
const subCategories: {
    value: BusinessSubCategory;
    label: string;
    category: BusinessCategory;
}[] = [
    // FOOD
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
        value: "catering",
        label: "Catering",
        category: "food",
    },
    // ENTERTAINMENT
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
        value: "event_organizer",
        label: "Event Organizer",
        category: "entertainment",
    },
    {
        value: "cultural_center",
        label: "Cultural Center",
        category: "entertainment",
    },
    {
        value: "dance_school",
        label: "Dance School",
        category: "entertainment",
    },

    // SERVICES
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
        value: "translator",
        label: "Translator",
        category: "services",
    },
    {
        value: "photographer",
        label: "Photographer",
        category: "services",
    },
    {
        value: "freelancer",
        label: "Freelancer",
        category: "services",
    },

    // SHOPPING
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
        value: "product_seller",
        label: "Product Seller",
        category: "shopping",
    },

    // EDUCATION
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
        value: "private_teacher",
        label: "Private Teacher",
        category: "education",
    },

    // HEALTH
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


export default function BusinessForm() {
    
    const router = useRouter();
    const { notify } = useNotification();
    // ==================================================
    // IDENTITY
    // ==================================================
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // ==================================================
    // CLASSIFICATION
    // ==================================================
    const [category, setCategory] =
        useState<BusinessCategory>("food");
    const [subCategory, setSubCategory] =
        useState<BusinessSubCategory | "">("");
    // ==================================================
    // IMAGES
    // ==================================================
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [galleryImages, setGalleryImages] =
        useState<string[]>([]);
    // ==================================================
    // LOCATION
    // ==================================================
    const [location, setLocation] =
        useState<LocationData | null>(null);
    // ==================================================
    // CONTACT
    // ==================================================
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    // ==================================================
    // DOCUMENTS
    // ==================================================
    const [documents, setDocuments] = useState<BusinessDocument[]>([]);
    // ==================================================
    // PRICING
    // ==================================================
    const [pricingType, setPricingType] =
        useState<BusinessPricingType>("starting_at");
    const [priceAmount, setPriceAmount] =
        useState("");
    const [priceMinAmount, setPriceMinAmount] =
        useState("");
    const [priceMaxAmount, setPriceMaxAmount] =
        useState("");
    const [priceDescription, setPriceDescription] =
        useState("");
    // ==================================================
    // SCHEDULE
    // ==================================================
    const [openingHours, setOpeningHours] =
    useState<BusinessOpeningHours>({
        monday: {
            isOpen: false,
            intervals: [],
        },
        tuesday: {
            isOpen: false,
            intervals: [],
        },
        wednesday: {
            isOpen: false,
            intervals: [],
        },
        thursday: {
            isOpen: false,
            intervals: [],
        },
        friday: {
            isOpen: false,
            intervals: [],
        },
        saturday: {
            isOpen: false,
            intervals: [],
        },
        sunday: {
            isOpen: false,
            intervals: [],
        },
    });
    // ==================================================
    // COMMUNITY
    // ==================================================
    const [isLatinoOwned, setIsLatinoOwned] =
        useState(true);
    const [countryOfOrigin, setCountryOfOrigin] =
        useState("");
    // ==================================================
    // TAGS
    // ==================================================
    const [tagsInput, setTagsInput] =
        useState("");
    const [tags, setTags] =
        useState<string[]>([]);
    // ==================================================
    // LANGUAGES
    // ==================================================
    const [languagesInput, setLanguagesInput] =
        useState("");
    const [languages, setLanguages] =
        useState<string[]>([]);
    // =================================================
    // UI
    // ==================================================
    const [loading, setLoading] =
        useState(false);
    const [error, setError] =
        useState<string | null>(null);
    // =================================================
    // FILTER SUBCATEGORIES
    // ==================================================
    const filteredSubCategories =
        subCategories.filter(
            (item) =>
                item.category === category
        );
    // ==================================================
    // TAGS
    // ==================================================
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
    // ==================================================
    // LANGUAGES
    // ==================================================
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
    // ==================================================
    // CATEGORY
    // ==================================================
    const handleCategoryChange = (
        value: BusinessCategory
    ) => {
        setCategory(value);
        setSubCategory("");
    };
    // ==================================================
    // PRICING
    // ==================================================
    const buildPricing = () => {
        const description =
            priceDescription.trim() || undefined;

        if (pricingType === "range") {
            if (
                !priceMinAmount &&
                !priceMaxAmount &&
                !description
            ) {
                return undefined;
            }

            return {
                type: pricingType,
                currency: "EUR" as const,
                minAmount: priceMinAmount
                    ? Number(priceMinAmount)
                    : undefined,
                maxAmount: priceMaxAmount
                    ? Number(priceMaxAmount)
                    : undefined,
                description,
            };
        }

        if (!priceAmount && !description) {
            return undefined;
        }

        return {
            type: pricingType,
            currency: "EUR" as const,
            amount: priceAmount
                ? Number(priceAmount)
                : undefined,
            description,
        };
    };
    // ==================================================
    // SUBMIT
    // ==================================================
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError(null);
        // ------------------------------------------------
        // Basic validation
        // ------------------------------------------------
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
            // ==================================================
            // NEW BUSINESS API CONTRACT
            // ==================================================
            const payload: CreateBusinessRequest = {
                // ------------------------------------------------
                // Identity
                // ------------------------------------------------
                name: name.trim(),
                description:
                    description.trim() ||
                    undefined,
                // ------------------------------------------------
                // Classification
                // ------------------------------------------------
                providerType: "business",
                category,
                subCategory:
                    subCategory ||
                    undefined,
                // ------------------------------------------------
                // Profile
                // ------------------------------------------------
                profile: {
                    languages,
                    services: [],
                    specialties: [],
                    serviceArea: [],
                    openingHours,
                },
                // ------------------------------------------------
                // Images
                // ------------------------------------------------
                images: {
                    profile: profileImage,
                    cover:
                        coverImage ||
                        undefined,
                    gallery: galleryImages,
                },
                // ------------------------------------------------
                // Documents
                // ------------------------------------------------
                documents: documents.map((document) => ({
                    type: document.type,
                    url: document.url,
                    name: document.name,
                })),
                // -----------------------------------------------
                // Location
                // ------------------------------------------------
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
                // ------------------------------------------------
                // Contact
                // ------------------------------------------------
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
                // ------------------------------------------------
                // Community
                // ------------------------------------------------
                community: {
                    isLatinoOwned,
                    countryOfOrigin:
                        countryOfOrigin.trim() ||
                        undefined,
                },
                // ------------------------------------------------
                // Discovery
                // ------------------------------------------------
                tags,
            };
            // ==================================================
            // CREATE
            // ==================================================
            const response =
                await businessService.createBusiness(
                    payload
                );
            // ==================================================
            // DEBUG
            // ==================================================
            notify({
                type: "success",
                title: "Business created",
                message: "Your business has been created successfully.",
            });
            console.log(
                "✅ BUSINESS CREATED:",
                response
            );
            // ==================================================
            // REDIRECT
            // ==================================================
            router.push("/");
        } catch (err) {

            console.error(
                "❌ BUSINESS CREATION ERROR:",
                err
            );

            const apiError = getApiError(err);

            if (apiError.code === "BUSINESS_LIMIT_REACHED") {

                notify({
                    type: "warning",
                    title: "Business limit reached",
                    message:
                        "Your current plan does not allow you to create another business.",
                });

                return;
            }

            setError(apiError.message);
        } finally {
                    setLoading(false);
                }
            };
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-10"
        >
            {/* ==================================================
                IMAGES
            ================================================== */}
                <BusinessImagesSection
                    profileImage={profileImage}
                    coverImage={coverImage}
                    galleryImages={galleryImages}
                    onProfileChange={setProfileImage}
                    onCoverChange={setCoverImage}
                    onGalleryChange={setGalleryImages}
                    loading={loading}
                />
            {/* ==================================================
                BASIC INFORMATION
            ================================================== */}
            <BusinessBasicInformation
                name={name}
                description={description}
                isLatinoOwned={isLatinoOwned}
                countryOfOrigin={countryOfOrigin}
                tagsInput={tagsInput}
                tags={tags}
                languagesInput={languagesInput}
                languages={languages}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onLatinoOwnedChange={setIsLatinoOwned}
                onCountryOfOriginChange={setCountryOfOrigin}
                onTagsInputChange={setTagsInput}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onLanguagesInputChange={setLanguagesInput}
                onAddLanguage={addLanguage}
                onRemoveLanguage={removeLanguage}
                loading={loading}
            />
            {/* ==================================================
                CATEGORY
            ================================================== */}
            <BusinessCategorySection
                category={category}
                subCategory={subCategory}
                categories={categories}
                filteredSubCategories={filteredSubCategories}
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={setSubCategory}
                loading={loading}
            />
            {/* ==================================================
                OPENING HOURS
            ================================================== */}

            <BusinessOpengHours
                value={openingHours}
                onChange={setOpeningHours}
                loading={loading}
            />
            {/* ==================================================
                PRICING
            ================================================== */}
            <BusinessPricingSection
                pricingType={pricingType}
                priceAmount={priceAmount}
                priceMinAmount={priceMinAmount}
                priceMaxAmount={priceMaxAmount}
                priceDescription={priceDescription}
                onPricingTypeChange={setPricingType}
                onPriceAmountChange={setPriceAmount}
                onPriceMinAmountChange={setPriceMinAmount}
                onPriceMaxAmountChange={setPriceMaxAmount}
                onPriceDescriptionChange={setPriceDescription}
                loading={loading}
            />
            {/* ==================================================
                CONTACT
            ================================================== */}
            <BusinessContactSection
                email={email}
                phone={phone}
                website={website}
                instagram={instagram}
                whatsapp={whatsapp}
                onEmailChange={setEmail}
                onPhoneChange={setPhone}
                onWebsiteChange={setWebsite}
                onInstagramChange={setInstagram}
                onWhatsappChange={setWhatsapp}
                loading={loading}
            />
            {/* ==================================================
                BUSINESS DETAILS
            ================================================== */}
            <BusinessDetailsSection
                documents={documents}
                onDocumentsChange={setDocuments}
                loading={loading}
            />
            {/* ==================================================
                LOCATION
            ================================================== */}
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
            
            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>

            )}


            {/* ==================================================
                SUBMIT
            ================================================== */}

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