import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Zap, ArrowRight } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Target className="w-8 h-8 text-amber-500" />,
            title: "Notre Mission",
            description: "Apporter des solutions d'ingénierie innovantes et durables pour transformer les infrastructures de demain."
        },
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Notre Équipe",
            description: "Une équipe d'experts passionnés et qualifiés, dédiée à la réussite de chaque projet."
        },
        {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: "Qualité & Sécurité",
            description: "Le respect strict des normes de sécurité et un engagement qualité sans compromis."
        },
        {
            icon: <Zap className="w-8 h-8 text-purple-500" />,
            title: "Innovation",
            description: "L'utilisation des dernières technologies pour une efficacité optimale."
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="lg:w-1/2 relative perspective-1000"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Construction site"
                                className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
                        </motion.div>

                        {/* Experience Badge */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="absolute -bottom-6 -right-2 sm:-right-6 bg-white p-4 sm:p-8 rounded-3xl shadow-2xl z-20 max-w-[180px] sm:max-w-[260px] border border-blue-50"
                        >
                            <div className="flex items-center gap-3 sm:gap-5">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                                    <span className="text-2xl sm:text-3xl font-black text-white">12</span>
                                </div>
                                <div className="text-xs sm:text-base font-black text-blue-900 uppercase tracking-tighter leading-none">
                                    Années<br />d'Expérience
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 font-black rounded-full mb-8 tracking-widest uppercase text-xs shadow-sm border border-blue-100"
                        >
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            À Propos de Diatranscom
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-8 leading-[1.1]"
                        >
                            Bâtir le futur avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Expertise</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 font-medium"
                        >
                            Diatranscom est un leader reconnu dans le secteur des travaux publics et du BTP au Sénégal.
                            Nous accompagnons nos clients dans la réalisation de projets d'infrastructure majeurs.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-12">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="group flex flex-col gap-3"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {React.cloneElement(value.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-blue-900 mb-1">{value.title}</h3>
                                        <p className="text-gray-500 text-[10px] sm:text-xs font-medium leading-relaxed line-clamp-2">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            onClick={() => scrollToSection('contact')}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10"
                        >
                            <span>Démarrer un projet</span>
                            <ArrowRight className="w-5 h-5 text-amber-400" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
