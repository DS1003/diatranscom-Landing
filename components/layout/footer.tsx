import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Facebook, Linkedin, Instagram } from "lucide-react";

export const Footer = ({ settings }: { settings?: any }) => {
  const contactEmail = settings?.contactEmail || "contact@diatranscom.sn";
  const contactPhone = settings?.contactPhone || "+221 76 143 18 07";
  const address = settings?.address || "Keur Massar, Dakar, Sénégal";

  return (
    <footer className="bg-primary-950 pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-50" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-24 mb-24">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl inline-block">
                <Image
                  src="/logo.png"
                  alt="Diatranscom Logo"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-primary-300 mb-8 max-w-sm font-light">
              Votre partenaire de confiance en travaux publics et BTP au Sénégal. Excellence, innovation et durabilité au service de vos infrastructures.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: settings?.facebookUrl || "#", label: "Facebook" },
                { icon: <Linkedin className="w-4 h-4" />, href: settings?.linkedinUrl || "#", label: "LinkedIn" },
                { icon: <Instagram className="w-4 h-4" />, href: "#", label: "Instagram" },
                { icon: <span className="font-bold text-sm">X</span>, href: settings?.twitterUrl || "#", label: "Twitter" }
              ].filter(s => s.href !== "#" && s.href !== "").map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent-500 hover:border-accent-500 transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4 text-primary-300 font-light">
              {[
                { name: "Accueil", href: "/" },
                { name: "À Propos", href: "/about" },
                { name: "Expertise", href: "/#services" },
                { name: "Projets", href: "/#projects" },
                { name: "Contact", href: "/dashboard" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-accent-400 transition-colors inline-flex items-center gap-2 group">
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Nos Services</h4>
            <ul className="space-y-4 text-primary-300 font-light">
              {["Assainissement", "Terrassement", "Enrochement", "Travaux BTP", "Génie Civil", "Conseil & Expertise"].map((item) => (
                <li key={item}>
                  <Link href="/#services" className="hover:text-accent-400 transition-colors inline-flex items-center gap-2 group">
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Contact Direct</h4>
            <address className="not-italic text-primary-300 font-light space-y-4">
              <p>{address}</p>
              <p>
                <a href={`mailto:${contactEmail}`} className="hover:text-accent-400 transition-colors border-b border-primary-500 pb-1">
                  {contactEmail}
                </a>
              </p>
              <p>
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="hover:text-accent-400 transition-colors">
                  {contactPhone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-400 font-light">
          <p>© {new Date().getFullYear()} DIA TRANSCOM. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
