import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3"
                    >
                        <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg mb-6 tracking-wider uppercase text-sm">
                            Contactez-nous
                        </div>
                        <h2 className="text-4xl font-bold text-blue-900 mb-8">Parlons de votre <span className="text-amber-500">Projet</span></h2>
                        <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                            Que vous ayez une question ou que vous souhaitiez démarrer une collaboration, notre équipe est là pour vous répondre.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Phone, color: 'amber', title: 'Téléphone', detail: '+221 76 143 18 07', sub: 'Lun-Ven 8h00 - 18h00' },
                                { icon: Mail, color: 'blue', title: 'Email', detail: 'contact@diatranscom.sn', sub: 'Réponse sous 24h' },
                                { icon: MapPin, color: 'green', title: 'Localisation', detail: 'Keur Massar, Dakar, Sénégal', sub: 'Siège Social' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300`}>
                                        <item.icon className={`w-6 h-6 text-${item.color}-600 group-hover:text-white`} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 text-lg mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-lg">{item.detail}</p>
                                        <p className="text-gray-400 text-sm">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <h4 className="font-bold text-blue-900 mb-6">Suivez-nous</h4>
                            <div className="flex gap-4">
                                {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-2/3"
                    >
                        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-blue-900 uppercase tracking-wider ml-1">Nom Complet</label>
                                        <input type="text" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="Votre nom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-blue-900 uppercase tracking-wider ml-1">Email</label>
                                        <input type="email" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="votre@email.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-blue-900 uppercase tracking-wider ml-1">Téléphone</label>
                                        <input type="tel" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="+221 ..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-blue-900 uppercase tracking-wider ml-1">Sujet</label>
                                        <select className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all appearance-none cursor-pointer">
                                            <option>Devis Travaux</option>
                                            <option>Conseil Technique</option>
                                            <option>Recrutement</option>
                                            <option>Autre</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-blue-900 uppercase tracking-wider ml-1">Message</label>
                                    <textarea rows="5" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10"
                                >
                                    <Send className="w-5 h-5" />
                                    Envoyer le Message
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
