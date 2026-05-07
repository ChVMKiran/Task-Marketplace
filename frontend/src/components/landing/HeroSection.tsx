"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star, TrendingUp, Users, CheckCircle } from "lucide-react";
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

const stats = [
  { icon: Users,      value: 45000, suffix: "+",  label: "Students" },
  { icon: TrendingUp, value: 12800, suffix: "+",  label: "Tasks Completed" },
  { icon: Star,       value: 23,    suffix: "L+", label: "Paid Out" },
  { icon: Sparkles,   value: 50,    suffix: "+",  label: "Colleges" },
];

const trustBadges = [
  "No hidden fees",
  "College-verified profiles",
  "Secure payments",
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const dashboardY = useTransform(scrollY, [0, 600], [0, 60]);
  const dashboardOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated blobs */}
      <div className="absolute top-[10%] left-[8%] w-72 h-72 bg-violet-600/20 rounded-full blur-[80px] blob" />
      <div className="absolute top-[20%] right-[6%] w-80 h-80 bg-indigo-600/15 rounded-full blur-[90px] blob blob-delay-1" />
      <div className="absolute bottom-[15%] left-[20%] w-96 h-96 bg-violet-500/12 rounded-full blur-[100px] blob blob-delay-2" />
      <div className="absolute bottom-[10%] right-[15%] w-64 h-64 bg-blue-600/12 rounded-full blur-[80px] blob" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-5xl mx-auto">

          {/* ── Announcement Badge ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-violet-900/40
                       border border-violet-500/30
                       text-violet-300 text-sm font-medium mb-8
                       shadow-lg shadow-violet-900/20
                       backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            Now live for 50+ colleges across India
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-white">Where Campus</span>
            <br />
            <span className="gradient-text">Talent Meets</span>
            <br />
            <span className="text-white">Opportunity</span>
          </motion.h1>

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The premium creative marketplace built for college students.
            Post tasks, submit stunning work, win contests, and build your portfolio — all in one place.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href="/auth/signup"
              className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 group"
            >
              <span>Start Creating Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-violet-500/15 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors">
                <Play className="w-3.5 h-3.5 text-violet-400 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* ── Trust Badges ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-16"
          >
            {trustBadges.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400" />
                {b}
              </span>
            ))}
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl px-4 py-5 text-center group hover:glow-violet transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Dashboard Preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: dashboardY, opacity: dashboardOpacity }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Glow behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-indigo-600/15 to-blue-600/15 rounded-3xl blur-2xl" />

            {/* Dashboard mockup */}
            <div className="relative glass rounded-3xl p-1.5 shadow-2xl shadow-violet-900/40 glow-violet-pulse overflow-hidden border border-violet-500/20">
              <div className="bg-slate-900/95 rounded-2xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-400">
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      campuscraft.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Active Tasks",    value: "24",        change: "+12%", color: "violet" },
                    { label: "Total Earnings",  value: "₹1,25,000", change: "+28%", color: "indigo" },
                    { label: "Win Rate",        value: "68%",       change: "+5%",  color: "emerald" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 + i * 0.1 }}
                      className="rounded-xl p-4 border border-slate-700/50 bg-slate-800/50"
                    >
                      <div className="text-xs text-slate-400 mb-1.5">{card.label}</div>
                      <div className="text-2xl font-bold text-white">{card.value}</div>
                      <div className="text-xs text-emerald-400 mt-1 font-medium">{card.change} this month</div>
                    </motion.div>
                  ))}
                </div>

                {/* Task list */}
                <div className="px-5 pb-5">
                  <div className="rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">Recent Tasks</span>
                      <span className="text-xs text-violet-400 font-medium cursor-pointer hover:text-violet-300">View all →</span>
                    </div>
                    {["Design Event Poster — TechFest", "Build Portfolio Website", "Create Instagram Reels"].map((task, i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between border-b border-slate-700/30 last:border-0 bg-slate-900/50 hover:bg-violet-900/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-emerald-400" : i === 1 ? "bg-violet-400" : "bg-amber-400"}`} />
                          <span className="text-sm text-slate-300">{task}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">₹{(5 + i * 2.5).toFixed(1)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -left-14 top-1/4 glass-card rounded-2xl p-4 w-52 shadow-xl shadow-violet-900/30 border border-violet-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">New Submission</div>
                  <div className="text-xs text-slate-500">2 min ago</div>
                </div>
              </div>
              <div className="text-xs text-slate-400">Arjun submitted work for <span className="text-violet-400 font-medium">TechFest Poster</span></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:block absolute -right-14 top-1/3 glass-card rounded-2xl p-4 w-48 shadow-xl shadow-violet-900/30 border border-violet-500/20"
            >
              <div className="text-lg mb-1">🎉</div>
              <div className="text-xs text-slate-400 mb-1">Winner Selected!</div>
              <div className="text-sm font-bold text-white">₹8,000 Earned</div>
              <div className="text-xs text-emerald-400 font-medium mt-1">Portfolio Website</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
