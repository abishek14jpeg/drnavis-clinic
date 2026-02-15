"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "PATIENT",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateField = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    phone: form.phone,
                    role: form.role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed");
                return;
            }

            router.push("/login?registered=true");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden py-12">
            {/* Ambient glow orbs */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4 shadow-lg shadow-purple-500/25">
                        <span className="text-2xl font-bold text-white">DN</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white font-heading">Create Account</h1>
                    <p className="text-blue-200/70 mt-2">Join Dr. Navi&apos;s Clinic Portal</p>
                </div>

                {/* Register Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                placeholder="Alex Johnson"
                            />
                        </div>

                        <div>
                            <label htmlFor="reg-email" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                Email Address
                            </label>
                            <input
                                id="reg-email"
                                type="email"
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                placeholder="alex@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                I am a...
                            </label>
                            <select
                                id="role"
                                value={form.role}
                                onChange={(e) => updateField("role", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                            >
                                <option value="PATIENT" className="bg-slate-900">Pet Owner / Patient</option>
                                <option value="RECEPTIONIST" className="bg-slate-900">Receptionist</option>
                                <option value="DOCTOR" className="bg-slate-900">Doctor</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="reg-password" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="reg-password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => updateField("password", e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all pr-12"
                                    placeholder="Min 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-blue-200/80 mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) => updateField("confirmPassword", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 mt-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-blue-200/50 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-blue-200/40 hover:text-blue-200/70 text-sm transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
