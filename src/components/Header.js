import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        setIsMenuOpen(false)
    }

    const navItems = [
        { id: "accueil", label: "Accueil" },
        { id: "about", label: "À propos" },
        { id: "services", label: "Services" },
        { id: "testimonials", label: "Avis" },
        { id: "contact", label: "Contact" },
    ]

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    }

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-blue-900/5"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        <a
                            href="#accueil"
                            onClick={(e) => scrollToSection(e, "accueil")}
                            className="flex-shrink-0 transition-transform active:scale-95"
                        >
                            <img
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                alt="DIA TRANSCOM"
                                className={`object-contain transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`}
                            />
                        </a>

                        <div className="flex items-center gap-4">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-slate-900"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <div className="fixed inset-0 z-[100]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-0 right-0 w-full max-w-[320px] h-full bg-white shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-50">
                                <img
                                    src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
                                    alt="DIA TRANSCOM"
                                    className="h-10 object-contain"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.9, rotate: 90 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-3 rounded-2xl bg-slate-50 text-slate-900"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>

                            <nav className="p-8 flex-1 overflow-y-auto space-y-3">
                                {navItems.map((item) => (
                                    <motion.a
                                        variants={itemVariants}
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${activeSection === item.id
                                            ? "bg-blue-900 text-white shadow-xl shadow-blue-900/20"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{item.label}</span>
                                            {activeSection === item.id && <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />}
                                        </div>
                                    </motion.a>
                                ))}

                                <motion.div variants={itemVariants} className="pt-10 flex flex-col gap-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Support & Contact</p>
                                    <a
                                        href="tel:+221761431807"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-slate-700 active:scale-95 transition-all"
                                    >
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <span className="text-sm font-bold">+221 76 143 18 07</span>
                                    </a>
                                    <a
                                        href="mailto:contact@diatranscom.sn"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-slate-700 active:scale-95 transition-all"
                                    >
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-sm font-bold truncate">contact@diatranscom.sn</span>
                                    </a>
                                </motion.div>
                            </nav>

                            <motion.div variants={itemVariants} className="p-8 pt-0">
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, "contact")}
                                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-5 rounded-2xl text-lg font-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20"
                                >
                                    <span>Devis Gratuit</span>
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
