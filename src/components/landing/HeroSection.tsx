"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now live for 50+ colleges across India</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-white">Where Campus</span>
            <br />
            <span className="gradient-text">Talent Meets</span>
            <br />
            <span className="text-white">Opportunity</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The premium creative marketplace built for college students.
            Post tasks, submit stunning work, win contests, and build your portfolio — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/auth/signup"
              className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 group shadow-lg shadow-violet-500/20"
            >
              Start Creating Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2 group">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, value: 45000, suffix: "+", label: "Students" },
              { icon: TrendingUp, value: 12800, suffix: "+", label: "Tasks Completed" },
              { icon: Star, value: 23, suffix: "L+", label: "Paid Out" },
              { icon: Sparkles, value: 50, suffix: "+", label: "Colleges" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon className="w-4 h-4 text-violet-400" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating UI cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Dashboard mockup */}
            <div className="glass rounded-2xl p-1 shadow-2xl shadow-black/50 glow-purple overflow-hidden">
              <div className="bg-zinc-900/80 rounded-xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center text-xs text-zinc-500">campuscraft.io/dashboard</div>
                </div>

                {/* Dashboard content mockup */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stat cards */}
                  {[
                    { label: "Active Tasks", value: "24", change: "+12%", color: "violet" },
                    { label: "Total Earnings", value: "₹1,25,000", change: "+28%", color: "blue" },
                    { label: "Win Rate", value: "68%", change: "+5%", color: "emerald" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="glass-card rounded-xl p-4"
                    >
                      <div className="text-xs text-zinc-500 mb-2">{card.label}</div>
                      <div className="text-2xl font-bold text-white">{card.value}</div>
                      <div className="text-xs text-emerald-400 mt-1">{card.change} this month</div>
                    </motion.div>
                  ))}
                </div>

                {/* Task list mockup */}
                <div className="px-6 pb-6">
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Recent Tasks</span>
                      <span className="text-xs text-violet-400">View all</span>
                    </div>
                    {["Design Event Poster — TechFest", "Build Portfolio Website", "Create Instagram Reels"].map((task, i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-emerald-400" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`} />
                          <span className="text-sm text-zinc-300">{task}</span>
                        </div>
                        <span className="text-xs text-zinc-500">₹{(5 + i * 2.5).toFixed(1)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating side cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -left-12 top-1/4 glass-card rounded-xl p-3 w-48 shadow-xl"
            >
              <div className="text-xs text-zinc-500 mb-1">New Submission</div>
              <div className="text-sm text-white font-medium">Arjun submitted work</div>
              <div className="text-xs text-violet-400 mt-1">2 min ago</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:block absolute -right-12 top-1/3 glass-card rounded-xl p-3 w-44 shadow-xl"
            >
              <div className="text-xs text-zinc-500 mb-1">Winner Selected! 🎉</div>
              <div className="text-sm text-white font-medium">₹8,000 Earned</div>
              <div className="text-xs text-emerald-400 mt-1">Portfolio Website</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
