"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, ReactNode } from "react";

export type Role = "DOCTOR" | "RECEPTIONIST" | "PATIENT";

interface AuthContextType {
    role: Role;
    user: { name: string; email: string; id: string } | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType>({
    role: "PATIENT",
    user: null,
    status: "loading",
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    const role = ((session?.user as Record<string, unknown>)?.role as Role) || "PATIENT";
    const user = session?.user
        ? {
            name: session.user.name || "",
            email: session.user.email || "",
            id: ((session.user as Record<string, unknown>).id as string) || "",
        }
        : null;

    return (
        <AuthContext.Provider value={{ role, user, status }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
