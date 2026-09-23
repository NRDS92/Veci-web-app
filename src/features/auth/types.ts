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

export type AuthProvider = "email" | "google";

export type UserRole = "user" | "admin";

export type SubscriptionPlan =
    | "FREE"
    | "BUSINESS"
    | "BUSINESS_PRO"
    | "ENTERPRISE";

export interface Subscription {
    plan: SubscriptionPlan;
}

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

export interface LoginResponse {
    user: AuthUser;
    token: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface Subscription {
  plan: SubscriptionPlan;
  maxBusinesses: number;
}

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