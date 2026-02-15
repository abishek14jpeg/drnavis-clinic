import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

/* ─── SVG Icons ─── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://instagram.com/drnavisclinic",
    label: "Follow us on Instagram",
    icon: InstagramIcon,
    hoverColor: "hover:text-pink-500",
  },
  {
    href: "https://api.whatsapp.com/send?phone=919363414845",
    label: "Chat on WhatsApp",
    icon: WhatsAppIcon,
    hoverColor: "hover:text-green-500",
  },
  {
    href: "https://www.google.com/maps/place/Dr.+Navi's+Veterinary+Clinic",
    label: "Find us on Google Maps",
    icon: GoogleIcon,
    hoverColor: "hover:text-red-500",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Dr. Navi" },
  { href: "/#services", label: "Our Services" },
  { href: "/#faq", label: "FAQs" },
  { href: "/login", label: "Patient Portal" },
  { href: "/register", label: "Register" },
];

const serviceLinks = [
  { href: "/#services", label: "Orthopedic Surgery" },
  { href: "/#services", label: "Vaccinations" },
  { href: "/#services", label: "Emergency Care" },
  { href: "/#services", label: "Dental Cleaning" },
  { href: "/#services", label: "Pet Boutique" },
  { href: "/#services", label: "Lab Diagnostics" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800" role="contentinfo">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand + Social */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="Dr. Navi's Veterinary Clinic - Home">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                DN
              </div>
              <div>
                <span className="font-bold font-heading text-lg block leading-tight">Dr. Navi&apos;s</span>
                <span className="text-xs text-slate-400">Veterinary Clinic</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Expert veterinary surgeon providing compassionate pet care in Kalapatti, Coimbatore. Orthopedic surgery, vaccinations &amp; emergency care.
            </p>
            {/* Social Media Links with Logos */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-300 ${social.hoverColor} hover:bg-white/20 transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Quick Links</h3>
            <nav aria-label="Footer quick links">
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Our Services</h3>
            <nav aria-label="Footer services links">
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Contact Us</h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  No 13/5, Indira Nagar, Periyar Nagar,<br />
                  Nehru Nagar West, Kalapatti,<br />
                  Coimbatore - 641048
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-sm text-slate-400">
                  <a href="tel:+919363414845" className="hover:text-white transition-colors block">93634 14845</a>
                  <a href="tel:+917598557063" className="hover:text-white transition-colors block">75985 57063</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  Mon–Sun (except Wed): 10 AM – 1 PM &amp; 6 PM – 9 PM<br />
                  Wednesday: 6 PM – 9 PM only<br />
                  <span className="text-xs text-green-400">House calls available</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:drnavisclinic@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  drnavisclinic@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="w-full h-[300px] border-t border-slate-800 bg-slate-800/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d77.0167!3d11.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzAwLjAiTiA3N8KwMDEnMDAuMiJF!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dr. Navi's Veterinary Clinic Location - Kalapatti, Coimbatore"
          className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
        />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Dr. Navi&apos;s Veterinary Clinic. All rights reserved. | TNSVC Reg. #6862
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-slate-500 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
