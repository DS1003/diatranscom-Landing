"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  initialTestimonials?: any[];
}

export const TestimonialsSection = ({ initialTestimonials }: TestimonialsSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const staticTestimonials = [
    {
      name: "Jean Paul Faye",
      role: "Directeur Technique, BuildAfrica",
      content: "L'expertise de Diatranscom en terrassement a été cruciale pour notre dernier projet de complexe résidentiel. Une précision exemplaire et un respect total des délais.",
      rating: 5,
    },
    {
      name: "Awa Ndiaye",
      role: "Architecte Urbaniste",
      content: "Travailler avec Diatranscom est une garantie de tranquillité. Leurs solutions d'assainissement sont innovantes et parfaitement intégrées aux contraintes du terrain.",
      rating: 5,
    },
    {
      name: "Moussa Sarr",
      role: "Entrepreneur BTP",
      content: "Le professionnalisme des équipes sur le terrain et la qualité de l'accompagnement technique font de Diatranscom un partenaire de choix pour nos grands chantiers.",
      rating: 5,
    },
  ];

  const testimonials = initialTestimonials && initialTestimonials.length > 0 
    ? initialTestimonials 
    : staticTestimonials;

  return (
    <section id="testimonials" className="py-32 bg-primary-50 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent-600">Témoignages</span>
            <div className="w-8 h-px bg-accent-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary-950 mb-6 tracking-tight">
            Ce que nos Clients <span className="text-accent-500">disent</span>
          </h2>
          <p className="text-primary-600 text-lg leading-relaxed">
            La satisfaction de nos partenaires est notre plus belle réussite. Découvrez les retours d'expérience de ceux qui nous font confiance.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Embla Viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-6">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="h-full"
                  >
                    <Card className="bg-white border-none shadow-xl shadow-primary-900/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                      <CardContent className="p-10 flex flex-col h-full">
                        <Quote className="w-10 h-10 text-accent-500/20 mb-6" />
                        <div className="flex gap-1 mb-6 text-accent-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= (t.rating || 5) ? "fill-current" : ""}`} />
                          ))}
                        </div>
                        <p className="text-primary-700 text-base leading-relaxed mb-8 flex-grow italic">
                          &ldquo;{t.content}&rdquo;
                        </p>
                        <div className="pt-6 border-t border-primary-100">
                          <div className="font-bold text-primary-950">{t.name}</div>
                          <div className="text-sm text-primary-500">{t.role}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary-950 hover:bg-accent-500 hover:text-white transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary-950 hover:bg-accent-500 hover:text-white transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
