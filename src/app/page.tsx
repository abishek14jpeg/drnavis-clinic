import { Hero3D } from "@/components/hero-3d";
import { ServicesBento } from "@/components/services-bento";
import { MarqueeReviews } from "@/components/marquee-reviews";
import { FAQAccordion } from "@/components/faq-accordion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              DN
            </div>
            <span className="font-bold font-heading text-lg">Dr. Navi&apos;s Clinic</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <Hero3D />
      <ServicesBento />
      <MarqueeReviews />
      <FAQAccordion />

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Dr. Navi&apos;s Veterinary Clinic. All rights reserved.</p>
        <p className="mt-2">No 13/5, Indira Nagar, Kalapatti, Coimbatore</p>
      </footer>
    </main>
  );
}
