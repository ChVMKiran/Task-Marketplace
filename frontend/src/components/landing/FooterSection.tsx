"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, ArrowRight, X, Globe, Link2, Mail, Camera } from "lucide-react";

// lucide-react in this project removed social brand icons — use closest equivalents
const Twitter = X;
const Github = Globe;
const Linkedin = Link2;
const Instagram = Camera;

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features",    href: "#features" },
      { label: "Pricing",     href: "#pricing" },
      { label: "Marketplace", href: "/tasks" },
      { label: "AI Insights", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",    href: "#" },
      { label: "Blog",     href: "#" },
      { label: "Careers",  href: "#" },
      { label: "Contact",  href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy",   href: "#" },
      { label: "Terms",     href: "#" },
      { label: "Cookies",   href: "#" },
      { label: "Licenses",  href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Github,    href: "#", label: "GitHub" },
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail,      href: "#", label: "Email" },
];

export default function FooterSection() {
  const pathname = usePathname();

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── CTA Section ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="gradient-divider mb-0" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
        <div className="absolute inset-0 mesh-gradient" />

        {/* Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] blob" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-neutral-200 rounded-full blur-[100px] blob blob-delay-1" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pre-heading */}
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 bg-neutral-100 border border-neutral-200 px-4 py-1.5 rounded-full mb-6">
              Get Started Today
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-6 tracking-tight leading-tight">
              Ready to{" "}
              <span className="gradient-text">unleash your talent?</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of college students already creating, competing, and earning on CampusCraft.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="btn-primary text-base px-10 py-4 flex items-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tasks"
                className="btn-secondary text-base px-10 py-4"
              >
                Browse Tasks
              </Link>
            </div>

            {/* Social proof numbers */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                { number: "45K+", label: "Students" },
                { number: "50+",  label: "Colleges" },
                { number: "₹23L+",label: "Paid Out" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl font-extrabold text-black">{item.number}</div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wider mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-neutral-200 bg-white backdrop-blur-sm">
        {/* Gradient top line */}
        <div className="gradient-divider" />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            {/* Brand column */}
            <div className="col-span-2">
              <Link href="/" onClick={handleBrandClick} className="inline-flex items-center gap-2.5 mb-5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center shadow-lg shadow-neutral-200 group-hover:shadow-neutral-200 transition-shadow">
                  <Zap className="w-4.5 h-4.5 text-black" />
                </div>
                <span className="text-lg font-bold text-black tracking-tight">
                  Campus<span className="text-neutral-900">Craft</span>
                </span>
              </Link>

              <p className="text-sm text-neutral-600 mb-6 max-w-xs leading-relaxed">
                The premium creative marketplace built for college students. Create, compete, earn.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-200 hover:bg-neutral-100 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-600 mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200 link-underlined"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="gradient-divider mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" onClick={handleBrandClick} className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors">
              © 2026 CampusCraft. All rights reserved.
            </Link>
            <p className="text-xs text-neutral-600">
              Made with ❤️ for college students across India
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
