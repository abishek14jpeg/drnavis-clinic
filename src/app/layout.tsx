import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/session-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Navi's Veterinary Clinic | Expert Surgeon & Pet Care in Coimbatore",
  description: "Looking for a veterinary surgeon in Kalapatti? Dr. Navi's Clinic offers orthopedic surgery, vaccinations, and emergency care. Call 63814 14845.",
  keywords: ["veterinary surgeon in Kalapatti Coimbatore", "pet clinic near Nehru Nagar West", "dog vaccination schedule Coimbatore", "orthopedic veterinary doctor", "Dr Navaneethakrishnan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": "Dr. Navi's Veterinary Clinic",
    "description": "Expert Veterinary Surgeon & Pet Care in Coimbatore",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 13/5, Indira Nagar, Periyar Nagar, Nehru Nagar West, Kalapatti",
      "addressLocality": "Coimbatore",
      "postalCode": "641048",
      "addressCountry": "IN"
    },
    "telephone": "63814 14845",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "11.0500", // Approximate for Kalapatti, user should update exact
      "longitude": "77.0167"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      }
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
