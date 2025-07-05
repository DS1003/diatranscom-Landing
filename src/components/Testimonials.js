
import React, { useState, useEffect } from 'react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('#temoignages');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Jean-Claude Martineau",
            role: "Maire de Villeurbanne",
            company: "Mairie de Villeurbanne",
            quote: "L'équipe a réalisé nos travaux d'assainissement avec un professionnalisme exemplaire. Le respect des délais et la qualité d'exécution ont dépassé nos attentes. Un partenaire de confiance pour nos futurs projets d'infrastructure.",
            rating: 5,
            project: "Réseau d'assainissement urbain"
        },
        {
            id: 2,
            name: "Marie Dubois",
            role: "Directrice Technique",
            company: "Groupe Immobilier Lyon",
            quote: "Les travaux de terrassement pour notre nouveau complexe résidentiel ont été menés avec une expertise remarquable. La coordination avec nos équipes et la gestion environnementale ont été parfaites.",
            rating: 5,
            project: "Terrassement complexe résidentiel"
        },
        {
            id: 3,
            name: "Pierre Rousseau",
            role: "Ingénieur Chef de Projet",
            company: "SNCF Réseau",
            quote: "Pour nos travaux d'infrastructure ferroviaire, nous avions besoin d'une expertise pointue en génie civil. L'équipe a su répondre à nos exigences techniques les plus strictes avec une approche innovante.",
            rating: 5,
            project: "Infrastructure ferroviaire"
        },
        {
            id: 4,
            name: "Sophie Legrand",
            role: "Responsable Travaux",
            company: "Conseil Départemental",
            quote: "La réalisation de nos ouvrages de soutènement et d'enrochement a été exemplaire. La qualité des matériaux, le respect de l'environnement et la sécurité ont été au cœur de leur prestation.",
            rating: 5,
            project: "Enrochement et soutènement"
        },
    ];

    const nextSlide = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section
            id="temoignages"
            className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 relative overflow-hidden"
        >
            {/* Éléments décoratifs subtiles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/3 via-transparent to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-600/3 via-transparent to-transparent rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* En-tête moderne */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center px-5 py-2.5 bg-white/70 backdrop-blur-md border border-slate-200/40 text-slate-700 font-medium rounded-2xl shadow-sm mb-8 hover:shadow-lg transition-all duration-300 hover:bg-white/90">
                        <svg className="w-4 h-4 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm tracking-wide">TÉMOIGNAGES CLIENTS</span>
                    </div>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                        Découvrez les retours de nos clients qui témoignent de notre excellence.
                    </p>
                </div>

                {/* Carousel mobile et tablette */}
                <div className="lg:hidden relative">
                    <div className="overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <div className={`group bg-white/60 backdrop-blur-xl rounded-3xl p-10 shadow-xl shadow-slate-200/50 border border-white/20 h-full flex flex-col transform transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/30 hover:scale-[1.01] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                        style={{ transitionDelay: `${index * 150}ms` }}>

                                        {/* En-tête avec avatar minimaliste */}
                                        <div className="flex items-start mb-10">
                                            <div className="relative flex-shrink-0">
                                                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center text-white font-light text-lg shadow-lg">
                                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-5 flex-1 min-w-0">
                                                <h3 className="text-slate-900 font-medium text-lg mb-1 truncate">{testimonial.name}</h3>
                                                <p className="text-blue-600 font-medium text-sm mb-0.5">{testimonial.role}</p>
                                                <p className="text-slate-500 text-sm truncate">{testimonial.company}</p>
                                            </div>
                                        </div>

                                        {/* Étoiles épurées */}
                                        <div className="flex items-center mb-8 gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500"></div>
                                            ))}
                                        </div>

                                        {/* Citation épurée */}
                                        <div className="flex-1 mb-8">
                                            <p className="text-slate-700 leading-relaxed text-lg font-light">{testimonial.quote}</p>
                                        </div>

                                        {/* Badge projet minimaliste */}
                                        <div className="inline-flex items-center px-4 py-2 bg-slate-50/80 backdrop-blur-sm text-slate-700 text-sm font-medium rounded-xl border border-slate-200/50 self-start">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5"></div>
                                            {testimonial.project}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Boutons de navigation épurés */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 hover:scale-110"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 hover:scale-110"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicateurs minimalistes */}
                    <div className="flex justify-center mt-10 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${activeIndex === index
                                        ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-slate-700'
                                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Grille desktop raffinée */}
                <div className="hidden lg:grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`group bg-white/60 backdrop-blur-xl rounded-3xl p-10 shadow-xl shadow-slate-200/50 border border-white/20 h-full flex flex-col transform transition-all duration-700 hover:shadow-2xl hover:shadow-slate-300/30 hover:scale-[1.02] hover:-translate-y-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* En-tête avec avatar minimaliste */}
                            <div className="flex items-start mb-10">
                                <div className="relative flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center text-white font-light text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 flex-1 min-w-0">
                                    <h3 className="text-slate-900 font-medium text-lg mb-1 group-hover:text-slate-800 transition-colors duration-300">{testimonial.name}</h3>
                                    <p className="text-blue-600 font-medium text-sm mb-0.5">{testimonial.role}</p>
                                    <p className="text-slate-500 text-sm">{testimonial.company}</p>
                                </div>
                            </div>

                            {/* Étoiles épurées avec animation */}
                            <div className="flex items-center mb-8 gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 group-hover:scale-110 transition-transform duration-300"
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                    ></div>
                                ))}
                            </div>

                            {/* Citation épurée */}
                            <div className="flex-1 mb-8 relative">
                                <p className="text-slate-700 leading-relaxed text-lg font-light group-hover:text-slate-800 transition-colors duration-300">{testimonial.quote}</p>
                            </div>

                            {/* Badge projet minimaliste */}
                            <div className="inline-flex items-center px-4 py-2 bg-slate-50/80 backdrop-blur-sm group-hover:bg-slate-100/80 text-slate-700 text-sm font-medium rounded-xl border border-slate-200/50 group-hover:border-slate-300/50 self-start transition-all duration-300">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 group-hover:animate-pulse"></div>
                                {testimonial.project}
                            </div>

                            {/* Effet de brillance subtil au hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Section logos partenaires avec défilement automatique */}
                <div className={`mt-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 tracking-tight">
                            Ils nous font <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800">confiance</span>
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-8 rounded-full"></div>
                    </div>

                    {/* Container pour le défilement */}
                    <div className="relative overflow-hidden">
                        {/* Gradient masks pour l'effet de fade */}
                        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>

                        {/* Défilement automatique */}
                        <div className="flex animate-scroll">
                            {/* Premier set de logos */}
                            <div className="flex items-center space-x-16 px-8">
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">SNCF</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">VINCI</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">BOUYGUES</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">EIFFAGE</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">COLAS</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">RATP</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">ENGIE</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">VEOLIA</span>
                                </div>
                            </div>

                            {/* Duplication pour l'effet de défilement infini */}
                            <div className="flex items-center space-x-16 px-8">
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">SNCF</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">VINCI</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">BOUYGUES</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">EIFFAGE</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">COLAS</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">RATP</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">ENGIE</span>
                                </div>
                                <div className="flex-shrink-0 w-32 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <span className="text-slate-600 font-medium text-sm">VEOLIA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section statistiques ultra-moderne et épurée */}
                <div className={`mt-28 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 md:p-20 text-center">
                        {/* Pattern géométrique subtil */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 left-0 w-full h-full"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                      radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                                    backgroundSize: '60px 60px'
                                }}>
                            </div>
                        </div>

                        {/* Gradient overlay subtil */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-amber-400/5"></div>

                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-8 rounded-full"></div>
                                <h3 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                                    <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">150+</span> projets d'excellence
                                </h3>
                                <p className="text-slate-300 mb-16 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                                    Une expertise reconnue qui se traduit par des résultats concrets et mesurables.
                                </p>
                            </div>

                            {/* Statistiques en grille minimaliste */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                                <div className="group text-center">
                                    <div className="text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-300 mb-4 group-hover:scale-110 transition-transform duration-300">98</div>
                                    <div className="text-amber-400/60 text-xs uppercase tracking-widest font-medium mb-1">POURCENTAGE</div>
                                    <div className="text-slate-300 text-sm font-light">Satisfaction client</div>
                                </div>
                                <div className="group text-center">
                                    <div className="text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-300 mb-4 group-hover:scale-110 transition-transform duration-300">25</div>
                                    <div className="text-blue-400/60 text-xs uppercase tracking-widest font-medium mb-1">ANNÉES</div>
                                    <div className="text-slate-300 text-sm font-light">D'expérience</div>
                                </div>
                                <div className="group text-center">
                                    <div className="text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-300 mb-4 group-hover:scale-110 transition-transform duration-300">150</div>
                                    <div className="text-emerald-400/60 text-xs uppercase tracking-widest font-medium mb-1">PROJETS</div>
                                    <div className="text-slate-300 text-sm font-light">Réalisés</div>
                                </div>
                                <div className="group text-center">
                                    <div className="text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-300 mb-4 group-hover:scale-110 transition-transform duration-300">100</div>
                                    <div className="text-purple-400/60 text-xs uppercase tracking-widest font-medium mb-1">RESPECT</div>
                                    <div className="text-slate-300 text-sm font-light">Des délais</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS pour animations personnalisées */}
            <style jsx>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default Testimonials;