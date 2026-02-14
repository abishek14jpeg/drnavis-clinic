"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Center } from "@react-three/drei";
import { Stethoscope, Bone, Heart, Star, ShieldCheck, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Group } from "three";

/* ─── 3D DNA Helix ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DNAHelix(props: any) {
    const groupRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
        }
    });

    const spheres = [];
    for (let i = 0; i < 20; i++) {
        const t = (i / 20) * Math.PI * 4;
        const y = (i / 20) * 6 - 3;
        spheres.push(
            <mesh key={`a-${i}`} position={[Math.cos(t) * 1.2, y, Math.sin(t) * 1.2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#0070f3" roughness={0.3} metalness={0.6} />
            </mesh>,
            <mesh key={`b-${i}`} position={[-Math.cos(t) * 1.2, y, -Math.sin(t) * 1.2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#00b4d8" roughness={0.3} metalness={0.6} />
            </mesh>
        );
        if (i % 2 === 0) {
            spheres.push(
                <mesh key={`c-${i}`} position={[0, y, 0]} rotation={[0, t, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
                    <meshStandardMaterial color="#ccff00" emissive="#ccff00" emissiveIntensity={0.3} opacity={0.6} transparent />
                </mesh>
            );
        }
    }

    return (
        <group ref={groupRef} {...props}>
            {spheres}
        </group>
    );
}

/* ─── Animated Stat Card ─── */
function StatCard({ icon: Icon, value, label, delay }: {
    icon: typeof Star;
    value: string;
    label: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all hover:scale-105"
        >
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-2xl md:text-3xl font-bold font-heading text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground tracking-wide uppercase">{label}</span>
        </motion.div>
    );
}

/* ─── About Hero ─── */
function AboutHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/80 via-background to-teal-50/30 -z-10" />
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm"
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            Kalapatti, Coimbatore
                        </motion.span>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-heading">
                            Meet{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400">
                                Dr. Navi.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
                            The Heart &amp; Science Behind Coimbatore&apos;s Favorite Pet Clinic.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-3 pt-2"
                        >
                            <span className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium">Lead Veterinarian</span>
                            <span className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium">M.V.Sc Surgery</span>
                            <span className="px-4 py-2 rounded-full border border-teal-400/30 text-teal-600 text-sm font-medium">Radiology</span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Doctor Image + 3D + Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* 3D Background */}
                        <div className="absolute inset-0 -z-10 opacity-30">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} intensity={1.5} />
                                <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                                    <Center>
                                        <DNAHelix scale={0.8} />
                                    </Center>
                                </Float>
                                <Environment preset="city" />
                            </Canvas>
                        </div>

                        {/* Doctor Image */}
                        <div className="relative">
                            <div className="w-[320px] h-[420px] md:w-[380px] md:h-[500px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-primary/10">
                                <Image
                                    src="/dr-navi.png"
                                    alt="Dr. S. Navaneethakrishnan"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 md:-right-8 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Stethoscope className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">M.V.Sc Surgery</p>
                                        <p className="text-[10px] text-muted-foreground">Specialist</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Second Badge */}
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -bottom-3 -left-4 md:-left-8 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">TNSVC Reg.</p>
                                        <p className="text-[10px] text-muted-foreground">#6862</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Story Timeline (Sticky Scroll Reveal) ─── */
function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const textY1 = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

    const textOpacity2 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
    const textY2 = useTransform(scrollYProgress, [0.3, 0.45], [40, 0]);

    const textOpacity3 = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
    const textY3 = useTransform(scrollYProgress, [0.5, 0.65], [40, 0]);

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 relative">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                        The Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
                        A Story of{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400">
                            Passion
                        </span>
                    </h2>
                </motion.div>

                <div className="relative pl-12 md:pl-16">
                    {/* Animated vertical line */}
                    <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px] bg-border rounded-full">
                        <motion.div
                            className="w-full bg-linear-to-b from-primary to-teal-400 rounded-full"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-20">
                        <motion.div style={{ opacity: textOpacity1, y: textY1 }} className="relative">
                            <div className="absolute -left-[2.35rem] md:-left-[2.6rem] w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg" />
                            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">The Spark</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                My journey into veterinary medicine began with a simple yet profound love
                                and a deep desire to serve the animal community. Growing up surrounded by
                                animals, I realized early on that healing them was my calling.
                            </p>
                        </motion.div>

                        <motion.div style={{ opacity: textOpacity2, y: textY2 }} className="relative">
                            <div className="absolute -left-[2.35rem] md:-left-[2.6rem] w-5 h-5 rounded-full bg-teal-400 border-4 border-background shadow-lg" />
                            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">The Growth</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Over time, this passion grew stronger. Pursuing an M.V.Sc in Veterinary
                                Surgery and Radiology gave me the tools to tackle even the most
                                complex orthopedic cases, from fracture repairs to hip dysplasia corrections.
                            </p>
                        </motion.div>

                        <motion.div style={{ opacity: textOpacity3, y: textY3 }} className="relative">
                            <div className="absolute -left-[2.35rem] md:-left-[2.6rem] w-5 h-5 rounded-full bg-accent border-4 border-background shadow-lg" />
                            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">The Mission</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                What began as a heartfelt dream transformed into a purposeful and
                                fulfilling vocation. Today, Dr. Navi&apos;s Clinic stands as a place where
                                pets are treated as family &mdash; with personalized, professional care rooted
                                in science and compassion.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Main About Page ─── */
export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            DN
                        </div>
                        <span className="font-bold font-heading text-lg">Dr. Navi&apos;s Clinic</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:block">
                            Home
                        </Link>
                        <Link href="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                            Sign In
                        </Link>
                        <Link href="/register" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* SECTION A: Hero */}
            <AboutHero />

            {/* SECTION B: Stats Strip */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard icon={Star} value="5.0 ★" label="Google Rating" delay={0} />
                        <StatCard icon={Heart} value="361+" label="Reviews" delay={0.1} />
                        <StatCard icon={ShieldCheck} value="6862" label="TNSVC Reg." delay={0.2} />
                        <StatCard icon={Clock} value="10+" label="Years Exp" delay={0.3} />
                    </div>
                </div>
            </section>

            {/* SECTION C: Story */}
            <StoryTimeline />

            {/* SECTION D: Qualifications Bento Grid */}
            <section className="py-24 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-3xl -z-10" />
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                            Expertise
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
                            Qualifications &amp;{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400">
                                Specialties
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1 - Wide */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10 bg-linear-to-br from-slate-900 to-slate-800 text-white hover:scale-[1.01] transition-transform"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Stethoscope className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                                    <Stethoscope className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                                    M.V.Sc in Veterinary Surgery &amp; Radiology
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                                    Dr. S. Navaneethakrishnan holds a Master&apos;s degree specializing in advanced
                                    surgical techniques and diagnostic radiology, enabling precise and effective
                                    treatment for complex veterinary cases.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">Advanced Diagnostics</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">Surgical Excellence</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">Radiology</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 - Orthopedic */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="group relative overflow-hidden rounded-3xl border border-border p-8 bg-linear-to-br from-blue-500/5 to-blue-600/10 backdrop-blur-sm hover:scale-[1.02] transition-transform"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Bone className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                                    <Bone className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Orthopedic Specialist</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Expert in fracture repairs, cruciate ligament surgery,
                                    hip dysplasia correction, and advanced bone-plating techniques.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Fracture Repair</span>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Hip Dysplasia</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3 - Compassionate */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl border border-border p-8 bg-linear-to-br from-teal-500/5 to-teal-600/10 backdrop-blur-sm hover:scale-[1.02] transition-transform"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Heart className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-5">
                                    <Heart className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Compassionate Care</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    A fear-free environment where every pet is treated with patience and
                                    gentle hands. We believe pets are family and deserve personalized, professional care.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-xs font-medium">Fear-Free</span>
                                    <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-xs font-medium">Gentle Handling</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center p-10 md:p-16 rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,112,243,0.15),transparent_70%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,180,216,0.1),transparent_60%)]" />
                        <div className="relative z-10">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading leading-snug mb-8">
                                &ldquo;We believe pets are family and aim to provide{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400">
                                    personalized, professional care.
                                </span>&rdquo;
                            </p>
                            <p className="text-slate-400 text-lg mb-8">
                                &mdash; Dr. S. Navaneethakrishnan
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-muted-foreground border-t">
                <p>&copy; {new Date().getFullYear()} Dr. Navi&apos;s Veterinary Clinic. All rights reserved.</p>
                <p className="mt-2">No 13/5, Indira Nagar, Kalapatti, Coimbatore</p>
            </footer>
        </main>
    );
}
