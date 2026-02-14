"use client";

import { AuthProvider, useAuth, Role } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import {
    Users, Calendar, Settings, Activity, ClipboardList,
    PawPrint, FileText, CreditCard, LogOut, FlaskConical
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

// Wrapper to provide context
export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </AuthProvider>
    );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const { role, user, status } = useAuth();
    const [collapsed] = useState(false);
    const pathname = usePathname();

    const menuItems: Record<Role, { icon: React.ComponentType<{ className?: string }>; label: string; href: string }[]> = {
        DOCTOR: [
            { icon: Calendar, label: "Surgery Schedule", href: "/dashboard/doctor/schedule" },
            { icon: Users, label: "Patient Records", href: "/dashboard/doctor/patients" },
            { icon: FlaskConical, label: "Lab Reports", href: "/dashboard/doctor/lab-reports" },
            { icon: Activity, label: "Live Vitals", href: "/dashboard/doctor/vitals" },
        ],
        RECEPTIONIST: [
            { icon: ClipboardList, label: "Queue Management", href: "/dashboard/receptionist/queue" },
            { icon: Calendar, label: "Appointments", href: "/dashboard/receptionist/appointments" },
            { icon: CreditCard, label: "Billing", href: "/dashboard/receptionist/billing" },
        ],
        PATIENT: [
            { icon: PawPrint, label: "My Pets", href: "/dashboard/patient/pets" },
            { icon: Calendar, label: "Book Appointment", href: "/dashboard/patient/book" },
            { icon: ClipboardList, label: "My Appointments", href: "/dashboard/patient/appointments" },
            { icon: FileText, label: "Lab Reports", href: "/dashboard/patient/lab-reports" },
        ],
    };

    const currentMenu = menuItems[role] || [];

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-muted/20">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-muted/20">
            {/* Sidebar */}
            <aside className={cn(
                "bg-card border-r border-border transition-all duration-300 flex flex-col",
                collapsed ? "w-16" : "w-64"
            )}>
                <div className="h-16 flex items-center px-4 border-b border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        CN
                    </div>
                    {!collapsed && <span className="ml-3 font-bold font-heading">Clinic OS</span>}
                </div>

                <div className="flex-1 p-4 space-y-2">
                    {currentMenu.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* User Info + Logout */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-accent to-primary shrink-0" />
                        {!collapsed && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-muted-foreground truncate">{role}</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 w-full rounded-md text-sm",
                            "text-red-500 hover:bg-red-500/10 transition-colors"
                        )}
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10 px-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold font-heading">Dashboard</h1>
                    <button className="p-2 hover:bg-muted rounded-full">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>
                </header>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
