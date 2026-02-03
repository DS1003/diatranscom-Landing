import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const CTA = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerHeight = 80
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            })
        }
    }

    return (
        <section id="cta" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-full h-full">
                        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[80%] bg-amber-400/10 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] bg-blue-400/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-2/3 text-center lg:text-left">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
                            >
                                Prêt à concrétiser votre <span className="text-amber-400">Projet</span> ?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-blue-100 text-xl md:text-2xl leading-relaxed mb-0 max-w-2xl opacity-90"
                            >
                                Nos experts sont à votre disposition pour analyser vos besoins et vous proposer des solutions sur mesure.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto"
                        >
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="flex-1 lg:flex-none px-10 py-5 bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold text-lg rounded-2xl shadow-xl shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                            >
                                Demander un devis
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <a
                                href="tel:+221761431807"
                                className="flex-1 lg:flex-none px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Phone className="w-6 h-6" />
                                +221 76 143 18 07
                            </a>
                        </motion.div>
                    </div>

                    {/* Bottom Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="text-2xl italic">ISO 9001</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="text-2xl italic">QUALIBAT</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="text-2xl italic">HSE CERTIFIED</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
