"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectsSectionProps {
  initialProjects?: any[];
}

export const ProjectsSection = ({ initialProjects }: ProjectsSectionProps) => {
  const projects = initialProjects || [];

  return (
    <section id="projects" className="py-32 bg-primary-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-800/20 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent-400">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Nos Réalisations <span className="text-accent-500">Majeures</span>
            </h2>
            <p className="text-primary-300 text-lg font-light leading-relaxed">
              Découvrez une sélection de nos chantiers les plus emblématiques, témoignant de notre expertise technique et de notre capacité d'exécution à grande échelle.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-full bg-white/5 border-white/10 text-white hover:bg-accent-500 hover:text-white hover:border-accent-500 transition-all">
            Voir tous les projets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <p className="text-primary-400">Bientôt de nouveaux projets à découvrir ici.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, i) => {
              const images = Array.isArray(project.images) ? project.images : [];
              const mainImage = images.length > 0 ? images[0] : "https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg";

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group relative rounded-[2rem] overflow-hidden bg-primary-900 border border-white/5"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={mainImage} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary-950 via-primary-950/90 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-2">
                      {project.client || "Chantier en cours"}
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-primary-300 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project.description}
                    </p>
                    
                    <a href={`/projects/${project.slug}`} className="inline-flex items-center text-sm font-bold text-white hover:text-accent-400 transition-colors">
                      Découvrir
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-accent-500 hover:text-white hover:border-accent-500 transition-all w-full">
            Voir tous les projets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
