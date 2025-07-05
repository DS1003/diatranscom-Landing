import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const backgroundImages = [
    'https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg',
    'https://res.cloudinary.com/dgro5x4h8/image/upload/v1750465857/WhatsApp_Image_2025-05-19_at_18.23.13_gkhvao.jpg',
    'https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg',

  ];
  
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: 150, label: "Projets", suffix: "+" },
    { value: 12, label: "Années", suffix: "" },
    { value: 95, label: "Satisfaction", suffix: "%" }
  ];

  const services = [
    { name: "Assainissement", icon: "🏗️" },
    { name: "Terrassement", icon: "⚡" },
    { name: "Enrochement", icon: "🔧" },
    { name: "BTP", icon: "🏢" }
  ];

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Slider avec effet parallax */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-out ${
              currentSlide === index 
                ? 'opacity-40 scale-105' 
                : 'opacity-0 scale-100'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3) contrast(1.2)'
            }}
          />
        ))}
        
        {/* Gradient overlay moderne */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-blue-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
      </div>

      {/* Grille décorative subtile */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Section gauche - Contenu textuel */}
            <div className={`space-y-8 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}>
              
              {/* Logo badge moderne */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/15 transition-all duration-500 group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.15 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2.58 3.54c-.41-.41-1.08-.41-1.49 0L12 14.62 8.92 11.54c-.41-.41-1.08-.41-1.49 0s-.41 1.08 0 1.49l3.59 3.59c.41.41 1.08.41 1.49 0l3.59-3.59c.41-.41.41-1.08-.03-1.49z"/>
                  </svg>
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">DIA TRANSCOM</span>
              </div>

              {/* Titre principal avec effet de révélation */}
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <h1 className="text-5xl lg:text-7xl font-black leading-none text-white animate-slideUp">
                    <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      EXPERTISE
                    </span>
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-5xl lg:text-7xl font-black leading-none animate-slideUp animation-delay-200">
                    <span className="inline-block bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                      TRAVAUX
                    </span>
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-5xl lg:text-7xl font-black leading-none text-white animate-slideUp animation-delay-400">
                    <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      PUBLICS
                    </span>
                  </h1>
                </div>
              </div>

              {/* Sous-titre moderne */}
              <p className={`text-xl text-blue-100 font-light leading-relaxed max-w-xl ${isLoaded ? 'animate-fadeIn animation-delay-600' : 'opacity-0'}`}>
                Solutions professionnelles en <span className="text-yellow-400 font-semibold">assainissement</span>, 
                <span className="text-yellow-400 font-semibold"> terrassement</span> et 
                <span className="text-yellow-400 font-semibold"> enrochement</span> au Sénégal.
              </p>

              {/* Services tags */}
              <div className={`flex flex-wrap gap-3 ${isLoaded ? 'animate-fadeIn animation-delay-800' : 'opacity-0'}`}>
                {services.map((service, index) => (
                  <div 
                    key={service.name}
                    className={`px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <span className="mr-2">{service.icon}</span>
                    {service.name}
                  </div>
                ))}
              </div>

              {/* Boutons d'action modernes */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fadeIn animation-delay-1000' : 'opacity-0'}`}>
                <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-500 hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center">
                    Découvrir nos services
                    <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
                
                <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-105 hover:border-white">
                  <span className="flex items-center justify-center">
                    <svg className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Nous contacter
                  </span>
                </button>
              </div>
            </div>

            {/* Section droite - Carte de statistiques moderne */}
            <div className={`flex justify-center lg:justify-end ${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="relative w-full max-w-lg">
                
                {/* Éléments décoratifs flottants */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse-slow" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse-slow animation-delay-1000" />
                
                {/* Carte principale glassmorphism */}
                <div className="relative p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:bg-white/15 transition-all duration-700 hover:scale-105 group">
                  
                  {/* Header de la carte */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Notre Impact</h3>
                    <p className="text-blue-100 text-sm">Excellence et expertise reconnues</p>
                  </div>

                  {/* Statistiques avec animations */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center group/stat hover:scale-110 transition-transform duration-300">
                        <div className="text-3xl font-black text-yellow-400 mb-1 animate-countUp" style={{ animationDelay: `${index * 0.2}s` }}>
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-xs text-blue-100 font-medium uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Barre de progression moderne */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-100">Taux de réussite</span>
                      <span className="text-sm font-bold text-yellow-400">95%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-progressBar" />
                    </div>
                  </div>

                  {/* Contact rapide */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-blue-100 hover:text-yellow-400 transition-colors duration-300 group/contact">
                      <div className="w-8 h-8 mr-3 bg-white/10 rounded-full flex items-center justify-center group-hover/contact:bg-yellow-400/20 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span>Keur Massar - Diamniadio</span>
                    </div>
                    
                    <div className="flex items-center text-blue-100 hover:text-yellow-400 transition-colors duration-300 group/contact">
                      <div className="w-8 h-8 mr-3 bg-white/10 rounded-full flex items-center justify-center group-hover/contact:bg-yellow-400/20 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span>+221 76 143 18 07</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slides minimalistes */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button 
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'bg-yellow-400 w-8' 
                : 'bg-white/30 w-4 hover:bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Styles et animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes countUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 95%; }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
        }
        
        .animate-progressBar {
          animation: progressBar 2s ease-out forwards 1.5s;
          width: 0%;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
};

export default Hero;