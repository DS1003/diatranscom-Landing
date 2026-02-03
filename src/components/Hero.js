"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    ArrowRight,
    Phone,
    MapPin,
    TrendingUp,
    Award,
    Users,
    CheckCircle2,
    Clock,
    Shield,
    Wrench,
    Hammer,
    Building2,
    ClipboardList,
    Sparkles,
} from "lucide-react"

const AnimatedCounter = ({ value, suffix, isVisible }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isVisible, value])

    return (
        <span className="text-xl sm:text-2xl lg:text-3xl font-black">
            {count}
            {suffix}
        </span>
    )
}

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const heroRef = useRef(null)

    const backgroundImages = [
        "https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407227/IMG_1700_3_qxzt02.jpg",
        "https://res.cloudinary.com/dgro5x4h8/image/upload/v1750465857/WhatsApp_Image_2025-05-19_at_18.23.13_gkhvao.jpg",
    ]

    useEffect(() => {
        setIsVisible(true)
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [backgroundImages.length])

    const stats = [
        { value: "15+", label: "Années", subLabel: "d'Expérience" },
        { value: "150+", label: "Projets", subLabel: "Réalisés" },
        { value: "95%", label: "Satisfaction", subLabel: "Client" },
    ]

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerHeight = 80
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: "smooth",
            })
        }
    }

    return (
        <section ref={heroRef} id="accueil" className="relative h-screen min-h-[750px] overflow-hidden bg-slate-950">
            {/* Background Layer with cinematic zoom */}
            <div className="absolute inset-0">
                {backgroundImages.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <motion.div
                            animate={{ scale: currentSlide === index ? 1.1 : 1 }}
                            transition={{ duration: 12, ease: "linear" }}
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </motion.div>
                ))}

                {/* Advanced Multi-layered Overlays */}
                <div className="absolute inset-0 bg-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(15,23,42,0.8)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            <div className="relative z-10 h-full container mx-auto px-6 lg:px-16 flex flex-col justify-center">
                <div className="max-w-5xl">
                    {/* Elegant Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-4"
                    >
                        <div className="w-16 h-[2px] bg-amber-500 rounded-full" />
                        <span className="text-amber-500 text-[11px] md:text-sm font-black tracking-[0.4em] uppercase">
                            BTP & Génie Civil au Sénégal
                        </span>
                    </motion.div>

                    {/* Architectural Typography */}
                    <div className="mt-8 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
                        >
                            <span className="font-extralight block">L'Excellence</span>
                            <span className="font-black">Construction Durable</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-slate-300/90 max-w-2xl font-light leading-relaxed border-l border-amber-500/30 pl-8"
                        >
                            Solutions d'ingénierie avancées en assainissement et terrassement. Nous bâtissons l'avenir des infrastructures sénégalaises avec rigueur et innovation.
                        </motion.p>
                    </div>

                    {/* Integrated Action & Stats Area */}
                    <div className="mt-12 flex flex-col xl:flex-row items-start xl:items-center gap-12">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            onClick={() => scrollToSection('contact')}
                            className="group relative px-12 py-5 bg-amber-500 text-slate-950 font-black rounded-full transition-all duration-500 hover:scale-105 hover:bg-amber-400 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Démarrer votre projet
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </motion.button>

                        {/* Premium Stats Glass Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.9 }}
                            className="grid grid-cols-3 gap-8 md:gap-16 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-3xl md:text-4xl font-black text-white leading-none">{stat.value}</div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-tight font-bold">
                                        <span className="block text-amber-500/80">{stat.label}</span>
                                        {stat.subLabel}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Refined Navigation HUD */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 0.4 } : {}}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-6 lg:left-16"
                >
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-[1px] h-12 bg-gradient-to-t from-white to-transparent" />
                        <span className="[writing-mode:vertical-rl] text-white text-[10px] tracking-[0.6em] uppercase font-black">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                    </div>
                </motion.div>
            </div>

            {/* Cinematic Slide Indicators */}
            <div className="absolute right-12 bottom-12 z-20 flex items-center gap-4">
                <span className="text-white/40 text-[10px] font-black tracking-widest uppercase">Slide</span>
                <div className="flex gap-2">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            className="relative h-1 transition-all duration-700 overflow-hidden rounded-full"
                            style={{
                                width: currentSlide === index ? '60px' : '20px',
                                backgroundColor: currentSlide === index ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'
                            }}
                            onClick={() => setCurrentSlide(index)}
                        >
                            {currentSlide === index && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                    className="absolute inset-0 bg-amber-500"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
