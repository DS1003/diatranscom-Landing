
import React, { useState, useEffect } from 'react';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            setVisibleCards(prev => [...prev, parseInt(cardId)]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l2-2h8l2 2h4v12H3V7z" />
        </svg>
      ),
      title: 'Assainissement',
      description: 'Services complets d\'assainissement urbain et rural : réseaux d\'égouts, stations d\'épuration, canalisations et systèmes de drainage.',
      features: ['Réseaux d\'égouts', 'Stations d\'épuration', 'Canalisations', 'Drainage urbain'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Terrassement',
      description: 'Travaux de terrassement pour tous types de projets : excavation, nivellement, déblaiement et préparation de terrains.',
      features: ['Excavation', 'Nivellement', 'Déblaiement', 'Préparation terrain'],
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 3,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 8a4.5 4.5 0 119 0c0 1.934-.5 3.5-1.5 4.5L12 16.5l-3-4c-1-.5-1.5-2.066-1.5-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h.01M8 21l4-7 4 7H8z" />
        </svg>
      ),
      title: 'Enrochement',
      description: 'Solutions d\'enrochement pour la protection des berges, ouvrages de soutènement et aménagements paysagers durables.',
      features: ['Protection berges', 'Soutènement', 'Aménagement paysager', 'Stabilisation'],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 4,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4-2h.01" />
        </svg>
      ),
      title: 'Travaux BTP',
      description: 'Construction et rénovation d\'infrastructures : bâtiments, routes, ponts et ouvrages d\'art avec expertise technique.',
      features: ['Construction', 'Rénovation', 'Infrastructure', 'Ouvrages d\'art'],
      color: 'from-red-600 to-red-800'
    },
    {
      id: 5,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Génie Civil',
      description: 'Conception et réalisation de projets de génie civil complexes avec études techniques approfondies et suivi de chantier.',
      features: ['Études techniques', 'Conception', 'Suivi chantier', 'Expertise'],
      color: 'from-green-600 to-green-800'
    },
    {
      id: 6,
      icon: (
        <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Conseil & Expertise',
      description: 'Conseil technique et expertise en ingénierie pour l\'optimisation de vos projets et la conformité aux normes.',
      features: ['Conseil technique', 'Expertise', 'Optimisation', 'Conformité normes'],
      color: 'from-purple-600 to-purple-800'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-900/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-400/5 rounded-full animate-float-fast"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec animations */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-blue-900 font-bold rounded-md shadow-lg mb-6 animate-bounce-gentle">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
            </svg>
            <span>NOS SERVICES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 animate-slideInUp">
            Excellence &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Innovation</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 animate-growWidth"></div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-300">
            Découvrez notre gamme complète de services en travaux publics et BTP. 
            Nous mettons notre expertise au service de vos projets les plus ambitieux 
            avec un engagement qualité et des solutions durables.
          </p>
        </div>

        {/* Grille des services avec animations ultra-modernes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-card-id={service.id}
              className={`service-card group relative cursor-pointer ${
                visibleCards.includes(service.id) ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Container principal avec glassmorphism */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-[0_20px_60px_0_rgba(31,38,135,0.25)] hover:scale-[1.02] hover:-translate-y-1">
                
                {/* Bordure animée */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-blue-600/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-glow"></div>
                
                {/* Mesh gradient background */}
                <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 bg-gradient-to-br ${service.color}`}></div>
                
                {/* Floating orbs */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-8 left-6 w-10 h-10 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-lg group-hover:scale-125 group-hover:translate-x-2 transition-all duration-1000"></div>
                
                {/* Contenu principal */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Badge numéro */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-xs font-bold text-blue-900 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    {service.id}
                  </div>
                  
                  {/* Icône moderne */}
                  <div className="mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <div className="relative w-20 h-20">
                      {/* Background avec effet néon */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                      
                      {/* Icône */}
                      <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500 border border-gray-100/50">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
                    </div>
                  </div>
                  
                  {/* Titre avec effet gradient */}
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent group-hover:from-yellow-600 group-hover:via-yellow-500 group-hover:to-yellow-600 transition-all duration-500">
                    {service.title}
                  </h3>
                  
                  {/* Description moderne */}
                  <p className="text-gray-600 leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Tags des fonctionnalités */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200/50 group-hover:from-yellow-50 group-hover:to-yellow-100 group-hover:text-yellow-800 group-hover:border-yellow-200/50 transform group-hover:scale-105 transition-all duration-300"
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-2 group-hover:animate-ping"></div>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Effet de scan lumineux */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-scan-top"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-600 to-transparent animate-scan-right"></div>
                </div>
                
                {/* Particules flottantes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-float-particle-1"></div>
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-float-particle-2"></div>
                  <div className="absolute bottom-1/3 left-2/3 w-0.5 h-0.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-float-particle-3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-20 text-center animate-fadeInUp animation-delay-600">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/10 rounded-full transform -translate-x-4 translate-y-4"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Prêt à démarrer votre projet ?
              </h3>
              <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé pour votre projet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded-lg hover:bg-white transition-colors duration-300 transform hover:scale-105 shadow-lg">
                  Demander un devis
                </button>
                <button className="border-2 border-yellow-400 text-yellow-400 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105">
                  Nos réalisations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS pour les animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes growWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 1; }
          50% { transform: translateY(-20px) translateX(-5px); opacity: 0.8; }
          75% { transform: translateY(-5px) translateX(10px); opacity: 1; }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          33% { transform: translateY(15px) translateX(-8px); opacity: 0.7; }
          66% { transform: translateY(-10px) translateX(8px); opacity: 1; }
        }
        
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-15px) translateX(5px) scale(1.5); opacity: 1; }
        }
        
        @keyframes scan-top {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scan-right {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        
        @keyframes border-glow {
          0%, 100% { background-size: 200% 200%; background-position: 0% 50%; }
          50% { background-size: 200% 200%; background-position: 100% 50%; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-growWidth {
          animation: growWidth 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default Services;