"use client";
import { motion } from "framer-motion";
import { Palette, Code2, Film, PenTool, Camera, Share2, BarChart3, Sparkles, Shield, Zap, Trophy, Wallet } from "lucide-react";

const features = [
  { icon: Palette, title: "Creative Contests", desc: "Post design tasks and receive stunning submissions from campus talent.", color: "#8B5CF6" },
  { icon: Code2, title: "Dev Challenges", desc: "Find skilled developers for websites, apps, dashboards, and more.", color: "#3B82F6" },
  { icon: Trophy, title: "Winner Selection", desc: "Review, compare, and shortlist submissions. Pick the perfect winner.", color: "#F59E0B" },
  { icon: Wallet, title: "Secure Payouts", desc: "Wallet-based payments with admin-verified payouts. Safe and transparent.", color: "#10B981" },
  { icon: Shield, title: "Verified Profiles", desc: "College-verified accounts with ratings, portfolio, and track record.", color: "#EC4899" },
  { icon: Sparkles, title: "AI Insights", desc: "Smart task recommendations and contributor analytics powered by AI.", color: "#06B6D4" },
];

const categories = [
  { icon: Palette, label: "Graphic Design", count: 342 },
  { icon: Code2, label: "Web Dev", count: 218 },
  { icon: Film, label: "Video", count: 156 },
  { icon: PenTool, label: "Writing", count: 189 },
  { icon: Camera, label: "Photo", count: 94 },
  { icon: Share2, label: "Social Media", count: 127 },
  { icon: BarChart3, label: "Data", count: 73 },
  { icon: Zap, label: "UI/UX", count: 201 },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-violet-400 font-medium uppercase tracking-wider">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Everything you need to <span className="gradient-text">create & earn</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A complete marketplace platform designed specifically for the college ecosystem.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Browse by Category</h3>
          <p className="text-zinc-400">Find tasks that match your skills and interests</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card rounded-xl p-4 flex items-center gap-3 cursor-pointer"
            >
              <cat.icon className="w-5 h-5 text-violet-400 shrink-0" />
              <div>
                <div className="text-sm font-medium text-white">{cat.label}</div>
                <div className="text-xs text-zinc-500">{cat.count} tasks</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
