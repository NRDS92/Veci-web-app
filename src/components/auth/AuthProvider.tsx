"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { authService } from "../../features/auth/auth.service";
import type { AuthUser } from "../../features/auth/types";

interface AuthContextValue {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const token = sessionStorage.getItem("auth_token");

            if (!token) {
                setUser(null);
                return;
            }

            const response = await authService.getMe();

            setUser(response.data.data);
        } catch (error) {
            console.error("Failed to restore authentication:", error);

            sessionStorage.removeItem("auth_token");
            setUser(null);
        }
    };

    const logout = () => {
        sessionStorage.removeItem("auth_token");
        setUser(null);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await refreshUser();
            setLoading(false);
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: Boolean(user),
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}