import type {
    BusinessCategory,
    BusinessOpeningHours,
    BusinessPricingType,
    BusinessSubCategory,
} from "./business.types";
import type { CreateBusinessRequest, OwnerBusiness, UpdateBusinessRequest } from "@ndrs92/contracts";
import type { ResolvedLocationData, LocationSelectionData } from "@/features/location/location.types";

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

export type BusinessFormValues = {
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
    email: string;
    phone: string;
    website: string;
    instagram: string;
    whatsapp: string;
    isLatinoOwned: boolean;
    countryOfOrigin: string;
    tags: string[];
};

type BusinessRequestWithoutLocation = Omit<CreateBusinessRequest, "location">;

const buildBusinessRequestFields = (
    values: BusinessFormValues,
): BusinessRequestWithoutLocation => ({
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

const serializeLocation = (location: ResolvedLocationData) => ({
    address: location.formattedAddress,
    cityId: location.city,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
});

export const getEditableBusinessLocation = (
    business: OwnerBusiness,
): LocationSelectionData => ({
    city: business.location.cityId,
    country: business.location.country ?? "",
    formattedAddress: business.location.address ?? "",
    ...(business.location.coordinates
        ? {
            latitude: business.location.coordinates.lat,
            longitude: business.location.coordinates.lng,
        }
        : {}),
});

export const isCompleteBusinessLocation = (
    location: LocationSelectionData | null,
): location is ResolvedLocationData => Boolean(
    location &&
    location.city.trim() &&
    location.country.trim() &&
    location.formattedAddress.trim() &&
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude)
);

export const buildCreateBusinessRequest = (
    values: BusinessFormValues & { location: ResolvedLocationData },
): CreateBusinessRequest => ({
    ...buildBusinessRequestFields(values),
    location: serializeLocation(values.location),
});

/** Builds a full replacement payload while retaining owner profile fields this form does not edit. */
export const buildUpdateBusinessRequest = (
    values: BusinessFormValues,
    business: OwnerBusiness,
    changedLocation?: ResolvedLocationData,
): UpdateBusinessRequest => ({
    ...buildBusinessRequestFields(values),
    ...(changedLocation ? { location: serializeLocation(changedLocation) } : {}),
    providerType: business.providerType,
    profile: {
        ...business.profile,
        languages: values.languages ?? business.profile.languages,
        openingHours: values.openingHours,
        pricing: buildBusinessPricing(values.pricing),
    },
    documents: values.documents?.map(({ type, url, name }) => ({
        type,
        url,
        ...(name ? { name } : {}),
    })),
});
