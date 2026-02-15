"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Center } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Group } from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MedicalCross(props: any) {
    const meshRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={meshRef} {...props}>
            {/* Vertical Bar */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 3.5, 1]} />
                <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.1} />
            </mesh>
            {/* Horizontal Bar */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[1, 3.5, 1]} />
                <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.1} />
            </mesh>

            {/* Accent Details */}
            <mesh position={[0, 0, 0.51]}>
                <boxGeometry args={[0.5, 3, 0.1]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.51]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.5, 3, 0.1]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.2} />
            </mesh>
        </group>
    );
}

export function Hero3D() {
    return (
        <section className="w-full relative overflow-hidden bg-background pt-24 pb-12 lg:pt-32 lg:pb-20" aria-label="Hero - Dr. Navi's Veterinary Clinic">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />

            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 space-y-8 z-10 text-center lg:text-left pt-8 lg:pt-0"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-wide"
                        >
                            Vet Surgeon in Coimbatore
                        </motion.span>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] font-heading text-foreground">
                            Driven by Love, <br />
                            <span className="text-gradient-brand pb-2">
                                Backed by Science.
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Dr. Navi&apos;s Clinic offers specialized orthopedic surgery, vaccinations, dental care, and emergency services with house calls for your furry family members in Kalapatti, Coimbatore.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Button size="lg" className="rounded-full text-base font-semibold px-8 h-12 shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
                            <a href="/login">Book Consultation</a>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full text-base px-8 h-12 hover:bg-secondary" asChild>
                            <a href="#services">Our Services</a>
                        </Button>
                    </div>
                </motion.div>

                {/* 3D Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 h-[400px] lg:h-[600px] w-full relative z-0"
                >
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.7} />
                        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
                        <spotLight position={[-10, -5, -10]} intensity={1} color="#f97316" />

                        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[-0.2, 0.2]}>
                            <Center>
                                <MedicalCross scale={1.2} />
                            </Center>
                        </Float>

                        <Environment preset="city" />
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#8b5cf6" />
                    </Canvas>
                </motion.div>
            </div>
        </section>
    )
}
