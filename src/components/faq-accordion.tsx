"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Syringe } from "lucide-react";

const faqs = [
    {
        question: "Dog Vaccination Schedule",
        content: (
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Essential protection for your puppy.</p>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between border-b pb-2"><span>6-8 Weeks</span> <span className="font-semibold">Distemper, Parvo (DHPP)</span></li>
                    <li className="flex justify-between border-b pb-2"><span>10-12 Weeks</span> <span className="font-semibold">DHPP + Leptospirosis</span></li>
                    <li className="flex justify-between border-b pb-2"><span>14-16 Weeks</span> <span className="font-semibold">DHPP + Rabies</span></li>
                    <li className="flex justify-between"><span>1 Year</span> <span className="font-semibold">DHPP + Rabies Booster</span></li>
                </ul>
            </div>
        )
    },
    {
        question: "Cat Vaccination Schedule",
        content: (
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Core vaccines for kittens.</p>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between border-b pb-2"><span>6-8 Weeks</span> <span className="font-semibold">FVRCP (Distemper)</span></li>
                    <li className="flex justify-between border-b pb-2"><span>10-12 Weeks</span> <span className="font-semibold">FVRCP + FeLV</span></li>
                    <li className="flex justify-between border-b pb-2"><span>14-16 Weeks</span> <span className="font-semibold">FVRCP + Rabies</span></li>
                    <li className="flex justify-between"><span>1 Year</span> <span className="font-semibold">Boosters</span></li>
                </ul>
            </div>
        )
    },
    {
        question: "Do I need an appointment?",
        content: "Yes, we recommend booking a slot to avoid long wait times. Emergency cases are prioritized immediately."
    },
    {
        question: "What are your consulting hours?",
        content: "We are open Monday to Sunday, 9:00 AM to 9:00 PM. Emergency care is available 24/7."
    }
];

export function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="container py-24 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-heading mb-4">Common Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about your pet&apos;s health.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-border rounded-xl bg-card overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left font-medium hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    {index < 2 ? <Syringe className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                                <span className="text-lg">{faq.question}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                        {faq.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
