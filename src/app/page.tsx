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
      <section className="py-12 bg-primary/5 border-y border-primary/10" aria-label="Clinic highlights">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold font-heading text-primary">5.0★</span>
            <span className="text-sm font-medium text-muted-foreground text-left leading-tight">Google<br />Rating</span>
          </div>
          <div className="w-px h-10 bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold font-heading text-foreground">360+</span>
            <span className="text-sm font-medium text-muted-foreground text-left leading-tight">Happy<br />Pets</span>
          </div>
          <div className="w-px h-10 bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold font-heading text-foreground">🏠</span>
            <span className="text-sm font-medium text-muted-foreground text-left leading-tight">House Calls<br />Available</span>
          </div>
          <div className="w-px h-10 bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold font-heading text-foreground">TNSVC</span>
            <span className="text-sm font-medium text-muted-foreground text-left leading-tight">Reg.<br />#6862</span>
          </div>
        </div>
      </section>

      <ServicesBento />
      <MarqueeReviews />

      {/* Why Choose Us – Internal linking + keyword optimization */}
      <section className="py-16 md:py-20 bg-background" aria-labelledby="why-choose-heading">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 id="why-choose-heading" className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4 text-foreground">
              Why Choose <span className="text-gradient-brand pb-1">Dr. Navi&apos;s Clinic?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Coimbatore&apos;s trusted veterinary clinic for expert pet care, advanced diagnostics, and compassionate treatment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="p-8 pb-10 rounded-3xl border border-border bg-card hover:shadow-xl transition-all hover:scale-[1.02] group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Advanced Surgical Suite</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                State-of-the-art operating theater for orthopedic fracture repair, soft tissue surgery, and emergency procedures.
              </p>
              <Link href="/about" className="text-sm text-primary font-bold mt-auto inline-flex items-center gap-1 hover:gap-2 transition-all">
                Meet Dr. Navi &rarr;
              </Link>
            </article>
            <article className="p-8 pb-10 rounded-3xl border border-border bg-card hover:shadow-xl transition-all hover:scale-[1.02] group">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Fear-Free Environment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every pet is treated with patience and gentle hands. We use calming techniques to create a stress-free experience.
              </p>
              <Link href="/#services" className="text-sm text-primary font-bold mt-auto inline-flex items-center gap-1 hover:gap-2 transition-all">
                View Services &rarr;
              </Link>
            </article>
            <article className="p-8 pb-10 rounded-3xl border border-border bg-card hover:shadow-xl transition-all hover:scale-[1.02] group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">House Call Service</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Can&apos;t visit the clinic? Book a house call for convenient veterinary care at your doorstep, available outside clinic hours.
              </p>
              <a href="https://api.whatsapp.com/send?phone=919363414845" target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 font-bold mt-auto inline-flex items-center gap-1 hover:gap-2 transition-all">
                WhatsApp Us &rarr;
              </a>
            </article>
          </div>
        </div>
      </section>

      <FAQAccordion />

      {/* CTA Banner – Engagement + Social Integration */}
      <section className="py-16 md:py-24 bg-background" aria-label="Call to action">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center p-10 md:p-20 rounded-[2.5rem] bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(theme('colors.primary.DEFAULT'),0.2),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(theme('colors.secondary.DEFAULT'),0.2),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
                Ready to Give Your Pet the Best Care?
              </h2>
              <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
                Book a consultation today or reach us instantly on WhatsApp. Your pet deserves Coimbatore&apos;s finest veterinary care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20"
                >
                  Book Consultation
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=919363414845"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-xl shadow-green-500/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SocialFloat />
    </main>
  );
}
