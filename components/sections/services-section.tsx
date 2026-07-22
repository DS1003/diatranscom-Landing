"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Droplets, Construction, Mountain, Building2, HardHat, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ServicesSectionProps {
  initialServices?: any[];
}

export const ServicesSection = ({ initialServices }: ServicesSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".service-header-elem",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-header-container",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".service-card",
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  const staticServices = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Assainissement",
      description: "Services complets d'assainissement urbain et rural : réseaux d'égouts, stations d'épuration.",
      tags: ["Réseaux d'égouts", "Stations d'épuration"],
      number: "1",
    },
    {
      icon: <Construction className="w-8 h-8" />,
      title: "Terrassement",
      description: "Travaux de terrassement pour tous types de projets : excavation, nivellement.",
      tags: ["Excavation", "Nivellement"],
      number: "2",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Travaux BTP",
      description: "Construction et rénovation d'infrastructures : bâtiments, routes, ponts et ouvrages d'art.",
      tags: ["Infrastructure", "Rénovation"],
      number: "3",
    },
  ];

  // Use dynamic DB services if available, else static
  const displayServices = initialServices && initialServices.length > 0
    ? initialServices.map((s, index) => ({
        icon: <HardHat className="w-8 h-8" />, // Default icon for now
        title: s.title,
        description: s.description,
        tags: [],
        number: (index + 1).toString(),
      }))
    : staticServices;

  return (
    <section ref={containerRef} id="services" className="py-32 bg-primary-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="services-header-container text-center max-w-3xl mx-auto mb-24">
          <div className="service-header-elem inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent-500">Nos Domaines d'Intervention</span>
            <div className="w-8 h-px bg-accent-500" />
          </div>

          <h2 className="service-header-elem text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">
            Excellence & <span className="text-accent-500">Innovation</span>
          </h2>

          <p className="service-header-elem text-primary-300 text-lg leading-relaxed font-light">
            Nous mettons notre savoir-faire au service de vos défis les plus complexes avec un engagement total sur la qualité et la durabilité.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, i) => (
            <div key={i} className="service-card opacity-0">
              <Card className="h-full group hover:-translate-y-2 transition-transform duration-500 bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-400 group-hover:bg-accent-500 group-hover:text-primary-950 transition-colors duration-500">
                      {service.icon}
                    </div>
                    <span className="text-6xl font-black text-white/5 group-hover:text-accent-500/10 transition-colors duration-500">
                      {service.number}
                    </span>
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-300 text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag: string, j: number) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center text-sm font-bold text-white group-hover:text-accent-400 transition-colors cursor-pointer">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
