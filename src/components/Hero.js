"use client"

import { useState, useEffect, useRef } from "react"
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
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <div
                            className={`absolute inset-0 transition-transform duration-[12000ms] ease-linear ${currentSlide === index ? "scale-110" : "scale-100"
                                }`}
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </div>
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
                    <div
                        className={`inline-flex items-center gap-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        <div className="w-16 h-[2px] bg-amber-500 rounded-full" />
                        <span className="text-amber-500 text-[11px] md:text-sm font-black tracking-[0.4em] uppercase">
                            BTP & Génie Civil au Sénégal
                        </span>
                    </div>

                    {/* Architectural Typography */}
                    <div className={`mt-8 space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        }`}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight">
                            <span className="font-extralight block">L'Excellence</span>
                            <span className="font-black">Construction Durable</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300/90 max-w-2xl font-light leading-relaxed border-l border-amber-500/30 pl-8">
                            Solutions d'ingénierie avancées en assainissement et terrassement. Nous bâtissons l'avenir des infrastructures sénégalaises avec rigueur et innovation.
                        </p>
                    </div>

                    {/* Integrated Action & Stats Area */}
                    <div className={`mt-12 flex flex-col xl:flex-row items-start xl:items-center gap-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group relative px-12 py-5 bg-amber-500 text-slate-950 font-black rounded-full transition-all duration-500 hover:scale-105 hover:bg-amber-400 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Démarrer votre projet
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>

                        {/* Premium Stats Glass Card */}
                        <div className="grid grid-cols-3 gap-8 md:gap-16 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-3xl md:text-4xl font-black text-white leading-none">{stat.value}</div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-tight font-bold">
                                        <span className="block text-amber-500/80">{stat.label}</span>
                                        {stat.subLabel}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Refined Navigation HUD */}
                <div className={`absolute bottom-12 left-6 lg:left-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-40 translate-y-0" : "opacity-0 translate-y-8"
                    }`}>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-[1px] h-12 bg-gradient-to-t from-white to-transparent" />
                        <span className="[writing-mode:vertical-rl] text-white text-[10px] tracking-[0.6em] uppercase font-black">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                    </div>
                </div>
            </div>

            {/* Cinematic Slide Indicators */}
            <div className="absolute right-12 bottom-12 z-20 flex items-center gap-4">
                <span className="text-white/40 text-[10px] font-black tracking-widest uppercase">Slide</span>
                <div className="flex gap-2">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            className="relative h-1 transition-all duration-700 overflow-hidden rounded-full"
                            style={{ width: currentSlide === index ? '60px' : '20px', backgroundColor: currentSlide === index ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)' }}
                            onClick={() => setCurrentSlide(index)}
                        >
                            {currentSlide === index && (
                                <div className="absolute inset-0 bg-amber-500 animate-[progress_8s_linear_infinite]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes progress {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </section>
    )
}

export default Hero
