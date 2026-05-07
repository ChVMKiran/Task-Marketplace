"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Riya Kapoor", role: "UI/UX Designer", college: "NIT Trichy", text: "CampusCraft helped me build a real portfolio while earning. Won 12 contests in my first semester!", rating: 5, earned: "₹85,000" },
  { name: "Aditya Kumar", role: "Web Developer", college: "IIT Bombay", text: "The quality of tasks here is incredible. Way better than generic freelancing sites. The review system is fair and transparent.", rating: 5, earned: "₹1,20,000" },
  { name: "Sneha Patel", role: "Content Writer", college: "BITS Pilani", text: "As a client, I get amazing creative work from talented students at reasonable budgets. The submission comparison feature is a game-changer.", rating: 5, earned: "32 tasks posted" },
  { name: "Vikram Rao", role: "Graphic Designer", college: "SRM Chennai", text: "The AI recommendations are spot-on. I always find tasks that match my skills perfectly. Already earned enough for my semester fees!", rating: 5, earned: "₹65,000" },
  { name: "Meera Nair", role: "Video Editor", college: "Manipal University", text: "Love the clean interface and smooth workflow. From submission to payout, everything just works. This is what a student platform should be.", rating: 5, earned: "₹48,000" },
  { name: "Dev Sharma", role: "Full Stack Developer", college: "DTU Delhi", text: "Built my entire freelancing career on CampusCraft during college. The reputation system helped me land internships too!", rating: 5, earned: "₹2,10,000" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-violet-400 font-medium uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Loved by <span className="gradient-text">45,000+</span> students
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            See what our community has to say about their CampusCraft experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <Quote className="w-8 h-8 text-violet-500/20 mb-4" />
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role} · {t.college}</div>
                  </div>
                </div>
                <div className="text-xs text-emerald-400 font-medium">{t.earned}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
