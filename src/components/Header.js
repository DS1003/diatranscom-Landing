import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Détection de la section active
      const sections = ['accueil', 'about', 'services', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId === 'accueil' ? 'accueil' : sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Header principal */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-200 py-1.5 shadow-lg shadow-gray-100/50' 
          : 'bg-white/90 backdrop-blur-xl py-2.5 shadow-sm'
      }`}>
        
        {/* Effet de lumière en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-2 relative">
          <div className="flex items-center justify-between">
            
            {/* Logo simple */}
            <button 
              onClick={() => window.location.reload()}
              className="flex-shrink-0 group relative"
            >
              <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <img
                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                alt="DIA TRANSCOM"
                className={`object-contain w-[200px] transition-all duration-500 filter drop-shadow-md relative z-10 ${
                  isScrolled ? 'w-14 h-14' : 'w-16 h-16'
                }`}
              />
            </button>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-1 bg-gray-50/80 backdrop-blur-md rounded-full p-2 border border-gray-200/50 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeSection === item.id 
                      ? 'text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse opacity-20"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Contact rapide - desktop */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-slate-600 hover:text-amber-600 transition-colors duration-200 cursor-pointer group">
                  <div className="p-2 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors duration-200">
                    <Phone className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-medium">+221 76 143 18 07</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-slate-600 hover:text-amber-600 transition-colors duration-200 cursor-pointer group">
                  <div className="p-2 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors duration-200">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-medium">Contact</span>
                </div>
              </div>

              {/* Bouton CTA avec effet premium */}
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Devis Gratuit</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Menu mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-xl bg-gray-100 backdrop-blur-sm border border-gray-200 hover:bg-gray-200 transition-all duration-300 group"
                aria-label="Menu"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-slate-700 group-hover:text-amber-600 transition-colors duration-200" />
                  ) : (
                    <Menu className="w-6 h-6 text-slate-700 group-hover:text-amber-600 transition-colors duration-200" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile premium */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-2xl border-l border-gray-200 shadow-2xl">
            
            {/* Header du menu avec effet glow */}
            <div className="p-8 border-b border-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent"></div>
              <div className="flex items-center justify-between relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200">
                    <img
                      src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                      alt="DIA TRANSCOM"
                      className="w-12 h-12 object-contain filter drop-shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-slate-800 font-bold text-lg">DIA TRANSCOM</h3>
                    <p className="text-amber-600 text-sm">Transport & Logistique</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Navigation mobile */}
            <nav className="p-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25' 
                        : 'text-slate-700 hover:bg-gray-100 hover:text-slate-900'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Contact mobile premium */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl border border-gray-200 backdrop-blur-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span>Contactez-nous</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors duration-200 cursor-pointer group">
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors duration-200">
                      <Phone className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-medium">+221 76 143 18 07</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors duration-200 cursor-pointer group">
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-medium">Ibrandiayedia1@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors duration-200 cursor-pointer group">
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors duration-200">
                      <MapPin className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-medium">Dakar, Sénégal</span>
                  </div>
                </div>
              </div>

              {/* CTA mobile premium */}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Demander un Devis</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;