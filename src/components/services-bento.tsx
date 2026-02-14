"use client";

import { Bone, Syringe, ShoppingBag, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Specialized Surgery",
        description: "Expert orthopedic and soft tissue surgeries using advanced techniques.",
        icon: Bone,
        className: "md:col-span-2 md:row-span-2 bg-linear-to-br from-blue-500/10 to-blue-600/5",
        items: ["Orthopedic Fracture Repair", "Soft Tissue Surgery", "Spaying & Neutering"]
    },
    {
        title: "General Care",
        description: "Comprehensive wellness exams, vaccinations, and dental hygiene.",
        icon: Syringe,
        className: "md:col-span-1 md:row-span-1 bg-linear-to-br from-lime-400/10 to-lime-500/5",
        items: ["Vaccinations", "Dental Cleaning"]
    },
    {
        title: "Emergency 24/7",
        description: "Critical care for GDV, foreign body removal, and trauma.",
        icon: HeartPulse,
        className: "md:col-span-1 md:row-span-1 bg-linear-to-br from-red-500/10 to-red-600/5 border-red-200/20",
        items: ["GDV Treatment", "Trauma Care"]
    },
    {
        title: "Pet Boutique",
        description: "Curated dining collection and premium pet essentials.",
        icon: ShoppingBag,
        className: "md:col-span-2 md:row-span-1 bg-linear-to-br from-purple-500/10 to-purple-600/5",
        items: ["Dining Collection", "Accessories"]
    }
];

export function ServicesBento() {
    return (
        <section id="services" className="container py-24">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
                    Comprehensive Care for Every Paw
                </h2>
                <p className="text-lg text-muted-foreground">
                    From routine checkups to complex surgeries, Dr. Navi provides world-class veterinary medicine.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "group relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 p-8 transition-all hover:scale-[1.01] hover:shadow-xl",
                            "backdrop-blur-sm bg-white/50 dark:bg-black/20",
                            service.className
                        )}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity group-hover:rotate-12 transform duration-500">
                            <service.icon className="w-24 h-24 text-foreground/5" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-background/80 shadow-sm flex items-center justify-center mb-6 text-primary group-hover:text-accent transition-colors">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 font-heading">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </div>

                            <ul className="space-y-1 mt-4">
                                {service.items.map((item) => (
                                    <li key={item} className="text-sm font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
