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
        content: "Mon, Tue, Thu, Fri, Sat & Sun: 10:00 AM – 1:00 PM & 6:00 PM – 9:00 PM. Wednesday: 6:00 PM – 9:00 PM only. House call services available outside clinic hours."
    }
];

export function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-16 md:py-20 bg-muted/30" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 id="faq-heading" className="text-4xl font-bold font-heading mb-4 text-foreground">Common Questions</h2>
                    <p className="text-muted-foreground text-lg">Everything you need to know about your pet&apos;s health and our veterinary services in Coimbatore.</p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-xl bg-card overflow-hidden transition-all hover:border-primary/50"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left font-medium hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        {index < 2 ? <Syringe className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                    <span className="text-lg text-foreground font-semibold">{faq.question}</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="shrink-0"
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
                                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed pl-[4.5rem]">
                                            {faq.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
