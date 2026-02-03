import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Zap } from 'lucide-react';

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
            description: "Une équipe d'experts passionnés et qualifiés, dédiée à la réussite de chaque projet, du plus simple au plus complexe."
        },
        {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: "Qualité & Sécurité",
            description: "Le respect strict des normes de sécurité et un engagement qualité sans compromis sur tous nos chantiers."
        },
        {
            icon: <Zap className="w-8 h-8 text-purple-500" />,
            title: "Innovation",
            description: "L'utilisation des dernières technologies et méthodes de construction pour une efficacité optimale."
        }
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
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
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"
                        ></motion.div>
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"
                        ></motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl z-20 max-w-[260px] border border-blue-50"
                        >
                            <div className="flex items-center gap-5">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"
                                >
                                    <span className="text-3xl font-black text-white">12</span>
                                </motion.div>
                                <div className="text-base font-black text-blue-900 uppercase tracking-tighter leading-none">
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
                            className="text-5xl md:text-6xl font-black text-blue-900 mb-8 leading-[1.1]"
                        >
                            Bâtir le futur avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Expertise</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 text-xl leading-relaxed mb-8 font-medium"
                        >
                            Diatranscom est un leader reconnu dans le secteur des travaux publics et du BTP au Sénégal.
                            Nous accompagnons nos clients dans la réalisation de projets d'infrastructure majeurs,
                            en alliant savoir-faire traditionnel et innovations technologiques.
                        </motion.p>

                        <motion.button
                            onClick={() => {
                                const element = document.getElementById('contact');
                                if (element) {
                                    const headerHeight = 80;
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                    window.scrollTo({
                                        top: elementPosition - headerHeight,
                                        behavior: "smooth",
                                    });
                                }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mb-12 px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/10 flex items-center gap-2 group"
                        >
                            <span>Découvrir nos réalisations</span>
                            <Zap className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                        </motion.button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    whileHover={{ x: 10 }}
                                    className="group flex gap-5"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {React.cloneElement(value.icon, { className: "w-7 h-7 transition-colors group-hover:text-white" })}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-blue-900 mb-2">{value.title}</h3>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
