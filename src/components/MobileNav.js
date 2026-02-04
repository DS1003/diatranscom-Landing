import React from 'react';
import { Home, Info, Briefcase, MessageSquare, Phone } from 'lucide-react';

const MobileNav = () => {
    const navItems = [
        { id: 'accueil', icon: Home, label: 'Accueil' },
        { id: 'about', icon: Info, label: 'À propos' },
        { id: 'services', icon: Briefcase, label: 'Services' },
        { id: 'testimonials', icon: MessageSquare, label: 'Avis' },
        { id: 'contact', icon: Phone, label: 'Contact' }
    ];

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
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
            <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 pb-safe flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                {navItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToSection(item.id)}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className="p-1 rounded-lg group-active:scale-95 transition-transform">
                            <item.icon className="w-6 h-6 text-slate-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileNav;
