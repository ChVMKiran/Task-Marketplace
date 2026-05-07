"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Zap, ChevronRight } from "lucide-react";

const links = [
  { label: "Features",     href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* ── scroll + active section detection ── */
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const OFFSET = 130; // navbar height + buffer

    const detect = () => {
      setScrolled(window.scrollY > 24);

      // Walk sections bottom-to-top and pick the first whose top edge
      // has scrolled past the offset threshold
      let found = "";
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= OFFSET) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };

    detect(); // run once on mount
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  /* ── smooth scroll for anchor links ── */
  const smoothScroll = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-xl shadow-violet-950/40 border-b border-violet-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-shadow duration-300"
          >
            <Zap className="w-4.5 h-4.5 text-white" />
          </motion.div>
          <span className="text-lg font-bold tracking-tight text-white">
            Campus<span className="text-violet-400">Craft</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <button
                key={l.label}
                onClick={() => smoothScroll(l.href)}
                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-violet-300 bg-violet-500/10"
                    : "text-slate-300 hover:text-violet-300 hover:bg-violet-500/8"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-violet-400"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-300 hover:text-violet-300 px-4 py-2 transition-colors duration-200"
          >
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm flex items-center gap-1.5 group"
            >
              <span>Get Started</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 bg-violet-900/20 border border-violet-500/20 transition-all hover:bg-violet-900/40"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-strong border-t border-violet-500/20 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => smoothScroll(l.href)}
                  className="text-sm font-medium text-slate-300 hover:text-violet-300 py-2.5 px-3 rounded-lg hover:bg-violet-900/20 transition-all text-left"
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="flex gap-3 pt-4 mt-2 border-t border-violet-500/20">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-sm flex-1 text-center"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-sm flex-1 text-center"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
