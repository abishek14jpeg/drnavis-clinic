import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Dr. Navi | Veterinary Surgeon & Radiologist in Coimbatore",
    description:
        "Meet Dr. S. Navaneethakrishnan (M.V.Sc), a specialized veterinary surgeon in Kalapatti, Coimbatore. Expert in orthopedic surgery, radiology, and compassionate pet care. TNSVC Reg. #6862.",
    keywords: [
        "Dr Navaneethakrishnan",
        "veterinary surgeon Coimbatore",
        "M.V.Sc surgery radiology",
        "pet doctor Kalapatti",
        "orthopedic vet specialist",
    ],
    alternates: {
        canonical: "https://drnavisclinic.com/about",
    },
    openGraph: {
        title: "About Dr. Navi | Veterinary Surgeon & Radiologist in Coimbatore",
        description:
            "Meet Dr. S. Navaneethakrishnan (M.V.Sc), expert veterinary surgeon in Kalapatti. Orthopedic surgery, radiology, and compassionate pet care.",
        url: "https://drnavisclinic.com/about",
        images: [
            {
                url: "/dr-navi.png",
                width: 800,
                height: 600,
                alt: "Dr. S. Navaneethakrishnan - Veterinary Surgeon at Dr. Navi's Clinic",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Dr. Navi | Veterinary Surgeon in Coimbatore",
        description:
            "Meet Dr. S. Navaneethakrishnan, M.V.Sc - Expert veterinary surgeon in Kalapatti, Coimbatore.",
        images: ["/dr-navi.png"],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
