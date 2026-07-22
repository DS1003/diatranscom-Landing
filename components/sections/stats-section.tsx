"use client";

import { motion } from "framer-motion";

interface StatsSectionProps {
  initialStats?: any;
}

export const StatsSection = ({ initialStats }: StatsSectionProps) => {
  let stats = [
    { value: "15+", label: "Années d'Expérience" },
    { value: "150+", label: "Projets Réalisés" },
    { value: "95%", label: "Satisfaction Client" },
  ];

  if (initialStats) {
    // initialStats can be an array object or string depending on how it's passed/stored
    try {
      const parsed = typeof initialStats === "string" ? JSON.parse(initialStats) : initialStats;
      if (Array.isArray(parsed) && parsed.length > 0) {
        stats = parsed;
      }
    } catch (e) {
      // Keep default
    }
  }

  return (
    <section className="py-24 bg-primary-950 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative group"
            >
              <div className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 group-hover:text-accent-400 transition-colors duration-500">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary-400">
                {stat.label}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
