"use client";
import { motion } from "framer-motion";
import { FileText, Upload, Trophy, CreditCard } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Post a Task",
    desc: "Describe your project, set a budget and deadline, and publish it to the marketplace.",
    color: "#8B5CF6",
    step: "01",
    label: "Post",
  },
  {
    icon: Upload,
    title: "Receive Submissions",
    desc: "Talented contributors browse and submit their creative work for your task.",
    color: "#6366F1",
    step: "02",
    label: "Receive",
  },
  {
    icon: Trophy,
    title: "Pick a Winner",
    desc: "Review, compare, and shortlist the best submissions. Select your winner.",
    color: "#F59E0B",
    step: "03",
    label: "Review",
  },
  {
    icon: CreditCard,
    title: "Payout & Close",
    desc: "The winner gets paid securely through the platform. Task complete!",
    color: "#10B981",
    step: "04",
    label: "Pay",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      <div className="gradient-divider mb-0" />

      {/* Background */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, rgba(13,14,26,0.6), rgba(17,19,42,0.4), transparent)'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-900/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-400 bg-violet-900/30 border border-violet-500/30 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
            Simple.{" "}
            <span className="gradient-text">Powerful.</span> Fast.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From posting a task to getting premium creative work — it takes just four steps.
          </p>
        </motion.div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px">
            <div className="h-full w-full bg-gradient-to-r from-violet-700 via-indigo-700 via-amber-700 to-emerald-700 opacity-40" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="relative"
            >
              <div className="glass-card shimmer rounded-2xl p-6 relative group text-left overflow-hidden">
                {/* Large step number watermark */}
                <div className="absolute top-3 right-4 text-5xl font-black select-none text-white/[0.04] leading-none">
                  {step.step}
                </div>

                {/* Step indicator + icon */}
                <div className="relative flex items-center gap-3 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shrink-0"
                    style={{
                      background: `${step.color}14`,
                      border: `1px solid ${step.color}28`,
                      boxShadow: `0 0 0 0 ${step.color}20`,
                    }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  {/* Step pill */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${step.color}14`,
                      color: step.color,
                      border: `1px solid ${step.color}28`,
                    }}
                  >
                    Step {step.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
