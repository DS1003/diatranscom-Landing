"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

interface HeroSectionProps {
  initialHero?: any;
}

export const HeroSection = ({ initialHero }: HeroSectionProps) => {
  const title = initialHero?.title || "L'Excellence";
  const subtitle = initialHero?.subtitle || "Construction Durable";
  const description = initialHero?.description || "Solutions d'ingénierie avancées en assainissement et terrassement. Nous bâtissons l'avenir des infrastructures sénégalaises avec rigueur et innovation.";
  const buttonText = initialHero?.buttonText || "Explorer nos projets";
  const badges = initialHero?.badges || ["BTP & Génie Civil au Sénégal"];
  const imageUrl = initialHero?.imageUrl || "https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg";

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-primary-950">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-4xl">
          {badges[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-white">
                {badges[0]}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-black leading-[1.05] tracking-tight mb-8"
          >
            {title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-600">{subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-primary-200 max-w-2xl font-light leading-relaxed mb-12 border-l-2 border-accent-500/50 pl-6"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <MagneticWrapper>
              <Button size="lg" variant="accent" className="w-full sm:w-auto rounded-full group">
                <span className="mr-2">{buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticWrapper>

            <MagneticWrapper>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full group">
                <Play className="w-4 h-4 mr-2" />
                <span className="mr-2">Notre Vision</span>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 lg:left-16 flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-t from-white to-transparent opacity-30" />
        <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};
