"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(9, "Numéro de téléphone invalide"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

import { submitContact } from "@/actions/contact-actions";

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection = ({ settings }: { settings?: any }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);
      toast.success("Message envoyé avec succès !", {
        description: "Notre équipe vous recontactera dans les plus brefs délais.",
      });
      reset();
    } catch (error) {
      toast.error("Une erreur est survenue.", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactEmail = settings?.contactEmail || "contact@diatranscom.sn";
  const contactPhone = settings?.contactPhone || "+221 76 143 18 07";
  const address = settings?.address || "Keur Massar, Dakar, Sénégal";

  return (
    <section id="contact" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent-600">Contactez-nous</span>
            <div className="w-8 h-px bg-accent-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary-950 mb-6 tracking-tight">
            Parlons de votre <span className="text-accent-500">Projet</span>
          </h2>
          <p className="text-primary-600 text-lg leading-relaxed">
            Que vous soyez au stade de l'idée ou prêt à lancer votre chantier, notre équipe d'experts est prête à vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {[
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Téléphone Hotline",
                primary: contactPhone,
                secondary: "Disponible 24/7 pour les urgences",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Support Email",
                primary: contactEmail,
                secondary: "Réponse garantie sous 12h",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Nos Bureaux",
                primary: address,
                secondary: "Direction Générale",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-accent-500 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-primary-500 font-medium mb-1">{item.title}</p>
                  <h4 className="text-primary-950 font-bold text-lg">{item.primary}</h4>
                  <p className="text-primary-500 text-sm">{item.secondary}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-primary-100">
              <p className="text-sm font-bold text-primary-950 mb-3">Connectons-nous :</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "Facebook", icon: <Facebook className="w-4 h-4" />, url: settings?.facebookUrl || "#" },
                  { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: settings?.linkedinUrl || "#" },
                  { name: "Instagram", icon: <Instagram className="w-4 h-4" />, url: "#" },
                  { name: "Twitter/X", icon: <span className="font-bold text-sm">X</span>, url: settings?.twitterUrl || "#" }
                ].filter(social => social.url !== "#" && social.url !== "").map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium hover:bg-accent-500 hover:text-white transition-colors"
                  >
                    {social.icon}
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-primary-950 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent-500/20 blur-[80px] rounded-full pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-300">Nom & Prénom</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-primary-600 focus:outline-none focus:border-accent-500 transition-colors"
                  />
                  {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-300">Adresse Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jean@exemple.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-primary-600 focus:outline-none focus:border-accent-500 transition-colors"
                  />
                  {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-300">Numéro de Téléphone</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+221 7X XXX XX XX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-primary-600 focus:outline-none focus:border-accent-500 transition-colors"
                  />
                  {errors.phone && <span className="text-xs text-red-400">{errors.phone.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-300">Service Intéressé</label>
                  <select
                    {...register("service")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors appearance-none"
                  >
                    <option value="" className="bg-primary-950">Sélectionnez un service</option>
                    <option value="assainissement" className="bg-primary-950">Assainissement</option>
                    <option value="terrassement" className="bg-primary-950">Terrassement</option>
                    <option value="enrochement" className="bg-primary-950">Enrochement</option>
                    <option value="btp" className="bg-primary-950">Travaux BTP</option>
                    <option value="genie-civil" className="bg-primary-950">Génie Civil</option>
                    <option value="conseil" className="bg-primary-950">Conseil & Expertise</option>
                  </select>
                  {errors.service && <span className="text-xs text-red-400">{errors.service.message}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-300">Détails de votre Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Décrivez brièvement votre projet..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-primary-600 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                ></textarea>
                {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
              </div>
              <p className="text-xs text-primary-500">
                En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
              </p>
              <Button
                type="submit"
                variant="accent"
                className="w-full py-6 text-lg rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
