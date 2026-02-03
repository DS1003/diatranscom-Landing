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
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Construction site"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"></div>

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-[240px]"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl font-bold text-amber-600">12</span>
                                </div>
                                <div className="text-sm font-bold text-blue-900 uppercase tracking-wider">Années<br />d'Expérience</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg mb-6 tracking-wider uppercase text-sm"
                        >
                            À Propos de Diatranscom
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight"
                        >
                            Bâtir le futur avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Expertise</span> et Passion
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 text-lg leading-relaxed mb-10"
                        >
                            Diatranscom est un leader reconnu dans le secteur des travaux publics et du BTP au Sénégal.
                            Depuis plus d'une décennie, nous accompagnons nos clients dans la réalisation de projets
                            d'infrastructure majeurs, en alliant savoir-faire traditionnel et innovations technologiques.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-blue-900 mb-1">{value.title}</h3>
                                        <p className="text-gray-500 text-sm">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
