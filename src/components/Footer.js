import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowUp, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const services = [
    { name: "Assainissement", popular: true },
    { name: "Terrassement", popular: false },
    { name: "Enrochement", popular: true },
    { name: "Travaux Publics", popular: false },
    { name: "VRD", popular: false },
    { name: "Génie Civil", popular: true }
  ];

  const links = [
    { name: "Accueil", href: "#" },
    { name: "À propos", href: "#" },
    { name: "Services", href: "#" },
    { name: "Projets", href: "#" },
    { name: "Contact", href: "#" }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient subtil en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black"></div>
      
      {/* Pattern géométrique moderne */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #fbbf24 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Header du footer avec logo moderne */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-4 mb-6 justify-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                alt="Logo DIA TRANSCOM"
                className="w-20 h-20 rounded-2xl object-contain shadow-2xl shadow-amber-500/25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-md opacity-30"></div>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Partenaire de confiance depuis <span className="text-amber-400 font-semibold">12 ans</span> pour vos projets de construction et travaux publics au Sénégal.
          </p>
        </div>

        {/* Grille principale - design asymétrique moderne */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Services - Section élargie */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Nos Expertises
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="group relative">
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 hover:border-amber-400/50 transition-all duration-300 hover:bg-zinc-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                        {service.name}
                      </span>
                      {service.popular && (
                        <span className="px-2 py-1 bg-amber-400/20 text-amber-400 text-xs rounded-full font-medium">
                          Populaire
                        </span>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors duration-300 mt-2 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation et Stats */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 relative">
                Navigation
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="group flex items-center space-x-2 text-gray-400 hover:text-amber-400 transition-all duration-300">
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-amber-400 transition-colors duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats modernes */}
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">150+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Projets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">95%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact moderne */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Restons Connectés
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
            </h3>
            
            <div className="space-y-4">
              <a href="https://maps.google.com" className="group flex items-center space-x-4 p-4 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-amber-400/50 transition-all duration-300 hover:bg-zinc-800/50">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-lg flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Keur Massar - Diamniadio</div>
                  <div className="text-gray-400 text-sm">Dakar, Sénégal</div>
                </div>
              </a>

              <a href="tel:+221761431807" className="group flex items-center space-x-4 p-4 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-amber-400/50 transition-all duration-300 hover:bg-zinc-800/50">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-lg flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-medium">+221 76 143 18 07</div>
                  <div className="text-gray-400 text-sm">Appelez-nous maintenant</div>
                </div>
              </a>

              <a href="mailto:Ibrandiayedia1@gmail.com" className="group flex items-center space-x-4 p-4 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-amber-400/50 transition-all duration-300 hover:bg-zinc-800/50">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-lg flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Ibrandiayedia1@gmail.com</div>
                  <div className="text-gray-400 text-sm">Écrivez-nous</div>
                </div>
              </a>
            </div>

            {/* Réseaux sociaux modernes */}
            <div className="pt-6">
              <div className="flex space-x-3">
                <a href="#" className="group w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="group w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center hover:from-pink-600 hover:to-pink-700 hover:border-pink-500 transition-all duration-300 hover:scale-105">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="group w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 hover:border-blue-600 transition-all duration-300 hover:scale-105">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom ultra-moderne */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2025 <span className="text-amber-400 font-medium">DIA TRANSCOM</span>. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <button type="button" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 relative group bg-transparent border-0 p-0 focus:outline-none">
                Confidentialité
                <span className="absolute inset-x-0 -bottom-1 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button type="button" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 relative group bg-transparent border-0 p-0 focus:outline-none">
                Conditions
                <span className="absolute inset-x-0 -bottom-1 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button type="button" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 relative group bg-transparent border-0 p-0 focus:outline-none">
                Mentions légales
                <span className="absolute inset-x-0 -bottom-1 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            </div>

            <div className="text-xs text-gray-600 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Site actuel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton scroll moderne avec effet glassmorphism */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-amber-400/90 to-orange-500/90 backdrop-blur-sm border border-amber-400/20 text-black rounded-2xl shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      )}
    </footer>
  );
};

export default Footer;