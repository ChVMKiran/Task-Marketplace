"use client";
import { motion } from "framer-motion";
import { FileText, Upload, Trophy, CreditCard } from "lucide-react";

const steps = [
  { icon: FileText, title: "Post a Task", desc: "Describe your project, set a budget and deadline, and publish it to the marketplace.", color: "#8B5CF6", step: "01" },
  { icon: Upload, title: "Receive Submissions", desc: "Talented contributors browse and submit their creative work for your task.", color: "#3B82F6", step: "02" },
  { icon: Trophy, title: "Pick a Winner", desc: "Review, compare, and shortlist the best submissions. Select your winner.", color: "#F59E0B", step: "03" },
  { icon: CreditCard, title: "Payout & Close", desc: "The winner gets paid securely through the platform. Task complete!", color: "#10B981", step: "04" },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-violet-400 font-medium uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Simple. <span className="gradient-text">Powerful.</span> Fast.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From posting a task to getting premium creative work — it takes just four steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-zinc-700 to-transparent" />
              )}
              <div className="glass-card rounded-2xl p-6 relative group">
                <div className="absolute top-4 right-4 text-4xl font-black text-white/[0.03] select-none">{step.step}</div>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-lg"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}25`, boxShadow: `0 0 20px ${step.color}10` }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
