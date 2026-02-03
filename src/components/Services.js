import React from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  Construction,
  Mountain,
  Building2,
  HardHat,
  ClipboardCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <Droplets className="w-8 h-8" />,
      title: 'Assainissement',
      description: 'Services complets d\'assainissement urbain et rural : réseaux d\'égouts, stations d\'épuration, canalisations et systèmes de drainage.',
      features: ['Réseaux d\'égouts', 'Stations d\'épuration', 'Drainage urbain'],
      color: 'blue'
    },
    {
      id: 2,
      icon: <Construction className="w-8 h-8" />,
      title: 'Terrassement',
      description: 'Travaux de terrassement pour tous types de projets : excavation, nivellement, déblaiement et préparation de terrains.',
      features: ['Excavation', 'Nivellement', 'Préparation terrain'],
      color: 'amber'
    },
    {
      id: 3,
      icon: <Mountain className="w-8 h-8" />,
      title: 'Enrochement',
      description: 'Solutions d\'enrochement pour la protection des berges, ouvrages de soutènement et aménagements paysagers durables.',
      features: ['Protection berges', 'Soutènement', 'Stabilisation'],
      color: 'slate'
    },
    {
      id: 4,
      icon: <Building2 className="w-8 h-8" />,
      title: 'Travaux BTP',
      description: 'Construction et rénovation d\'infrastructures : bâtiments, routes, ponts et ouvrages d\'art avec expertise technique.',
      features: ['Infrastructure', 'Ouvrages d\'art', 'Rénovation'],
      color: 'red'
    },
    {
      id: 5,
      icon: <HardHat className="w-8 h-8" />,
      title: 'Génie Civil',
      description: 'Conception et réalisation de projets de génie civil complexes avec études techniques approfondies et suivi de chantier.',
      features: ['Études techniques', 'Suivi chantier', 'Conception'],
      color: 'green'
    },
    {
      id: 6,
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: 'Conseil & Expertise',
      description: 'Conseil technique et expertise en ingénierie pour l\'optimisation de vos projets et la conformité aux normes.',
      features: ['Audit technique', 'Optimisation', 'Conformité'],
      color: 'purple'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
            Nos Domaines d'Intervention
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-8 leading-tight"
          >
            Excellence & <span className="text-amber-500">Innovation</span> pour vos infrastructures
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed"
          >
            Nous mettons notre savoir-faire au service de vos défis les plus complexes
            avec un engagement total sur la qualité et la durabilité.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 group relative overflow-hidden border border-transparent hover:border-blue-100 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${service.color}-50 flex items-center justify-center text-${service.color}-600 mb-8 group-hover:scale-110 group-hover:bg-${service.color}-600 group-hover:text-white transition-all duration-500`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ChevronRight className={`w-4 h-4 text-${service.color}-500`} />
                    {feature}
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 text-blue-900 font-bold group/btn">
                En savoir plus
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>

              {/* Decorative background number */}
              <div className="absolute -bottom-4 -right-4 text-9xl font-black text-gray-50 -z-10 group-hover:text-gray-100 transition-colors pointer-events-none">
                {service.id}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-blue-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Un projet spécifique en tête ?</h3>
              <p className="text-blue-300">Nos ingénieurs sont prêts à relever tous les défis.</p>
            </div>
            <button className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-400/20">
              Discuter avec un expert
            </button>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;