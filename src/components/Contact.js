import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -90, 0],
                        x: [0, -30, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-stretch">
                    {/* Contact Info Side */}
                    <div className="lg:w-5/12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-700 font-black rounded-full mb-8 tracking-widest uppercase text-xs"
                        >
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            Contactez-nous
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-blue-950 mb-8 leading-[1.1]"
                        >
                            Parlons de votre <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Projet</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 text-xl font-medium leading-relaxed mb-12 max-w-lg"
                        >
                            Que vous soyez au stade de l'idée ou prêt à lancer votre chantier,
                            notre équipe d'experts est prête à vous accompagner.
                        </motion.p>

                        <div className="space-y-6">
                            {[
                                { icon: Phone, color: 'amber', title: 'Téléphone Hotline', detail: '+221 76 143 18 07', sub: 'Disponible 24/7 pour les urgences' },
                                { icon: Mail, color: 'blue', title: 'Support Email', detail: 'contact@diatranscom.sn', sub: 'Réponse garantie sous 12h' },
                                { icon: MapPin, color: 'slate', title: 'Nos Bureaux', detail: 'Keur Massar, Dakar, Sénégal', sub: 'Direction Générale' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 p-6 rounded-3xl bg-white/50 backdrop-blur-md border border-white hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group"
                                >
                                    <div className={`w-16 h-16 bg-${item.color}-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-${item.color}-500/20`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                                        <h4 className="font-black text-blue-950 text-xl mb-0.5">{item.detail}</h4>
                                        <p className="text-slate-500 text-sm font-medium">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Connectons-nous :</span>
                            <div className="flex gap-3">
                                {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#!"
                                        whileHover={{ y: -5, scale: 1.1, backgroundColor: '#1e3a8a', color: '#fff' }}
                                        className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 transition-all shadow-sm"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-7/12"
                    >
                        <div className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 border border-blue-50 relative overflow-hidden group">
                            {/* Decorative line in form */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

                            <form className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-blue-950 uppercase tracking-tighter ml-1">Nom & Prénom</label>
                                        <input type="text" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 transition-all text-blue-950 font-medium placeholder:text-slate-400" placeholder="Jean Dupont" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-blue-950 uppercase tracking-tighter ml-1">Adresse Email</label>
                                        <input type="email" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 transition-all text-blue-950 font-medium placeholder:text-slate-400" placeholder="jean@exemple.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-blue-950 uppercase tracking-tighter ml-1">Numéro de Téléphone</label>
                                        <input type="tel" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 transition-all text-blue-950 font-medium placeholder:text-slate-400" placeholder="+221 7X XXX XX XX" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-blue-950 uppercase tracking-tighter ml-1">Service Intéressé</label>
                                        <div className="relative">
                                            <select className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 transition-all text-blue-950 font-bold appearance-none cursor-pointer">
                                                <option>Assainissement & VRD</option>
                                                <option>Terrassement & Excavation</option>
                                                <option>Génie Civil & BTP</option>
                                                <option>Expertise Conseil</option>
                                                <option>Autre</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-900/30"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-blue-950 uppercase tracking-tighter ml-1">Détails de votre Message</label>
                                    <textarea rows="4" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 transition-all text-blue-950 font-medium placeholder:text-slate-400 resize-none" placeholder="Décrivez brièvement votre projet..."></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(30, 58, 138, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-6 bg-gradient-to-r from-blue-900 to-blue-950 text-white font-black text-xl rounded-[1.5rem] transition-all flex items-center justify-center gap-4 group/btn"
                                >
                                    <span>Envoyer ma demande</span>
                                    <Send className="w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-300" />
                                </motion.button>

                                <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
