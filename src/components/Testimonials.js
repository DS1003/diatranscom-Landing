import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Jean Paul Faye",
            role: "Directeur Technique, BuildAfrica",
            content: "L'expertise de Diatranscom en terrassement a été cruciale pour notre dernier projet de complexe résidentiel. Une précision exemplaire et un respect total des délais.",
            avatar: "https://i.pravatar.cc/150?u=jp"
        },
        {
            name: "Awa Ndiaye",
            role: "Architecte Urbaniste",
            content: "Travailler avec Diatranscom est une garantie de tranquillité. Leurs solutions d'assainissement sont innovantes et parfaitement intégrées aux contraintes du terrain.",
            avatar: "https://i.pravatar.cc/150?u=awa"
        },
        {
            name: "Moussa Sarr",
            role: "Entrepreneur BTP",
            content: "Le professionnalisme des équipes sur le terrain et la qualité de l'accompagnement technique font de Diatranscom un partenaire de choix pour nos grands chantiers.",
            avatar: "https://i.pravatar.cc/150?u=moussa"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="testimonials" className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Decor Orbs with Animation */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            ></motion.div>
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
            ></motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 text-amber-700 font-black rounded-full mb-6 tracking-widest uppercase text-xs"
                    >
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                        Témoignages
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-black text-blue-900 mb-8 leading-tight"
                    >
                        Ce que nos <span className="text-amber-500">Clients</span> disent
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-gray-600 text-xl font-medium"
                    >
                        La satisfaction de nos partenaires est notre plus belle réussite.
                        Découvrez les retours d'expérience de ceux qui nous font confiance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto pb-8 md:pb-0 scrollbar-hide md:grid scroll-smooth snap-x snap-mandatory">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{
                                y: -15,
                                rotate: i % 2 === 0 ? 1 : -1,
                                scale: 1.02
                            }}
                            className="bg-white p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-transparent hover:border-amber-200 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 group relative min-w-[300px] sm:min-w-0 snap-center"
                        >
                            <div className="flex gap-1 mb-6 sm:mb-8">
                                {[...Array(5)].map((_, star) => (
                                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <div className="relative mb-8 sm:mb-10">
                                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-900/5 group-hover:text-amber-500/10 transition-colors" />
                                <p className="text-gray-600 text-base sm:text-lg italic leading-relaxed relative z-10 font-medium">
                                    "{t.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-gray-50">
                                <div className="relative">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-amber-50 rounded-tr-[1.2rem] sm:rounded-tr-[1.5rem] object-cover" />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-black text-blue-900 text-base sm:text-lg">{t.name}</h4>
                                    <p className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile indicators */}
                <div className="flex justify-center gap-2 mt-4 md:hidden">
                    {testimonials.map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-slate-200" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
