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
            const sections = ["accueil", "about", "services", "testimonials", "contact"]
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section)
                if (!element) return false
                const rect = element.getBoundingClientRect()
                // On considère la section active si elle occupe le centre de l'écran
                return rect.top <= 200 && rect.bottom >= 200
            })

            if (currentSection) {
                setActiveSection(currentSection)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (e, sectionId) => {
        // Handle case where e is the sectionId (backwards compatibility)
        let targetId = sectionId
        if (typeof e === 'string') {
            targetId = e
        } else if (e && e.preventDefault) {
            e.preventDefault()
        }

        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false)
    }

    const navItems = [
        { id: "accueil", label: "Accueil" },
        { id: "about", label: "À propos" },
        { id: "services", label: "Services" },
        { id: "testimonials", label: "Avis" },
        { id: "contact", label: "Contact" },
    ]

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
                    : "bg-white/70 backdrop-blur-md"
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between h-20">
                        <a
                            href="#accueil"
                            onClick={(e) => scrollToSection(e, "accueil")}
                            className="flex-shrink-0 transition-opacity hover:opacity-80 duration-200"
                        >
                            <img
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                alt="DIA TRANSCOM"
                                className={`object-contain transition-all duration-300 ${isScrolled ? "h-12" : "h-14"}`}
                            />
                        </a>

                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollToSection(e, item.id)}
                                    className={`relative px-5 py-2 text-[15px] font-medium transition-all duration-200 rounded-lg ${activeSection === item.id ? "text-amber-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
                                    )}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-6">
                                <a
                                    href="tel:+221761431807"
                                    className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 group"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm font-medium">+221 76 143 18 07</span>
                                </a>
                                <div className="w-px h-5 bg-gray-300" />
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, "contact")}
                                    className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 group"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">Contact</span>
                                </a>
                            </div>

                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "contact")}
                                className="hidden md:flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-md"
                            >
                                <span>Devis Gratuit</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
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
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${activeSection === item.id ? "bg-amber-50 text-amber-600" : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {item.label}
                                    </a>
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
                                        href="mailto:contact@diatranscom.sn"
                                        className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                                    >
                                        <div className="p-2 bg-white rounded-lg">
                                            <Mail className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <span className="text-sm font-medium">contact@diatranscom.sn</span>
                                    </a>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "contact")}
                                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <span>Demander un Devis</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
