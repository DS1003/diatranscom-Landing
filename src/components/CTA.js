
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Award, Camera, ExternalLink, ArrowRight, Building2, Presentation, Handshake, Trophy, Zap, Globe, Target, TrendingUp, Star, CheckCircle } from 'lucide-react';

const ModernSalonSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('salon-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Auto-slide pour les highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const salonEvent = {
    id: 1,
    title: "Mission Économique Royale Belge au Sénégal",
    subtitle: "Son Altesse Royale la Princesse Astrid - Mission Économique et Commerciale",
    date: "22-25 Mai 2023",
    location: "Dakar, Sénégal",
    description: "DIA TRANSCOM a eu l'honneur de participer à la prestigieuse mission économique organisée par l'Ambassade de Belgique, accompagnant Son Altesse Royale la Princesse Astrid. Une délégation de 362 personnes représentant 187 entreprises et institutions belges pour rencontrer des partenaires au Sénégal et discuter de projets et collaborations.",
    image: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1750465857/WhatsApp_Image_2025-05-19_at_18.23.13_gkhvao.jpg",
    participants: "362 délégués - 187 entreprises",
    delegation: "Mission Royale Officielle",
    status: "Terminé",
    gallery: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg",
        title: "Accueil de la délégation royale",
        description: "Cérémonie d'accueil officielle de Son Altesse Royale"
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg",
        title: "Rencontres B2B avec les entreprises belges",
        description: "Sessions de networking et discussions de partenariats"
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg",
        title: "Signature d'accords de collaboration",
        description: "Formalisation des partenariats stratégiques"
      }
    ],
    features: [
      {
        icon: Building2,
        title: "Délégation Officielle",
        description: "362 délégués représentant 187 entreprises et institutions belges"
      },
      {
        icon: Presentation,
        title: "Rencontres B2B",
        description: "Sessions privilégiées avec les leaders économiques belges"
      },
      {
        icon: Handshake,
        title: "Partenariats Stratégiques",
        description: "Négociations et accords de collaboration bilatérale"
      }
    ],
    highlights: [
      {
        title: "Mission Royale",
        description: "Honneur de participer à la mission officielle de Son Altesse Royale la Princesse Astrid",
        icon: Trophy,
        color: "from-purple-500 to-pink-500"
      },
      {
        title: "Opportunités Internationales",
        description: "Ouverture de nouveaux marchés avec les entreprises belges de premier plan",
        icon: Globe,
        color: "from-blue-500 to-cyan-500"
      },
      {
        title: "Accords Signés",
        description: "Formalisation de partenariats durables pour le développement mutuel",
        icon: Target,
        color: "from-orange-500 to-red-500"
      }
    ],
    stats: [
      { number: "362", label: "Délégués", icon: Users },
      { number: "187", label: "Entreprises", icon: Building2 },
      { number: "4", label: "Jours", icon: Calendar },
      { number: "25+", label: "Accords", icon: Handshake }
    ],
    timeline: [
      { date: "22 Mai", event: "Cérémonie d'Ouverture Royale", status: "completed" },
      { date: "23 Mai", event: "Rencontres B2B & Networking", status: "completed" },
      { date: "24 Mai", event: "Signature d'Accords", status: "completed" },
      { date: "25 Mai", event: "Clôture & Bilan", status: "completed" }
    ]
  };

  // State pour la galerie
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <section id="salon-section" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 w-8 h-8 border-2 border-blue-400/30 rotate-45 animate-spin"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-64 left-1/4 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Salon Professionnel 2025</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-600 to-purple-600 mb-6 leading-tight">
            BTP <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">DAKAR</span>
            <br />2025
          </h1>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            {salonEvent.subtitle}
          </p>
        </div>

        {/* Main Event Card */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-16">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto">
                <img
                  src={salonEvent.image}
                  alt={salonEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-purple-500/90 backdrop-blur-sm text-white rounded-full text-sm font-bold flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Mission Royale</span>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-2 gap-3">
                    {salonEvent.stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="w-5 h-5 text-white" />
                          <div>
                            <div className="text-white font-bold text-lg">{stat.number}</div>
                            <div className="text-white/80 text-xs">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {salonEvent.title}
                </h2>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {salonEvent.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm font-medium">Dates</div>
                      <div className="font-bold text-slate-900">{salonEvent.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm font-medium">Lieu</div>
                      <div className="font-bold text-slate-900">{salonEvent.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm font-medium">Visiteurs</div>
                      <div className="font-bold text-slate-900">{salonEvent.participants}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm font-medium">Délégation</div>
                      <div className="font-bold text-slate-900">{salonEvent.delegation}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setSelectedImage(salonEvent.gallery[0])}
                    className="group flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <span>Voir la Galerie</span>
                    <Camera className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  
                  <button className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 flex items-center justify-center space-x-3">
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Plus d'infos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Galerie Photo Interactive */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Galerie de la Mission</h3>
            <p className="text-slate-600 text-lg">Moments marquants de la mission économique royale belge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salonEvent.gallery.map((photo, index) => (
              <div 
                key={photo.id} 
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onClick={() => setSelectedImage(photo)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h4 className="font-bold text-lg mb-2">{photo.title}</h4>
                  <p className="text-sm text-gray-200 line-clamp-2">{photo.description}</p>
                </div>

                {/* Photo Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Galerie */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Header Modal */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                <p className="text-blue-100 mt-2">{selectedImage.description}</p>
              </div>

              {/* Image principale */}
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Navigation galerie */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900">Autres photos de la mission</h4>
                  <span className="text-sm text-slate-500">
                    {salonEvent.gallery.findIndex(img => img.id === selectedImage.id) + 1} / {salonEvent.gallery.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {salonEvent.gallery.map((photo) => (
                    <div 
                      key={photo.id}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                        photo.id === selectedImage.id 
                          ? 'ring-4 ring-blue-500 scale-105' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Ce qui Vous Attend</h3>
            <p className="text-slate-600 text-lg">Découvrez les expériences uniques que nous avons préparées</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {salonEvent.features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Carousel */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Points Forts de Notre Participation</h3>
            <p className="text-slate-600 text-lg">Les moments clés qui définiront notre présence</p>
          </div>

          <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
            <div className="relative">
              {salonEvent.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${highlight.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                      <highlight.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{highlight.title}</h4>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {salonEvent.highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={`mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Programme de l'Événement</h3>
            <p className="text-slate-600 text-lg">Planning détaillé de nos 4 jours au salon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salonEvent.timeline.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.event}</h4>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 text-sm font-medium">Programmé</span>
                    </div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < salonEvent.timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 rounded-3xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Rendez-vous au BTP Dakar 2025</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Rejoignez-nous pour découvrir l'avenir du BTP au Sénégal et en Afrique de l'Ouest. 
                Une expérience inoubliable vous attend sur notre stand premium de 200m².
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  Prendre Rendez-vous
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                  Plus d'Informations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ModernSalonSection;