"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, Globe, ExternalLink, Hash, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <>
      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Ready to <span className="gradient-text">unleash your talent?</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
              Join thousands of college students already creating, competing, and earning on CampusCraft.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 group shadow-lg shadow-violet-500/20">
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/tasks" className="btn-secondary text-base px-8 py-3.5">Browse Tasks</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Campus<span className="text-violet-400">Craft</span></span>
              </Link>
              <p className="text-sm text-zinc-500 mb-4 max-w-xs">The premium creative marketplace built for college students. Create, compete, earn.</p>
              <div className="flex items-center gap-3">
                {[Hash, Globe, ExternalLink, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Marketplace", "AI Insights"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600">© 2026 CampusCraft. All rights reserved.</p>
            <p className="text-xs text-zinc-600">Made with ❤️ for college students across India</p>
          </div>
        </div>
      </footer>
    </>
  );
}
