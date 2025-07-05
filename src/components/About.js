import React from 'react';
import { Building, MapPin, Users, Award, Shield, Target, Heart, Leaf, Wrench, HardHat } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Travaux Publics & Construction",
      description: "Spécialistes BTP pour tous vos projets de construction et travaux publics"
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Bâtiments & Assainissements",
      description: "Construction de bâtiments et systèmes d'assainissement de qualité"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Construction Management",
      description: "Gestion complète de projets de construction avec expertise reconnue"
    }
  ];

  const specialties = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Construction Management",
      description: "Spécialisé dans les BTP, routes, enrochement, assainissement et terrassement depuis 2000"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Assainissement",
      description: "Expertise en hydraulique, canalisations et stations d'épuration pour le secteur minier"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Terrassement",
      description: "Routes bitumées, pistes, échangeurs, ponts et voies de circulation aéroportuaires"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enrochement",
      description: "Travaux spécialisés d'enrochement avec sécurité et intégrité des ouvrages garanties"
    }
  ];

  const stats = [
    { number: "2000", label: "Année de Création" },
    { number: "500+", label: "Projets Réalisés" },
    { number: "20+", label: "Années d'Expérience" },
    { number: "24/7", label: "Service Client" }
  ];

  return (
    <div id="about" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 overflow-hidden">
      
      {/* Hero Section avec Logo */}
      <div className="relative py-20 md:py-32 bg-gradient-to-br from-white via-amber-50 to-gray-50">
        {/* Effets de lumière en arrière-plan */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Logo et Badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-2xl scale-150 animate-pulse"></div>
                <img
                  src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                  alt="DIA TRANSCOM"
                  className="w-32 h-32 md:w-32 md:h-32 object-contain filter drop-shadow-lg relative z-10"
                />
              </div>
              <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full shadow-lg shadow-amber-500/20 mb-8 animate-bounce">
                À PROPOS DE NOUS
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                DIA TRANSCOM
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Votre partenaire de confiance pour des solutions de 
              <span className="text-amber-600 font-semibold"> BTP et construction innovantes</span> au Sénégal depuis 2000
            </p>

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg group-hover:border-amber-400/50 transition-all duration-300 group-hover:scale-105">
                    <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                    <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Mission & Vision */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Notre Mission</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                Être les meilleurs spécialistes dans le domaine du BTP au Sénégal. Que ce soit en 
                <strong className="text-amber-600"> travaux publics, bâtiments ou assainissements</strong>, 
                nous disposons d'équipes hautement qualifiées pour répondre à l'ensemble de vos besoins 
                avec excellence et professionnalisme.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl shadow-xl p-8 md:p-10 text-white hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Notre Vision</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                Devenir l'<strong className="text-white">entreprise de référence</strong> en BTP et construction 
                au Sénégal et en Afrique de l'Ouest, reconnue pour la qualité de nos travaux, 
                notre expertise technique et notre engagement envers l'excellence dans tous nos projets.
              </p>
            </div>
          </div>

          {/* Services Phares */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-slate-800 mb-4">Nos Services Phares</h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Des solutions complètes BTP adaptées à tous vos projets de construction
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:border-amber-400/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mot du Directeur Général */}
          <div className="mb-20">
            <div className="relative bg-gradient-to-r from-slate-50 via-white to-amber-50 rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-200 overflow-hidden">
              {/* Arrière-plan décoratif */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-100/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-amber-50/50 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <span className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full text-sm shadow-lg tracking-wide">
                    MOT DU DIRECTEUR GÉNÉRAL
                  </span>
                </div>
                
                <div className="grid md:grid-cols-5 gap-12 items-start">
                  
                  {/* Photo du DG */}
                  <div className="md:col-span-2">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white p-3 rounded-3xl shadow-xl">
                        <img
                          src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1750464138/WhatsApp_Image_2025-05-19_at_18.23.12_ykneo6.jpg"
                          alt="Directeur Général - DIA TRANSCOM"
                          className="w-full rounded-2xl shadow-lg object-cover h-96 group-hover:scale-[1.02] transition-transform duration-700"
                        />
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenu du message */}
                  <div className="md:col-span-3">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                        "La qualité et l'expertise au service de 
                        <span className="text-amber-600"> vos projets</span>"
                      </h3>
                    </div>
                    
                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                      <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                        <p className="pl-8">
                          Depuis 2000, DIATRANSCOM s'est imposée comme un partenaire de confiance dans le secteur du BTP au Sénégal. 
                          Notre expertise couvre tous les domaines : <strong className="text-amber-600">construction management, 
                          assainissement, terrassement et enrochement</strong>.
                        </p>
                      </div>
                      
                      <p className="pl-8">
                        La qualité de notre travail, la rigueur de notre approche et notre aptitude à aborder 
                        des sujets complexes avec des résultats supérieurs aux attentes font de nous plus qu'un prestataire, 
                        mais un partenaire réputé pour nos clients.
                      </p>
                      
                      <p className="pl-8 font-medium">
                        Que vous soyez particuliers, administrations, entreprises ou ONG, nous garantissons 
                        un travail de qualité pour tous vos projets de construction et BTP.
                      </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-xl">Directeur Général</div>
                          <div className="text-amber-600 font-semibold">DIA TRANSCOM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nos Spécialités */}
          <div className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-3xl p-10 md:p-16 shadow-inner border border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-slate-800 mb-4">Nos Spécialités</h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Expertise complète dans tous les domaines du BTP et de la construction
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specialties.map((specialty, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 group-hover:border-amber-400/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white">{specialty.icon}</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-3">{specialty.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{specialty.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Prêt à réaliser votre projet BTP ?
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Contactez-nous dès aujourd'hui pour discuter de vos besoins en construction et découvrir notre expertise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-amber-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                    Demander un Devis
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
                    Nos Réalisations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;