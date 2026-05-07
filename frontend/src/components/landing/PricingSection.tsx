"use client";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for getting started",
    features: ["5 task submissions/month", "Basic profile", "Community access", "Email notifications", "Standard support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "For serious contributors",
    features: ["Unlimited submissions", "Verified badge", "Priority task access", "AI recommendations", "Portfolio showcase", "Advanced analytics", "Priority support"],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Campus",
    price: "₹999",
    period: "/month",
    desc: "For college clubs & orgs",
    features: ["Everything in Pro", "Team workspace", "Bulk task posting", "Custom categories", "Department visibility", "Admin dashboard", "Dedicated support", "API access"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm text-violet-400 font-medium uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Start free, <span className="gradient-text">scale as you grow</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Simple, transparent pricing. No hidden fees.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-6 ${plan.popular ? "gradient-border glass-card glow-purple" : "glass-card"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-medium">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-zinc-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className={`block text-center text-sm py-2.5 rounded-xl font-medium transition-all ${
                  plan.popular ? "btn-primary w-full" : "btn-secondary w-full"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
