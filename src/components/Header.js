import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("accueil")

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsScrolled(scrollY > 50)

            const sections = ["accueil", "about", "services", "testimonials", "contact"]
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section)
                if (!element) return false
                const rect = element.getBoundingClientRect()
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
        let targetId = sectionId
        if (typeof e === 'string') {
            targetId = e
        } else if (e && e.preventDefault) {
            e.preventDefault()
        }

        const element = document.getElementById(targetId)
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            });
        }
    }

    const navItems = [
        { id: "accueil", label: "Accueil" },
        { id: "about", label: "À propos" },
        { id: "services", label: "Services" },
        { id: "testimonials", label: "Avis" },
        { id: "contact", label: "Contact" },
    ]

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 transition-all duration-500 pointer-events-none"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border pointer-events-auto transition-all duration-500 ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)] scale-95 sm:scale-100"
                    : "bg-white/40 backdrop-blur-md border-white/10"
                    }`}
            >
                {/* Logo */}
                <a
                    href="#accueil"
                    onClick={(e) => scrollToSection(e, "accueil")}
                    className="flex-shrink-0 transition-transform active:scale-95"
                >
                    <img
                        src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                        alt="DIA TRANSCOM"
                        className="h-8 sm:h-10 object-contain"
                    />
                </a>

                {/* Desktop Nav - Hidden on mobile, rely on Bottom Nav instead */}
                <nav className="hidden lg:flex items-center gap-1 bg-slate-100/30 p-1 rounded-full border border-white/20">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className={`relative px-5 py-2 text-sm font-black transition-all duration-300 rounded-full ${activeSection === item.id
                                ? "text-blue-900 bg-white shadow-sm"
                                : "text-slate-500 hover:text-blue-900"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Right Action */}
                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "contact")}
                        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                    >
                        <span className="hidden sm:inline">Devis Gratuit</span>
                        <span className="sm:hidden">Devis</span>
                        <ArrowRight className="w-4 h-4 text-amber-500" />
                    </a>
                </div>
            </motion.div>
        </header>
    )
}

export default Header
