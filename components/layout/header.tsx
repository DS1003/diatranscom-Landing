"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/#about" },
  { name: "Expertise", href: "/#services" },
  { name: "Témoignages", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export const Header = ({ settings }: { settings?: any } = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "about", "services", "testimonials", "contact"];
    const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, [pathname]);

  const isLinkActive = (linkHref: string) => {
    if (pathname === "/") {
      if (linkHref === "/") {
        return activeSection === "home";
      }
      return linkHref === `/#${activeSection}`;
    }

    if (pathname.startsWith("/services") && linkHref === "/#services") {
      return true;
    }

    return pathname === linkHref;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4 bg-primary-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between">
          <Link href="/" className="relative z-50 group">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Diatranscom Logo" 
                width={250} 
                height={60} 
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors py-2 ${
                    isActive ? "text-white font-semibold" : "text-primary-200 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <MagneticWrapper>
              <Button variant="accent" className="ml-4 rounded-full px-8">
                Démarrer un Projet
              </Button>
            </MagneticWrapper>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto", backdropFilter: "blur(20px)" },
          closed: { opacity: 0, pointerEvents: "none", backdropFilter: "blur(0px)" },
        }}
        className="fixed inset-0 z-40 bg-primary-950/95 lg:hidden flex flex-col items-center justify-center"
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = isLinkActive(link.href);
            return (
              <motion.div
                key={link.name}
                variants={{
                  open: { y: 0, opacity: 1, transition: { delay: i * 0.1 + 0.1 } },
                  closed: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-4xl font-bold transition-colors ${
                    isActive ? "text-accent-500" : "text-white hover:text-accent-500"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
          <motion.div
            variants={{
              open: { y: 0, opacity: 1, transition: { delay: 0.6 } },
              closed: { y: 20, opacity: 0 },
            }}
            className="mt-8"
          >
            <Button variant="accent" size="lg" className="w-full text-lg">
              Démarrer un Projet
            </Button>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
};
