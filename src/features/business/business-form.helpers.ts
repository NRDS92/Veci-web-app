import type {
    BusinessCategory,
    BusinessOpeningHours,
    BusinessPricingType,
    BusinessSubCategory,
} from "./business.types";
import type { CreateBusinessRequest, OwnerBusiness, UpdateBusinessRequest } from "@ndrs92/contracts";
import type { LocationData } from "@/features/location/location.types";

type PricingInput = {
    type: BusinessPricingType;
    amount: string;
    minAmount: string;
    maxAmount: string;
    description: string;
};

type CreateBusinessProfileRequest = NonNullable<CreateBusinessRequest["profile"]>;
type CreateBusinessPricingRequest = NonNullable<CreateBusinessProfileRequest["pricing"]>;

export const isValidBusinessName = (name: string): boolean =>
    name.trim().length >= 2;

export const buildBusinessPricing = ({
    type,
    amount,
    minAmount,
    maxAmount,
    description: rawDescription,
}: PricingInput): CreateBusinessPricingRequest | undefined => {
    const description = rawDescription.trim() || undefined;
    const parseAmount = (value: string) => value ? Number(value) : undefined;

    if (type === "range") {
        if (!minAmount && !maxAmount && !description) return undefined;
        return {
            type,
            currency: "EUR",
            minAmount: parseAmount(minAmount),
            maxAmount: parseAmount(maxAmount),
            description,
        };
    }

    if (!amount && !description) return undefined;
    return {
        type,
        currency: "EUR",
        amount: parseAmount(amount),
        description,
    };
};

type CreateBusinessFormValues = {
    name: string;
    description: string;
    category: BusinessCategory;
    subCategory: BusinessSubCategory | "";
    languages: string[];
    openingHours: BusinessOpeningHours;
    pricing: PricingInput;
    profileImage: string;
    coverImage: string;
    galleryImages: string[];
    documents: NonNullable<CreateBusinessRequest["documents"]>;
    location: LocationData;
    email: string;
    phone: string;
    website: string;
    instagram: string;
    whatsapp: string;
    isLatinoOwned: boolean;
    countryOfOrigin: string;
    tags: string[];
};

export const buildCreateBusinessRequest = (
    values: CreateBusinessFormValues,
): CreateBusinessRequest => ({
    name: values.name.trim(),
    description: values.description.trim() || undefined,
    providerType: "business",
    category: values.category,
    subCategory: values.subCategory || undefined,
    profile: {
        languages: values.languages,
        services: [],
        specialties: [],
        serviceArea: [],
        openingHours: values.openingHours,
        pricing: buildBusinessPricing(values.pricing),
    },
    images: {
        profile: values.profileImage,
        cover: values.coverImage || undefined,
        gallery: values.galleryImages,
    },
    documents: values.documents.map(({ type, url, name }) => ({ type, url, name })),
    location: {
        address: values.location.formattedAddress,
        cityId: values.location.city,
        country: values.location.country,
        latitude: values.location.latitude,
        longitude: values.location.longitude,
    },
    contact: {
        email: values.email.trim() || undefined,
        phone: values.phone.trim() || undefined,
        website: values.website.trim() || undefined,
        instagram: values.instagram.trim() || undefined,
        whatsapp: values.whatsapp.trim() || undefined,
    },
    community: {
        isLatinoOwned: values.isLatinoOwned,
        countryOfOrigin: values.countryOfOrigin.trim() || undefined,
    },
    tags: values.tags,
});

/** Builds a full replacement payload while retaining owner profile fields this form does not edit. */
export const buildUpdateBusinessRequest = (
    request: CreateBusinessRequest,
    business: OwnerBusiness,
): UpdateBusinessRequest => ({
    ...request,
    providerType: business.providerType,
    profile: {
        ...business.profile,
        languages: request.profile?.languages ?? business.profile.languages,
        openingHours: request.profile?.openingHours,
        pricing: request.profile?.pricing,
    },
    documents: request.documents?.map(({ type, url, name }) => ({
        type,
        url,
        ...(name ? { name } : {}),
    })),
});
