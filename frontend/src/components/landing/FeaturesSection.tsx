"use client";
import { motion } from "framer-motion";
import {
  Palette, Code2, Film, PenTool, Camera, Share2,
  BarChart3, Sparkles, Shield, Zap, Trophy, Wallet,
} from "lucide-react";

const features = [
  { icon: Palette, title: "Creative Contests",  desc: "Post design tasks and receive stunning submissions from campus talent.",                   color: "#000000", bg: "from-neutral-200 to-neutral-100" },
  { icon: Code2,   title: "Dev Challenges",     desc: "Find skilled developers for websites, apps, dashboards, and more.",                        color: "#000000", bg: "from-neutral-200 to-neutral-100" },
  { icon: Trophy,  title: "Winner Selection",   desc: "Review, compare, and shortlist submissions. Pick the perfect winner.",                      color: "#000000", bg: "from-neutral-200 to-neutral-100" },
  { icon: Wallet,  title: "Secure Payouts",     desc: "Wallet-based payments with admin-verified payouts. Safe and transparent.",                  color: "#000000", bg: "from-neutral-200 to-neutral-100" },
  { icon: Shield,  title: "Verified Profiles",  desc: "College-verified accounts with ratings, portfolio, and track record.",                      color: "#000000", bg: "from-neutral-200 to-neutral-100" },
  { icon: Sparkles,title: "AI Insights",        desc: "Smart task recommendations and contributor analytics powered by AI.",                        color: "#000000", bg: "from-neutral-200 to-neutral-100" },
];

const categories = [
  { icon: Palette,  label: "Graphic Design", count: 342 },
  { icon: Code2,    label: "Web Dev",        count: 218 },
  { icon: Film,     label: "Video",          count: 156 },
  { icon: PenTool,  label: "Writing",        count: 189 },
  { icon: Camera,   label: "Photo",          count: 94  },
  { icon: Share2,   label: "Social Media",   count: 127 },
  { icon: BarChart3,label: "Data",           count: 73  },
  { icon: Zap,      label: "UI/UX",          count: 201 },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle top divider */}
      <div className="gradient-divider mb-0" />

      <div className="absolute inset-0 mesh-gradient opacity-60" />
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 bg-neutral-100 border border-neutral-200 px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-4 tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">create &amp; earn</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A complete marketplace platform designed specifically for the college ecosystem.
          </p>
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="glass-card shimmer rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Radial hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none bg-[radial-gradient(circle_at_top_left,var(--theme-black)_0%,transparent_65%)]"
              />

              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-black/5 border border-black/10"
              >
                <feature.icon className="w-5.5 h-5.5 transition-colors text-black" />
              </div>

              <h3 className="relative text-base font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="relative text-sm text-neutral-600 leading-relaxed">
                {feature.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl bg-black/20"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Categories ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-3 tracking-tight">
            Browse by Category
          </h3>
          <p className="text-neutral-600">
            Find tasks that match your skills and interests
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              whileTap={{ scale: 0.97 }}
              className="glass-card shimmer rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-100 transition-colors shrink-0">
                <cat.icon className="w-4.5 h-4.5 text-neutral-900" />
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  {cat.label}
                </div>
                <div className="text-xs text-neutral-600">{cat.count} tasks</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
