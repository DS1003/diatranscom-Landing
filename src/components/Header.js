"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("accueil")

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 50)

            // Détection de la section active
            const sections = ["accueil", "about", "services", "contact"]
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section)
                if (!element) return false
                const rect = element.getBoundingClientRect()
                return rect.top <= 100 && rect.bottom >= 100
            })

            if (currentSection) {
                setActiveSection(currentSection)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId === "accueil" ? "accueil" : sectionId)
        if (element) {
            const headerHeight = 80
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            })
        }
        setIsMenuOpen(false)
    }

    const navItems = [
        { id: "accueil", label: "Accueil" },
        { id: "about", label: "À propos" },
        { id: "services", label: "Services" },
        { id: "contact", label: "Contact" },
    ]

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-lg py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-shrink-0 transition-opacity hover:opacity-80 duration-200"
                        >
                            <img
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                alt="DIA TRANSCOM"
                                className={`object-contain transition-all duration-500 ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-14"} ${!isScrolled ? "brightness-0 invert opacity-90" : ""}`}
                            />
                        </button>

                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-5 py-2 text-[15px] font-semibold transition-all duration-300 rounded-lg ${activeSection === item.id
                                        ? "text-amber-500"
                                        : isScrolled ? "text-slate-700 hover:text-amber-600 hover:bg-slate-50" : "text-white/90 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-amber-500" : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"}`} />
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-6">
                                <a
                                    href="tel:+221761431807"
                                    className={`flex items-center gap-2 transition-all duration-300 group ${isScrolled ? "text-slate-600 hover:text-amber-600" : "text-white/80 hover:text-white"}`}
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm font-semibold tracking-wide">+221 76 143 18 07</span>
                                </a>
                                <div className={`w-px h-5 ${isScrolled ? "bg-slate-200" : "bg-white/20"}`} />
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className={`flex items-center gap-2 transition-all duration-300 group ${isScrolled ? "text-slate-600 hover:text-amber-600" : "text-white/80 hover:text-white"}`}
                                >
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-semibold tracking-wide">Contact</span>
                                </button>
                            </div>

                            <button
                                onClick={() => scrollToSection("contact")}
                                className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-500 ${isScrolled
                                        ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                                        : "bg-white text-slate-900 hover:bg-amber-400 hover:text-white"
                                    }`}
                            >
                                <span>Devis Gratuit</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${isScrolled ? "hover:bg-slate-100 text-slate-700" : "hover:bg-white/10 text-white"
                                    }`}
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                    <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                    alt="DIA TRANSCOM"
                                    className="w-12 h-12 object-contain"
                                />
                                <div>
                                    <h3 className="text-gray-900 font-bold text-base">DIA TRANSCOM</h3>
                                    <p className="text-amber-600 text-sm">Transport & Logistique</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <nav className="p-6">
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${activeSection === item.id ? "bg-amber-50 text-amber-600" : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 p-5 bg-gray-50 rounded-xl">
                                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Contactez-nous</h3>
                                <div className="space-y-3">
                                    <a
                                        href="tel:+221761431807"
                                        className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                                    >
                                        <div className="p-2 bg-white rounded-lg">
                                            <Phone className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <span className="text-sm font-medium">+221 76 143 18 07</span>
                                    </a>
                                    <a
                                        href="mailto:Ibrandiayedia1@gmail.com"
                                        className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                                    >
                                        <div className="p-2 bg-white rounded-lg">
                                            <Mail className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <span className="text-sm font-medium">Ibrandiayedia1@gmail.com</span>
                                    </a>
                                </div>
                            </div>

                            <button
                                onClick={() => scrollToSection("contact")}
                                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <span>Demander un Devis</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
