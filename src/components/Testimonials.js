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
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-lg mb-6 tracking-wider uppercase text-sm"
                    >
                        Témoignages
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
                    >
                        Ce que nos <span className="text-amber-500">Clients</span> disent de nous
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-lg"
                    >
                        La satisfaction de nos partenaires est notre plus belle réussite. Découvrez les retours d'expérience de ceux qui nous font confiance.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-white hover:border-amber-200 transition-all duration-300 group"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, star) => (
                                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <div className="relative mb-8">
                                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-50 opacity-10 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-600 italic leading-relaxed relative z-10">
                                    "{t.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-amber-400" />
                                <div>
                                    <h4 className="font-bold text-blue-900">{t.name}</h4>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
