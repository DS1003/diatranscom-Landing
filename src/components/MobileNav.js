import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Briefcase, MessageSquare, Phone } from 'lucide-react';

const MobileNav = () => {
    const [activeSection, setActiveSection] = useState("accueil");

    const navItems = [
        { id: 'accueil', icon: Home, label: 'Accueil' },
        { id: 'about', icon: Info, label: 'À propos' },
        { id: 'services', icon: Briefcase, label: 'Services' },
        { id: 'testimonials', icon: MessageSquare, label: 'Avis' },
        { id: 'contact', icon: Phone, label: 'Contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.id);
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section);
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                return rect.top <= 300 && rect.bottom >= 300;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] md:hidden flex justify-center px-4">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 px-2 py-2 rounded-[2rem] flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
                {navItems.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(item.id)}
                            className="relative flex flex-col items-center justify-center w-16 h-14 transition-all duration-300 rounded-2xl group overflow-hidden"
                        >
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavBg"
                                        className="absolute inset-2 bg-amber-500 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 flex flex-col items-center">
                                <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-slate-950 scale-110' : 'text-white/60 group-hover:text-white'}`} />
                                <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 transition-all duration-300 ${isActive ? 'text-slate-950 translate-y-0.5' : 'text-white/40 group-hover:text-white/60'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Active dot indicator if not the active background */}
                            {!isActive && (
                                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                            )}
                        </button>
                    )
                })}
            </motion.div>
        </div>
    );
};

export default MobileNav;
