import { NextResponse } from "next/server";

// ─── Built-in veterinary clinic chatbot responses ───────────────────────────
const CLINIC_RESPONSES: { keywords: string[]; response: string }[] = [
    {
        keywords: ["hello", "hi", "hey", "good morning", "good evening", "greetings"],
        response:
            "Hello! 👋 Welcome to Dr. Navi's Veterinary Clinic. I'm your virtual assistant. How can I help you today? You can ask about our services, appointments, timings, or pet care tips!",
    },
    {
        keywords: ["appointment", "book", "schedule", "visit", "slot"],
        response:
            "To book an appointment, please call us at 📞 93634 14845 or visit our clinic at Kalapatti, Coimbatore. You can also register on our website and book through the Patient Dashboard. We recommend booking in advance for specialized consultations.",
    },
    {
        keywords: ["timing", "hours", "open", "close", "working", "available", "when"],
        response:
            "🕐 Our clinic hours are:\n• Monday – Saturday: 9:00 AM – 1:00 PM & 5:00 PM – 9:00 PM\n• Sunday: 10:00 AM – 1:00 PM (Emergency only)\n\nFor emergencies outside these hours, please call 📞 93634 14845.",
    },
    {
        keywords: ["emergency", "urgent", "critical", "accident", "bleeding", "poison"],
        response:
            "🚨 For emergencies, please call us immediately at 📞 93634 14845. We handle trauma care, GDV treatment, poisoning, and other critical cases. If outside clinic hours, Dr. Navi is available for emergency house calls.",
    },
    {
        keywords: ["surgery", "orthopedic", "fracture", "spay", "neuter", "castration", "operation"],
        response:
            "🏥 We offer specialized surgeries including:\n• Orthopedic fracture repair\n• Soft tissue surgery\n• Spaying & neutering\n• Tumor removal\n\nAll surgeries are performed by Dr. Navi using advanced techniques. Please book a consultation first for a pre-surgical evaluation.",
    },
    {
        keywords: ["vaccine", "vaccination", "shot", "immunization", "rabies", "distemper", "parvo"],
        response:
            "💉 We provide complete vaccination programs for dogs and cats:\n• Puppy/Kitten series (6-16 weeks)\n• Annual boosters (Rabies, DHPP, FVRCP)\n• Kennel cough (Bordetella)\n\nBring your pet's previous vaccination records if available. Walk-ins are welcome for vaccinations!",
    },
    {
        keywords: ["dental", "teeth", "tooth", "cleaning", "oral"],
        response:
            "🦷 Our dental services include:\n• Professional dental cleaning\n• Tooth extraction\n• Oral health assessments\n\nDental disease is very common in pets over 3 years. We recommend annual dental checkups. Signs to watch: bad breath, difficulty eating, drooling.",
    },
    {
        keywords: ["price", "cost", "fee", "charge", "how much", "payment", "expensive"],
        response:
            "💰 Our fees vary by service. Here's a general guide:\n• Consultation: ₹300 – ₹500\n• Vaccinations: ₹500 – ₹1500\n• Dental cleaning: ₹2000 – ₹5000\n• Surgery: Varies by complexity\n\nWe accept cash, UPI, and card payments. For exact pricing, please call 📞 93634 14845.",
    },
    {
        keywords: ["location", "address", "where", "direction", "map", "find"],
        response:
            "📍 We are located at:\nDr. Navi's Veterinary Clinic\nKalapatti, Coimbatore, Tamil Nadu\n\nYou can find us on Google Maps! Look for \"Dr. Navi's Veterinary Clinic\" or check the map on our website footer.",
    },
    {
        keywords: ["food", "diet", "feed", "nutrition", "eat", "weight"],
        response:
            "🍖 Pet nutrition tips:\n• Dogs: Feed high-quality commercial food appropriate for age/size. Avoid onions, chocolate, grapes.\n• Cats: Ensure adequate protein and taurine. Wet food helps with hydration.\n• Puppies/Kittens: Feed 3-4 small meals daily.\n• Adults: 2 meals per day is ideal.\n\nFor personalized diet plans, book a nutrition consultation!",
    },
    {
        keywords: ["tick", "flea", "parasite", "worm", "deworming", "skin", "itch", "scratch"],
        response:
            "🐛 Parasite prevention is essential:\n• Deworming: Every 3 months for adults, monthly for puppies\n• Tick/Flea: Use monthly spot-on treatments or tick collars\n• Signs of parasites: scratching, hair loss, visible worms, lethargy\n\nWe stock premium anti-parasite products at our Pet Boutique. Visit us for a skin checkup if your pet is itching!",
    },
    {
        keywords: ["boutique", "shop", "buy", "product", "accessory", "collar", "leash", "toy"],
        response:
            "🛍️ Our Pet Boutique offers:\n• Premium pet food brands\n• Collars, leashes & harnesses\n• Toys & enrichment items\n• Grooming supplies\n• Dining collection bowls\n\nVisit our clinic to browse the collection!",
    },
    {
        keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
        response:
            "You're welcome! 😊 Thank you for reaching out to Dr. Navi's Clinic. We're always here to help your furry friends. Have a wonderful day! 🐾",
    },
    {
        keywords: ["dog", "puppy"],
        response:
            "🐕 Dogs are wonderful companions! At Dr. Navi's, we provide complete canine care including vaccinations, dental care, surgery, nutrition counseling, and parasite prevention. What specific help does your dog need?",
    },
    {
        keywords: ["cat", "kitten"],
        response:
            "🐱 We love cats too! Our feline services include vaccinations, spaying/neutering, dental care, and nutrition advice. Cats are masters at hiding illness, so regular checkups are important. How can we help your cat?",
    },
];

const DEFAULT_RESPONSE =
    "I appreciate your question! While I may not have a specific answer for that, I'd recommend:\n\n• 📞 Call us at 93634 14845 for personalized assistance\n• 🏥 Visit our clinic at Kalapatti, Coimbatore\n• 💻 Browse our services on the website\n\nYou can also ask me about: appointments, services, vaccinations, surgery, timings, location, pet diet, or emergencies!";

function getBuiltInResponse(message: string): string {
    const lower = message.toLowerCase();
    // Score each response by how many keywords match
    let bestMatch: { response: string; score: number } = { response: DEFAULT_RESPONSE, score: 0 };

    for (const entry of CLINIC_RESPONSES) {
        const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
        if (score > bestMatch.score) {
            bestMatch = { response: entry.response, score };
        }
    }

    return bestMatch.response;
}

// ─── API Route Handler ──────────────────────────────────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const deepPavlovUrl = process.env.DEEPPAVLOV_URL;

        // If an external AI service URL is configured, try it first
        if (deepPavlovUrl) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const response = await fetch(deepPavlovUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: message }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    const answer = data.answer || data[0];
                    if (answer) {
                        return NextResponse.json({
                            answer: typeof answer === "string" ? answer : JSON.stringify(answer),
                        });
                    }
                }
                // If external fails, fall through to built-in
                console.warn("External AI service failed, using built-in responses");
            } catch {
                console.warn("External AI service unreachable, using built-in responses");
            }
        }

        // Built-in veterinary chatbot
        const answer = getBuiltInResponse(message);
        return NextResponse.json({ answer });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
