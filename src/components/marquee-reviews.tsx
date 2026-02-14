"use client";

const reviews = [
    { name: "Tina Suriya", text: "Dr. Navaneetha Krishnan... a constant source of inspiration." },
    { name: "Kasvith", text: "Well-organized and Clean... calming environment." },
    { name: "Saranya K", text: "Precise diagnosis... reasonably priced." },
    { name: "Hema", text: "He treated my lab... extensive knowledge." },
];

export function MarqueeReviews() {
    return (
        <div className="w-full py-12 overflow-hidden bg-primary/5 border-y border-primary/10">
            <div className="flex w-full">
                <div className="marquee-track">
                    {[...reviews, ...reviews].map((review, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-background/50 border border-border backdrop-blur-md shadow-sm"
                        >
                            <p className="text-lg font-medium italic mb-4 whitespace-normal">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-accent" />
                                <span className="text-sm font-bold text-muted-foreground">{review.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .marquee-track {
                    display: flex;
                    gap: 2rem;
                    animation: marquee-scroll 30s linear infinite;
                    will-change: transform;
                }
                @keyframes marquee-scroll {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
