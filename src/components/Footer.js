import React from 'react';
import { Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900"></div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                alt="DIA TRANSCOM"
                                className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105"
                            />
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Votre partenaire de confiance en travaux publics et BTP au Sénégal. Excellence, innovation et durabilité au service de vos infrastructures.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-all border border-white/10">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Navigation</h4>
                        <ul className="space-y-4">
                            {['Accueil', 'À Propos', 'Services', 'Témoignages', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Nos Services</h4>
                        <ul className="space-y-4">
                            {['Assainissement', 'Terrassement', 'Enrochement', 'Génie Civil', 'BTP Premium'].map((item, i) => (
                                <li key={i}>
                                    <a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Contact Direct</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-amber-400 shrink-0" />
                                <p>Keur Massar, Dakar, Sénégal</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-amber-400 shrink-0" />
                                <p>+221 76 143 18 07</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-amber-400 shrink-0" />
                                <p>contact@diatranscom.sn</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} DIATRANSCOM. Tous droits réservés.
                    </p>

                    <div className="flex gap-8 text-sm text-slate-500 lowercase">
                        <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-white/5 hover:bg-amber-400 hover:text-slate-900 rounded-full flex items-center justify-center border border-white/10 transition-all group"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
