import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Dr. Navi | Veterinary Surgeon & Radiologist in Coimbatore",
    description:
        "Meet Dr. S. Navaneethakrishnan (M.V.Sc), a specialized veterinary surgeon in Kalapatti with a focus on orthopedics and radiology.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
