"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useNotification } from "@/components/notifications/NotificationProvider";
import { getApiError } from "@/lib/api/apiError";
import LocationSelector from "@/components/location/LocationSelector";
import { businessService } from "@/features/business/business.service";
import { buildCreateBusinessRequest, buildUpdateBusinessRequest, isValidBusinessName } from "@/features/business/business-form.helpers";
import { CreateBusinessRequestSchema, UpdateBusinessRequestSchema, type CreateBusinessRequest } from "@ndrs92/contracts";
import type { OwnerBusiness } from "@ndrs92/contracts";
import {
    BusinessCategory,
    BusinessSubCategory,
    BusinessPricingType,
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


interface BusinessFormProps {
    initialBusiness?: OwnerBusiness;
}

export default function BusinessForm({ initialBusiness }: BusinessFormProps) {
    
    const router = useRouter();
    const { notify } = useNotification();
    // ==================================================
    // IDENTITY
    // ==================================================
    const [name, setName] = useState(initialBusiness?.name ?? "");
    const [description, setDescription] = useState(initialBusiness?.description ?? "");
    // ==================================================
    // CLASSIFICATION
    // ==================================================
    const [category, setCategory] =
        useState<BusinessCategory>(initialBusiness?.category ?? "food");
    const [subCategory, setSubCategory] =
        useState<BusinessSubCategory | "">(initialBusiness?.subCategory ?? "");
    // ==================================================
    // IMAGES
    // ==================================================
    const [profileImage, setProfileImage] = useState(initialBusiness?.images.profile ?? "");
    const [coverImage, setCoverImage] = useState(initialBusiness?.images.cover ?? "");
    const [galleryImages, setGalleryImages] =
        useState<string[]>(initialBusiness?.images.gallery ?? []);
    // ==================================================
    // LOCATION
    // ==================================================
    const [location, setLocation] =
        useState<LocationData | null>(initialBusiness ? {
            placeId: "",
            city: initialBusiness.location.cityId,
            country: initialBusiness.location.country ?? "",
            countryCode: "",
            formattedAddress: initialBusiness.location.address ?? "",
            latitude: initialBusiness.location.coordinates?.lat ?? 0,
            longitude: initialBusiness.location.coordinates?.lng ?? 0,
        } : null);
    // ==================================================
    // CONTACT
    // ==================================================
    const [email, setEmail] = useState(initialBusiness?.contact.email ?? "");
    const [phone, setPhone] = useState(initialBusiness?.contact.phone ?? "");
    const [website, setWebsite] = useState(initialBusiness?.contact.website ?? "");
    const [instagram, setInstagram] = useState(initialBusiness?.contact.instagram ?? "");
    const [whatsapp, setWhatsapp] = useState(initialBusiness?.contact.whatsapp ?? "");
    // ==================================================
    // DOCUMENTS
    // ==================================================
    const [documents, setDocuments] = useState<BusinessDocument[]>(initialBusiness?.documents.map((document) => ({
        type: document.type,
        url: document.url,
        name: document.name ?? "",
    })) ?? []);
    // ==================================================
    // PRICING
    // ==================================================
    const [pricingType, setPricingType] =
        useState<BusinessPricingType>(initialBusiness?.profile.pricing?.type ?? "starting_at");
    const [priceAmount, setPriceAmount] =
        useState(initialBusiness?.profile.pricing?.amount?.toString() ?? "");
    const [priceMinAmount, setPriceMinAmount] =
        useState(initialBusiness?.profile.pricing?.minAmount?.toString() ?? "");
    const [priceMaxAmount, setPriceMaxAmount] =
        useState(initialBusiness?.profile.pricing?.maxAmount?.toString() ?? "");
    const [priceDescription, setPriceDescription] =
        useState(initialBusiness?.profile.pricing?.description ?? "");
    // ==================================================
    // SCHEDULE
    // ==================================================
    const [openingHours, setOpeningHours] =
    useState<BusinessOpeningHours>(initialBusiness?.profile.openingHours ?? {
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
        useState(initialBusiness?.community.isLatinoOwned ?? true);
    const [countryOfOrigin, setCountryOfOrigin] =
        useState(initialBusiness?.community.countryOfOrigin ?? "");
    // ==================================================
    // TAGS
    // ==================================================
    const [tagsInput, setTagsInput] =
        useState("");
    const [tags, setTags] =
        useState<string[]>(initialBusiness?.tags ?? []);
    // ==================================================
    // LANGUAGES
    // ==================================================
    const [languagesInput, setLanguagesInput] =
        useState("");
    const [languages, setLanguages] =
        useState<string[]>(initialBusiness?.profile.languages ?? []);
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
        if (!isValidBusinessName(name)) {
            setError(
                "Business name must contain at least 2 characters."
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
            const payload: CreateBusinessRequest = buildCreateBusinessRequest({
                name, description, category, subCategory, languages, openingHours,
                pricing: { type: pricingType, amount: priceAmount, minAmount: priceMinAmount, maxAmount: priceMaxAmount, description: priceDescription },
                profileImage, coverImage, galleryImages, documents, location,
                email, phone, website, instagram, whatsapp, isLatinoOwned,
                countryOfOrigin, tags,
            });
            if (initialBusiness) {
                const updatePayload = buildUpdateBusinessRequest(payload, initialBusiness);
                const validation = UpdateBusinessRequestSchema.safeParse(updatePayload);
                if (!validation.success) {
                    setError(validation.error.issues[0]?.message ?? "Please check the business details.");
                    return;
                }
                await businessService.updateBusiness(initialBusiness._id, validation.data);
                notify({
                    type: "success",
                    title: "Business updated",
                    message: "Your business has been updated successfully.",
                });
                router.push("/user/myBusiness");
                return;
            }

            const validation = CreateBusinessRequestSchema.safeParse(payload);
            if (!validation.success) {
                setError(validation.error.issues[0]?.message ?? "Please check the business details.");
                return;
            }
            const response = await businessService.createBusiness(validation.data);
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
                    ? initialBusiness ? "Saving business..." : "Creating business..."
                    : initialBusiness ? "Save Changes" : "Create Business"}

            </button>

        </form>
    );
}
