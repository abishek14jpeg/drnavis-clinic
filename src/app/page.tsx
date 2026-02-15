import { Hero3D } from "@/components/hero-3d";
import { ServicesBento } from "@/components/services-bento";
import { MarqueeReviews } from "@/components/marquee-reviews";
import { FAQAccordion } from "@/components/faq-accordion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SocialFloat } from "@/components/social-float";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background relative overflow-x-hidden">
      <Navbar />

      <Hero3D />

      {/* Trust Strip – SEO keyword-rich section */}
      <section className="py-8 bg-primary/5 border-y border-primary/10" aria-label="Clinic highlights">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-primary">5.0★</span>
            <span className="text-sm text-muted-foreground">Google Rating</span>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-foreground">361+</span>
            <span className="text-sm text-muted-foreground">Happy Pet Parents</span>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-foreground">🏠</span>
            <span className="text-sm text-muted-foreground">House Calls Available</span>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-foreground">TNSVC</span>
            <span className="text-sm text-muted-foreground">Reg. #6862</span>
          </div>
        </div>
      </section>

      <ServicesBento />
      <MarqueeReviews />

      {/* Why Choose Us – Internal linking + keyword optimization */}
      <section className="container py-24 max-w-5xl mx-auto" aria-labelledby="why-choose-heading">
        <div className="text-center mb-12">
          <h2 id="why-choose-heading" className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Dr. Navi&apos;s Clinic?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Coimbatore&apos;s trusted veterinary clinic for expert pet care, advanced diagnostics, and compassionate treatment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-6 pb-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🏥</span>
            </div>
            <h3 className="text-lg font-bold font-heading mb-2">Advanced Surgical Suite</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              State-of-the-art operating theater for orthopedic fracture repair, soft tissue surgery, and emergency procedures.
            </p>
            <Link href="/about" className="text-sm text-primary font-medium mt-3 inline-block hover:underline">
              Meet Dr. Navi &rarr;
            </Link>
          </article>
          <article className="p-6 pb-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🐾</span>
            </div>
            <h3 className="text-lg font-bold font-heading mb-2">Fear-Free Environment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every pet is treated with patience and gentle hands. We use calming techniques to create a stress-free experience.
            </p>
            <Link href="/#services" className="text-sm text-primary font-medium mt-3 inline-block hover:underline">
              View Services &rarr;
            </Link>
          </article>
          <article className="p-6 pb-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-lg font-bold font-heading mb-2">House Call Service</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Can&apos;t visit the clinic? Book a house call for convenient veterinary care at your doorstep, available outside clinic hours.
            </p>
            <a href="https://api.whatsapp.com/send?phone=919363414845" target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 font-medium mt-3 inline-block hover:underline">
              WhatsApp Us &rarr;
            </a>
          </article>
        </div>
      </section>

      <FAQAccordion />

      {/* CTA Banner – Engagement + Social Integration */}
      <section className="container py-16 max-w-4xl mx-auto" aria-label="Call to action">
        <div className="text-center p-10 md:p-16 rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,112,243,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,180,216,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Give Your Pet the Best Care?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Book a consultation today or reach us instantly on WhatsApp. Your pet deserves Coimbatore&apos;s finest veterinary care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Book Consultation
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=919363414845"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green-500 text-white font-semibold text-base hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SocialFloat />
    </main>
  );
}
