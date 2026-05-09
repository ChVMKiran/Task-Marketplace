"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Riya Kapoor",
    role: "UI/UX Designer",
    college: "NIT Trichy",
    text: "CampusCraft helped me build a real portfolio while earning. Won 12 contests in my first semester!",
    rating: 5,
    earned: "₹85,000",
    avatarColor: "from-neutral-200 to-neutral-400",
  },
  {
    name: "Aditya Kumar",
    role: "Web Developer",
    college: "IIT Bombay",
    text: "The quality of tasks here is incredible. Way better than generic freelancing sites. The review system is fair and transparent.",
    rating: 5,
    earned: "₹1,20,000",
    avatarColor: "from-neutral-200 to-neutral-300",
  },
  {
    name: "Sneha Patel",
    role: "Content Writer",
    college: "BITS Pilani",
    text: "As a client, I get amazing creative work from talented students at reasonable budgets. The submission comparison feature is a game-changer.",
    rating: 5,
    earned: "32 tasks posted",
    avatarColor: "from-neutral-200 to-teal-500",
  },
  {
    name: "Vikram Rao",
    role: "Graphic Designer",
    college: "SRM Chennai",
    text: "The AI recommendations are spot-on. I always find tasks that match my skills perfectly. Already earned enough for my semester fees!",
    rating: 5,
    earned: "₹65,000",
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    name: "Meera Nair",
    role: "Video Editor",
    college: "Manipal University",
    text: "Love the clean interface and smooth workflow. From submission to payout, everything just works. This is what a student platform should be.",
    rating: 5,
    earned: "₹48,000",
    avatarColor: "from-neutral-200 to-rose-500",
  },
  {
    name: "Dev Sharma",
    role: "Full Stack Developer",
    college: "DTU Delhi",
    text: "Built my entire freelancing career on CampusCraft during college. The reputation system helped me land internships too!",
    rating: 5,
    earned: "₹2,10,000",
    avatarColor: "from-neutral-300 to-neutral-300",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="gradient-divider mb-0" />
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-100 rounded-full blur-[120px]" />

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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2 mb-4 tracking-tight">
            Loved by{" "}
            <span className="gradient-text">45,000+</span> students
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
            See what our community has to say about their CampusCraft experience.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="glass-card shimmer rounded-2xl p-6 relative group overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-neutral-900 mb-4 shrink-0" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-neutral-600 leading-relaxed mb-5 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-neutral-200/40 to-transparent mb-4" />

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-black text-sm font-bold shadow-sm`}>
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-600">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {t.role} · {t.college}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 px-2.5 py-1 rounded-full">
                  {t.earned}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
