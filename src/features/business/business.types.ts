// ======================================================
// PROVIDER TYPE
// ======================================================

export type ProviderType =
    | "business"
    | "community";


// ======================================================
// CATEGORY
// ======================================================

export type BusinessCategory =
    | "food"
    | "entertainment"
    | "services"
    | "shopping"
    | "education"
    | "health";


// ======================================================
// SUBCATEGORY
// ======================================================

export type BusinessSubCategory =
    // FOOD
    | "restaurant"
    | "cafe"
    | "bar"
    | "bakery"
    | "catering"

    // ENTERTAINMENT
    | "club"
    | "event_venue"
    | "event_organizer"
    | "cultural_center"
    | "dance_school"

    // SERVICES
    | "beauty_salon"
    | "barbershop"
    | "repair"
    | "agency"
    | "translator"
    | "photographer"
    | "freelancer"

    // SHOPPING
    | "latin_store"
    | "supermarket"
    | "clothing"
    | "product_seller"

    // EDUCATION
    | "language_school"
    | "academy"
    | "private_teacher"

    // HEALTH
    | "clinic"
    | "gym";


// ======================================================
// AVAILABILITY
// ======================================================

export type BusinessAvailabilityType =
    | "appointment"
    | "walk_in"
    | "online"
    | "flexible";


// ======================================================
// PRICING
// ======================================================

export type BusinessPricingType =
    | "fixed"
    | "hourly"
    | "starting_at"
    | "range";


// ======================================================
// DOCUMENTS
// ======================================================

export type BusinessDocumentType =
    | "menu"
    | "catalog"
    | "portfolio"
    | "brochure";


// ======================================================
// PROFILE
// ======================================================

export interface BusinessPricing {
    type: BusinessPricingType;
    currency: "EUR";
    amount?: number;
    minAmount?: number;
    maxAmount?: number;
    description?: string;
}


export interface BusinessAvailability {
    type: BusinessAvailabilityType;
    description?: string;
}


export interface BusinessProfile {
    headline?: string;

    services: string[];

    specialties: string[];

    languages: string[];

    serviceArea: string[];

    availability?: BusinessAvailability;

    pricing?: BusinessPricing;
}


// ======================================================
// IMAGES
// ======================================================

export interface BusinessImages {
    profile: string;
    cover?: string;
    gallery: string[];
}


// ======================================================
// DOCUMENTS
// ======================================================

export interface BusinessDocument {
    type: BusinessDocumentType;
    url: string;
    name?: string;
}


// ======================================================
// LOCATION
// ======================================================

export interface BusinessLocation {
    address: string;
    cityId: string;
    country: string;

    latitude: number;
    longitude: number;
}


// ======================================================
// CONTACT
// ======================================================

export interface BusinessContact {
    email?: string;
    phone?: string;
    website?: string;
    instagram?: string;
    whatsapp?: string;
}


// ======================================================
// COMMUNITY
// ======================================================

export interface BusinessCommunity {
    isLatinoOwned: boolean;
    countryOfOrigin?: string;
}


// ======================================================
// CREATE BUSINESS
// ======================================================

export interface CreateBusinessRequest {

    // --------------------------------------------------
    // Identity
    // --------------------------------------------------

    name: string;
    description?: string;


    // --------------------------------------------------
    // Classification
    // --------------------------------------------------

    providerType: ProviderType;

    category: BusinessCategory;

    subCategory?: BusinessSubCategory;


    // --------------------------------------------------
    // Profile
    // --------------------------------------------------

    profile: BusinessProfile;


    // --------------------------------------------------
    // Media
    // --------------------------------------------------

    images: BusinessImages;


    // --------------------------------------------------
    // Documents
    // --------------------------------------------------

    documents: BusinessDocument[];


    // --------------------------------------------------
    // Location
    // --------------------------------------------------

    location: BusinessLocation;


    // --------------------------------------------------
    // Contact
    // --------------------------------------------------

    contact: BusinessContact;


    // --------------------------------------------------
    // Community
    // --------------------------------------------------

    community: BusinessCommunity;


    // --------------------------------------------------
    // Discovery
    // --------------------------------------------------

    tags: string[];
}


// ======================================================
// UPDATE BUSINESS
// ======================================================

export type UpdateBusinessRequest =
    Partial<CreateBusinessRequest>;


// ======================================================
// BUSINESS RESPONSE
// ======================================================

export interface Business {

    _id: string;

    name: string;

    description?: string;

    slug: string;

    providerType: ProviderType;

    category: BusinessCategory;

    subCategory?: BusinessSubCategory;

    owner: string;

    profile: BusinessProfile;

    images: BusinessImages;

    documents: BusinessDocument[];

    location: {
        address: string;
        cityId: string;
        country: string;

        coordinates: {
            lat: number;
            lng: number;
        };
    };

    contact: BusinessContact;

    community: BusinessCommunity;

    tags: string[];

    rating: {
        average: number;
        count: number;
    };

    followersCount: number;

    eventsCount: number;

    verification: {
        status:
            | "unverified"
            | "pending"
            | "verified"
            | "rejected";

        checks: {
            identity: boolean;
            contact: boolean;
            activity: boolean;
        };

        verifiedAt?: string;

        verifiedBy?: string;
    };

    moderation: {
        status:
            | "pending"
            | "approved"
            | "rejected";

        reason?: string;
    };

    isFeatured: boolean;

    visibilityScore: number;

    status:
        | "active"
        | "blocked";

    createdAt: string;

    updatedAt: string;
}


// ======================================================
// MY BUSINESS
// ======================================================

export interface MyBusiness {

    _id: string;

    name: string;

    slug?: string;

    providerType?: ProviderType;

    category?: BusinessCategory;

    subCategory?: BusinessSubCategory;

    images?: BusinessImages;
}