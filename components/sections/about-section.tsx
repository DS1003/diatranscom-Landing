"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

interface AboutSectionProps {
  initialAbout?: any;
}

export const AboutSection = ({ initialAbout }: AboutSectionProps) => {
  const title = initialAbout?.title || "Bâtir le futur avec Expertise.";
  const content = initialAbout?.content || "Diatranscom est un leader reconnu dans le secteur des travaux publics et du BTP au Sénégal. Nous accompagnons nos clients dans la réalisation de projets d'infrastructure majeurs.";
  const imageUrl = initialAbout?.imageUrl || "https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg";
  
  let missionList = [
    { title: "Notre Mission", desc: "Apporter des solutions d'ingénierie innovantes et durables pour transformer les infrastructures de demain." },
    { title: "Notre Équipe", desc: "Une équipe d'experts passionnés et qualifiés, dédiée à la réussite de chaque projet." },
    { title: "Qualité & Sécurité", desc: "Le respect strict des normes de sécurité et un engagement qualité sans compromis." },
    { title: "Innovation", desc: "L'utilisation des dernières technologies pour une efficacité optimale." },
  ];

  if (initialAbout?.mission) {
    try {
      const parsed = JSON.parse(initialAbout.mission);
      if (Array.isArray(parsed) && parsed.length > 0) {
        missionList = parsed;
      }
    } catch (e) {
      // Keep default if JSON is invalid
    }
  }

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-primary-950/10 z-10" />
              <img 
                src={imageUrl} 
                alt="Chantier Diatranscom" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent-100 rounded-full -z-10 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-bold tracking-widest uppercase text-primary-500">
                À Propos de Diatranscom
              </span>
            </div>

            <TextReveal 
              text={title}
              className="text-4xl md:text-5xl font-black text-primary-950 mb-8 leading-tight tracking-tight"
            />

            <p className="text-primary-600 text-lg leading-relaxed mb-8">
              {content}
            </p>

            <ul className="space-y-6 mb-12">
              {missionList.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-4 text-primary-800">
                  <div className="w-6 h-6 mt-1 rounded-full bg-primary-50 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-950">{item.title}</h4>
                    <p className="text-primary-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button variant="default" size="lg" className="rounded-full group">
              Découvrir notre histoire
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
