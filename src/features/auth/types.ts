export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    cityId: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}

/* =================================================
   AUTH TYPES
================================================= */

export type AuthProvider =
    | "email"
    | "google";

export type UserRole =
    | "user"
    | "admin";

export type SubscriptionPlan =
    | "FREE"
    | "BUSINESS"
    | "BUSINESS_PRO"
    | "ENTERPRISE";

/* =================================================
   SUBSCRIPTION
================================================= */

export interface Subscription {
    plan: SubscriptionPlan;
    maxBusinesses: number;
}

/* =================================================
   AUTH USER
================================================= */

export interface AuthUser {
    _id: string;

    name: string;
    email: string;

    role: UserRole;
    provider: AuthProvider;

    subscription: Subscription;

    cityId?: string;
    originCountry?: string;

    profileImage?: string;
    bio?: string;

    favorites: string[];

    onboardingCompleted: boolean;
    isVerified: boolean;

    createdAt: string;
    updatedAt: string;
}

/* =================================================
   LOGIN
================================================= */

export interface LoginResponse {
    user: AuthUser;
    token: string;
}

/* =================================================
   API
================================================= */

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}