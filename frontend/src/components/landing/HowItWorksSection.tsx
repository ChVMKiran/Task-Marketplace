"use client";
import { motion } from "framer-motion";
import { FileText, Upload, Trophy, CreditCard } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Post a Task",
    desc: "Describe your project, set a budget and deadline, and publish it to the marketplace.",
    color: "#000000",
    step: "01",
    label: "Post",
  },
  {
    icon: Upload,
    title: "Receive Submissions",
    desc: "Talented contributors browse and submit their creative work for your task.",
    color: "#000000",
    step: "02",
    label: "Receive",
  },
  {
    icon: Trophy,
    title: "Pick a Winner",
    desc: "Review, compare, and shortlist the best submissions. Select your winner.",
    color: "#000000",
    step: "03",
    label: "Review",
  },
  {
    icon: CreditCard,
    title: "Payout & Close",
    desc: "The winner gets paid securely through the platform. Task complete!",
    color: "#000000",
    step: "04",
    label: "Pay",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      <div className="gradient-divider mb-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-200/50 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 bg-neutral-100 border border-neutral-200 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-4 tracking-tight">
            Simple.{" "}
            <span className="gradient-text">Powerful.</span> Fast.
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
            From posting a task to getting premium creative work — it takes just four steps.
          </p>
        </motion.div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px">
            <div className="h-full w-full bg-gradient-to-r from-neutral-200 via-neutral-300 via-neutral-200 to-neutral-300 opacity-40" />
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
              <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 relative group text-left overflow-hidden">
                {/* Large step number watermark */}
                <div className="absolute top-3 right-4 text-5xl font-black select-none text-black/[0.04] leading-none">
                  {step.step}
                </div>

                {/* Step indicator + icon */}
                <div className="relative flex items-center gap-3 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shrink-0 bg-black/5 border border-black/10"
                  >
                    <step.icon className="w-6 h-6 text-black" />
                  </div>
                  {/* Step pill */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/5 text-black border border-black/10"
                  >
                    Step {step.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl bg-black/20"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
