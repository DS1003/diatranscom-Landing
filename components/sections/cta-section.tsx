"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Award, CheckCircle } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-accent-500">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg')] bg-cover bg-center mix-blend-multiply opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-950 mb-8 tracking-tighter leading-tight">
            Prêt à concrétiser votre <span className="text-white">Projet</span> ?
          </h2>
          <p className="text-xl text-primary-900/80 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Nos experts sont à votre disposition pour analyser vos besoins et vous proposer des solutions sur mesure.
          </p>

          {/* Certifications */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {[
              { icon: <Shield className="w-5 h-5" />, label: "ISO 9001" },
              { icon: <Award className="w-5 h-5" />, label: "QUALIBAT" },
              { icon: <CheckCircle className="w-5 h-5" />, label: "HSE CERTIFIED" },
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-primary-950/10 rounded-full text-primary-950 text-sm font-bold">
                {cert.icon}
                {cert.label}
              </div>
            ))}
          </div>

          <Button variant="default" size="lg" className="rounded-full text-lg px-12 h-16 bg-primary-950 hover:bg-primary-900 text-white shadow-2xl">
            Contactez-nous
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
