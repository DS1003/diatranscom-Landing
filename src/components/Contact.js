
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Configuration et données
const CONTACT_CONFIG = {
  services: [
    'Assainissement',
    'Terrassement', 
    'Enrochement',
    'Travaux BTP',
    'Génie Civil',
    'Conseil & Expertise'
  ],
  contactMethods: [
    {
      id: 'email',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Email Professionnel',
      primary: 'contact@entreprise.com',
      secondary: 'Réponse sous 24h garantie',
      gradient: 'from-blue-600 to-blue-800',
      bgGradient: 'from-blue-50 to-blue-100/50'
    },
    {
      id: 'phone',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      title: 'Téléphone Direct',
      primary: '+33 1 23 45 67 89',
      secondary: 'Lun-Ven 8h-18h',
      gradient: 'from-yellow-500 to-yellow-700',
      bgGradient: 'from-yellow-50 to-yellow-100/50'
    },
    {
      id: 'location',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Bureau Principal',
      primary: '123 Avenue des Travaux',
      secondary: '75000 Paris, France',
      gradient: 'from-gray-600 to-gray-800',
      bgGradient: 'from-gray-50 to-gray-100/50'
    }
  ],
  faqs: [
    {
      question: 'Quel est votre délai de réponse ?',
      answer: 'Nous nous engageons à vous répondre sous 24h ouvrées maximum.'
    },
    {
      question: 'Proposez-vous des devis gratuits ?',
      answer: 'Oui, tous nos devis sont gratuits et sans engagement de votre part.'
    },
    {
      question: 'Intervenez-vous sur toute la France ?',
      answer: 'Nous intervenons principalement en Île-de-France et régions limitrophes.'
    },
    {
      question: 'Travaillez-vous avec les particuliers ?',
      answer: 'Nous accompagnons aussi bien particuliers que professionnels et collectivités.'
    }
  ]
};

// Hooks personnalisés
const useIntersectionObserver = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animate-id');
          if (entry.isIntersecting && elementId) {
            setVisibleElements(prev => new Set([...prev, elementId]));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach(element => observer.observe(element));

    const timer = setTimeout(() => setIsInitialLoad(false), 100);

    return () => {
      elements.forEach(element => observer.unobserve(element));
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const getAnimationClasses = useCallback((elementId, baseClasses = '', animatedClasses = '', delay = '') => {
    const isVisible = visibleElements.has(elementId);
    return `${baseClasses} ${isVisible || isInitialLoad ? animatedClasses : ''} transition-all duration-700 ${delay}`.trim();
  }, [visibleElements, isInitialLoad]);

  return { getAnimationClasses };
};

const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  }, []);

  return {
    formData,
    submitting,
    submitted,
    focusedField,
    setFocusedField,
    handleChange,
    handleSubmit
  };
};

// Composants d'interface
const IconSVG = React.memo(({ path, className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
));

const LoadingSpinner = React.memo(() => (
  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
));

const BackgroundElements = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/8 rounded-full animate-pulse blur-xl"></div>
    <div className="absolute bottom-32 right-16 w-56 h-56 bg-blue-900/8 rounded-full animate-pulse blur-2xl"></div>
    <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-yellow-400/6 rounded-full animate-pulse blur-lg"></div>
    <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-blue-600/5 rounded-full animate-pulse blur-xl"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-yellow-50/20"></div>
  </div>
));

// Section Header
const HeaderSection = React.memo(({ getAnimationClasses }) => (
  <header 
    className={getAnimationClasses('header', 'text-center mb-20 opacity-0 translate-y-8', 'opacity-100 translate-y-0')}
    data-animate-id="header"
  >
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 via-blue-600/20 to-yellow-400/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30 mb-8 shadow-lg">
      <div className="relative">
        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
      </div>
      <span className="text-sm font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent tracking-wider">
        CONTACTEZ-NOUS
      </span>
      <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
    </div>

    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
      <span className="block bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
        Transformons
      </span>
      <span className="block bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        Votre Vision
      </span>
    </h1>

    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      </div>
    </div>

    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
      Prêt à concrétiser vos projets les plus ambitieux ? Notre équipe d'experts vous accompagne 
      de l'idée à la réalisation avec <span className="font-semibold text-blue-700">excellence</span> et <span className="font-semibold text-yellow-600">innovation</span>.
    </p>
  </header>
));

// Composants de formulaire
const FormInput = React.memo(({ name, label, type = "text", required = false, placeholder, rows = null, value, onChange, focusedField, setFocusedField }) => (
  <div className="group">
    <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField('')}
          required={required}
          rows={rows}
          className="w-full px-6 py-4 bg-white/60 border-2 border-gray-200/60 rounded-2xl focus:border-yellow-400 focus:bg-white/90 transition-all duration-500 text-gray-900 placeholder-gray-500 resize-none font-medium hover:border-gray-300/80 focus:shadow-lg focus:outline-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField('')}
          required={required}
          className="w-full px-6 py-4 bg-white/60 border-2 border-gray-200/60 rounded-2xl focus:border-yellow-400 focus:bg-white/90 transition-all duration-500 text-gray-900 placeholder-gray-500 font-medium hover:border-gray-300/80 focus:shadow-lg focus:outline-none"
          placeholder={placeholder}
        />
      )}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-blue-600/10 -z-10 transition-all duration-500 ${focusedField === name ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}></div>
    </div>
  </div>
));

const FormSelect = React.memo(({ name, label, options, required = false, placeholder, value, onChange, focusedField, setFocusedField }) => (
  <div className="group">
    <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField('')}
        required={required}
        className="w-full px-6 py-4 bg-white/60 border-2 border-gray-200/60 rounded-2xl focus:border-yellow-400 focus:bg-white/90 transition-all duration-500 text-gray-900 font-medium hover:border-gray-300/80 focus:shadow-lg appearance-none cursor-pointer focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <IconSVG path="M19 9l-7 7-7-7" className="w-5 h-5 text-gray-500" />
      </div>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-yellow-400/10 -z-10 transition-all duration-500 ${focusedField === name ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}></div>
    </div>
  </div>
));

const SuccessMessage = React.memo(() => (
  <div className="text-center py-16">
    <div className="relative mb-8">
      <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
        <IconSVG path="M5 13l4 4L19 7" className="w-12 h-12 text-blue-900" />
      </div>
      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-full mx-auto animate-ping"></div>
    </div>
    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-4">
      Message Envoyé !
    </h3>
    <p className="text-gray-600 text-lg">
      Notre équipe vous recontactera sous <span className="font-semibold text-yellow-600">24h</span> pour discuter de votre projet.
    </p>
  </div>
));

// Formulaire de contact principal
const ContactForm = React.memo(({ getAnimationClasses, formHook }) => {
  const { formData, submitting, submitted, focusedField, setFocusedField, handleChange, handleSubmit } = formHook;

  return (
    <section 
      className={getAnimationClasses('form', 'mb-16 opacity-0 -translate-x-8', 'opacity-100 translate-x-0')}
      data-animate-id="form"
    >
      <div className="relative group max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-[0_20px_60px_0_rgba(31,38,135,0.15)] group-hover:shadow-[0_30px_80px_0_rgba(31,38,135,0.25)] transition-all duration-700"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-blue-600/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-8 right-8 w-2 h-2 bg-yellow-400/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
          <div className="absolute bottom-12 left-12 w-1.5 h-1.5 bg-blue-600/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
          <div className="absolute top-1/2 right-16 w-1 h-1 bg-yellow-500/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
        </div>

        <div className="relative p-10">
          {submitted ? (
            <SuccessMessage />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput 
                  name="name" 
                  label="NOM COMPLET" 
                  required 
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FormInput 
                  name="email" 
                  label="EMAIL PROFESSIONNEL" 
                  type="email" 
                  required 
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput 
                  name="company" 
                  label="ENTREPRISE" 
                  placeholder="Nom de votre entreprise"
                  value={formData.company}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FormSelect 
                  name="service" 
                  label="SERVICE RECHERCHÉ" 
                  options={CONTACT_CONFIG.services} 
                  required 
                  placeholder="Sélectionnez un service"
                  value={formData.service}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>
              
              <FormInput 
                name="message" 
                label="DÉCRIVEZ VOTRE PROJET" 
                required 
                rows={6}
                placeholder="Parlez-nous de votre projet : objectifs, contraintes, budget approximatif, délais souhaités..."
                value={formData.message}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold px-8 py-5 rounded-2xl transition-all duration-500 hover:from-yellow-500 hover:to-yellow-600 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden text-lg tracking-wide"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {submitting ? (
                    <span className="flex items-center justify-center relative z-10">
                      <LoadingSpinner />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center">
                      ENVOYER MA DEMANDE
                      <IconSVG path="M17 8l4 4m0 0l-4 4m4-4H3" className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

// Carte de méthode de contact
const ContactMethodCard = React.memo(({ method, index, getAnimationClasses }) => (
  <div 
    className={getAnimationClasses(`contact-${method.id}`, 'group relative cursor-pointer mb-6 opacity-0 translate-y-8', 'opacity-100 translate-y-0', `delay-${index * 200}`)}
    data-animate-id={`contact-${method.id}`}
  >
    <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-[0_15px_45px_0_rgba(31,38,135,0.12)] hover:shadow-[0_25px_65px_0_rgba(31,38,135,0.2)] transition-all duration-700 hover:scale-[1.03] overflow-hidden">
      
      <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-yellow-500/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
      </div>
      
      <div className="flex items-start space-x-6 relative z-10">
        <div className="relative group-hover:scale-110 transition-transform duration-500">
          <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500 rotate-3 group-hover:rotate-6`}>
            <IconSVG path={method.icon} className="w-8 h-8 text-white" />
          </div>
          <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-900 transition-colors duration-300">
            {method.title}
          </h3>
          <p className="text-gray-800 font-semibold text-lg mb-1 group-hover:text-yellow-700 transition-colors duration-300">
            {method.primary}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            {method.secondary}
          </p>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          <IconSVG path="M17 8l4 4m0 0l-4 4m4-4H3" className="w-6 h-6 text-gray-400" />
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
      </div>
    </div>
  </div>
));

// Section des méthodes de contact
const ContactMethodsSection = React.memo(({ getAnimationClasses }) => (
  <section className="mb-16">
    <div className="grid lg:grid-cols-3 gap-6">
      {CONTACT_CONFIG.contactMethods.map((method, index) => (
        <ContactMethodCard 
          key={method.id} 
          method={method} 
          index={index} 
          getAnimationClasses={getAnimationClasses}
        />
      ))}
    </div>
  </section>
));

// Section FAQ
const FAQSection = React.memo(({ getAnimationClasses }) => (
  <section 
    className={getAnimationClasses('faq', 'relative group mb-16 opacity-0 translate-y-8', 'opacity-100 translate-y-0')}
    data-animate-id="faq"
  >
    <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-[0_15px_45px_0_rgba(31,38,135,0.12)] hover:shadow-[0_25px_65px_0_rgba(31,38,135,0.2)] transition-all duration-700">
      
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <IconSVG path="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
          Questions Fréquentes
        </h2>
      </div>

      <div className="space-y-6">
        {CONTACT_CONFIG.faqs.map((faq, index) => (
          <article key={index} className="group border-b border-gray-200/50 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-blue-900 font-bold text-sm">Q</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-900 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200/50">
        <div className="text-center">
          <p className="text-gray-600 mb-4 font-medium">
            Vous avez d'autres questions ?
          </p>
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <IconSVG path="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-3l-3 3v-3H9a2 2 0 01-2-2V10a2 2 0 012-2h2M7 8V6a3 3 0 016 0v2" className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              Nous écrire directement
            </span>
            <IconSVG path="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  </section>
));

// Section footer/CTA
const FooterCTASection = React.memo(({ getAnimationClasses }) => (
  <section 
    className={getAnimationClasses('footer-cta', 'relative group mb-12 opacity-0 translate-y-8', 'opacity-100 translate-y-0')}
    data-animate-id="footer-cta"
  >
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 via-transparent to-yellow-500/20 rounded-3xl"></div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-8 left-8 w-4 h-4 bg-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-500/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative p-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-white/90 tracking-wider">
              ENGAGEMENT QUALITÉ
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Votre Projet Mérite
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Notre Excellence
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Depuis plus de 15 ans, nous transformons les défis techniques en réussites durables. 
            Faites confiance à notre expertise pour <span className="font-semibold text-yellow-300">concrétiser vos ambitions</span>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Devis Gratuit', 'Réponse 24h', 'Garantie Travaux', 'Suivi Personnalisé'].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <IconSVG path="M5 13l4 4L19 7" className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-8 py-4 rounded-2xl transition-all duration-500 hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center gap-2">
              <IconSVG path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-5 h-5" />
              Appelez-nous maintenant
            </span>
          </button>
          
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white mb-1">
              +33 1 23 45 67 89
            </div>
            <div className="text-sm text-white/70">
              Lun-Ven • 8h-18h
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

// Composant principal
const ContactPage = () => {
  const { getAnimationClasses } = useIntersectionObserver();
  const formHook = useContactForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/20 relative">
      <BackgroundElements />
      
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        <HeaderSection getAnimationClasses={getAnimationClasses} />
        <ContactForm getAnimationClasses={getAnimationClasses} formHook={formHook} />
        <ContactMethodsSection getAnimationClasses={getAnimationClasses} />
        <FAQSection getAnimationClasses={getAnimationClasses} />
        <FooterCTASection getAnimationClasses={getAnimationClasses} />
      </div>
      
      {/* Effet de grain subtil */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
    </div>
  );
};

export default ContactPage;