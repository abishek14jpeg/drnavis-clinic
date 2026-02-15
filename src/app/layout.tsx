import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/session-provider";

const BASE_URL = "https://drnavisclinic.com";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0070f3",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dr. Navi's Veterinary Clinic | Expert Surgeon & Pet Care in Coimbatore",
    template: "%s | Dr. Navi's Veterinary Clinic",
  },
  description:
    "Looking for a veterinary surgeon in Kalapatti, Coimbatore? Dr. Navi's Clinic offers orthopedic surgery, vaccinations, dental care, emergency services & pet boutique. 5.0★ rated. Call 63814 14845.",
  keywords: [
    "veterinary surgeon Kalapatti Coimbatore",
    "pet clinic near Nehru Nagar West",
    "dog vaccination schedule Coimbatore",
    "cat vaccination Coimbatore",
    "orthopedic veterinary doctor Coimbatore",
    "Dr Navaneethakrishnan veterinary",
    "best vet clinic Coimbatore",
    "pet emergency care Coimbatore",
    "animal hospital Kalapatti",
    "dog surgery Coimbatore",
    "pet dental care Coimbatore",
    "veterinary radiology Coimbatore",
    "pet boutique Coimbatore",
    "24/7 emergency vet Coimbatore",
    "spaying neutering Coimbatore",
  ],
  authors: [{ name: "Dr. S. Navaneethakrishnan", url: BASE_URL }],
  creator: "Dr. Navi's Veterinary Clinic",
  publisher: "Dr. Navi's Veterinary Clinic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Dr. Navi's Veterinary Clinic",
    title: "Dr. Navi's Veterinary Clinic | Expert Surgeon & Pet Care in Coimbatore",
    description:
      "Expert veterinary surgeon in Kalapatti, Coimbatore. Orthopedic surgery, vaccinations, dental care, emergency services. 5.0★ Google rated with 361+ reviews.",
    images: [
      {
        url: "/dr-navi.png",
        width: 800,
        height: 600,
        alt: "Dr. S. Navaneethakrishnan - Veterinary Surgeon at Dr. Navi's Clinic, Coimbatore",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Navi's Veterinary Clinic | Expert Pet Care in Coimbatore",
    description:
      "Expert vet surgeon in Kalapatti. Orthopedic surgery, vaccinations, emergency care. 5.0★ rated. Call 63814 14845.",
    images: ["/dr-navi.png"],
  },
  manifest: "/manifest.json",
  category: "Veterinary",
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "11.0500;77.0167",
    "ICBM": "11.0500, 77.0167",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Dr. Navi's Veterinary Clinic",
    description:
      "Expert Veterinary Surgeon & Pet Care in Kalapatti, Coimbatore. Specializing in orthopedic surgery, vaccinations, dental care, and 24/7 emergency services.",
    url: BASE_URL,
    logo: `${BASE_URL}/dr-navi.png`,
    image: `${BASE_URL}/dr-navi.png`,
    telephone: ["+916381414845", "+917598557063"],
    email: "drnavisclinic@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "No 13/5, Indira Nagar, Periyar Nagar, Nehru Nagar West, Kalapatti",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641048",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.0500",
      longitude: "77.0167",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "361",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://instagram.com/drnavisclinic",
      "https://www.google.com/maps/place/Dr.+Navi's+Veterinary+Clinic",
    ],
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Coimbatore" },
      { "@type": "Place", name: "Kalapatti" },
      { "@type": "Place", name: "Peelamedu" },
      { "@type": "Place", name: "Saravanampatti" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Veterinary Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Orthopedic Surgery" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vaccinations" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Care 24/7" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Care" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Radiology & Diagnostics" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spaying & Neutering" } },
      ],
    },
    founder: {
      "@type": "Person",
      name: "Dr. S. Navaneethakrishnan",
      jobTitle: "Veterinary Surgeon",
      description: "M.V.Sc in Veterinary Surgery & Radiology, TNSVC Reg. #6862",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the consulting hours at Dr. Navi's Veterinary Clinic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are open Monday to Sunday, 9:00 AM to 9:00 PM. Emergency care is available 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an appointment to visit Dr. Navi's Clinic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we recommend booking a slot to avoid long wait times. Emergency cases are prioritized immediately.",
        },
      },
      {
        "@type": "Question",
        name: "What is the dog vaccination schedule at Dr. Navi's Clinic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "6-8 Weeks: Distemper, Parvo (DHPP). 10-12 Weeks: DHPP + Leptospirosis. 14-16 Weeks: DHPP + Rabies. 1 Year: DHPP + Rabies Booster.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cat vaccination schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "6-8 Weeks: FVRCP (Distemper). 10-12 Weeks: FVRCP + FeLV. 14-16 Weeks: FVRCP + Rabies. 1 Year: Boosters.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Dr. Navi's Clinic offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer orthopedic surgery, soft tissue surgery, vaccinations, dental cleaning, deworming, microchipping, lab diagnostics, emergency care 24/7, home visits, and a pet boutique.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Dr. Navi's Veterinary Clinic located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are located at No 13/5, Indira Nagar, Periyar Nagar, Nehru Nagar West, Kalapatti, Coimbatore - 641048. Near Grace and Bakes.",
        },
      },
    ],
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
