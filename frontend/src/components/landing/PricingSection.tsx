"use client";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for getting started",
    features: [
      "5 task submissions/month",
      "Basic profile",
      "Community access",
      "Email notifications",
      "Standard support",
    ],
    cta: "Get Started",
    popular: false,
    accent: "#000000",
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "For serious contributors",
    features: [
      "Unlimited submissions",
      "Verified badge",
      "Priority task access",
      "AI recommendations",
      "Portfolio showcase",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
    accent: "#000000",
  },
  {
    name: "Campus",
    price: "₹999",
    period: "/month",
    desc: "For college clubs & orgs",
    features: [
      "Everything in Pro",
      "Team workspace",
      "Bulk task posting",
      "Custom categories",
      "Department visibility",
      "Admin dashboard",
      "Dedicated support",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
    accent: "#000000",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="gradient-divider mb-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-100 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neutral-200 rounded-full blur-[100px]" />

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
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-4 tracking-tight">
            Start free,{" "}
            <span className="gradient-text">scale as you grow</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Simple, transparent pricing. No hidden fees.
          </p>
        </motion.div>

        {/* ── Plans ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.05 : 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: plan.popular ? -8 : -6,
                transition: { type: "spring", stiffness: 280, damping: 20 }
              }}
              className={`relative rounded-2xl p-6 group transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-black shadow-xl scale-[1.03] md:scale-[1.05]"
                  : "bg-white border border-neutral-200 shadow-sm"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold shadow-md tracking-wide">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 border border-black/10"
                  >
                    <Zap className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 mb-5 ml-10">{plan.desc}</p>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-black tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-neutral-600 font-medium">{plan.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-6 rounded-full bg-gradient-to-r from-black/20 to-transparent"
              />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-black/5"
                    >
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className={`block text-center text-sm py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "btn-primary w-full"
                    : "btn-secondary w-full"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-neutral-600 mt-10"
        >
          All plans include 14-day free trial • Cancel anytime • No credit card required for Free plan
        </motion.p>
      </div>
    </section>
  );
}
