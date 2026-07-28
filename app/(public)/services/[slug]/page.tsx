import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ServiceGallery } from "@/components/sections/service-gallery";
import { prisma } from "@/lib/prisma";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // We fetch directly with Prisma here to include the gallery and project relation
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      gallery: {
        where: { isActive: true },
        orderBy: { order: "asc" },
        include: {
          project: {
            select: { title: true, slug: true }
          }
        }
      }
    }
  });

  if (!service || !service.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary-950">
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16">
          <Link href="/#services" className="inline-flex items-center text-accent-500 hover:text-accent-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                  {service.title}
                </h1>
                <div className="w-20 h-1 bg-accent-500 rounded-full" />
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none text-primary-300">
                {service.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Pourquoi choisir notre expertise ?</h3>
                <ul className="space-y-4">
                  {[
                    "Équipe d'experts qualifiés et expérimentés",
                    "Respect strict des normes de sécurité et de qualité",
                    "Matériel de pointe pour une exécution efficace",
                    "Accompagnement sur mesure de bout en bout",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0" />
                      <span className="text-primary-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link href="/#contact" className="inline-flex h-14 items-center justify-center rounded-full bg-accent-500 px-8 text-base font-bold text-primary-950 hover:bg-accent-400 transition-all shadow-lg hover:shadow-accent-500/25">
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                {service.imageUrl ? (
                  <Image 
                    src={service.imageUrl} 
                    alt={service.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary-800 flex items-center justify-center text-primary-500 font-medium">
                    Aucune image de couverture
                  </div>
                )}
                
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
              </div>
              
              {/* Background glow */}
              <div className="absolute -inset-4 bg-accent-500/20 blur-3xl -z-10 rounded-full" />
            </div>
          </div>

          {/* Gallery Section */}
          <ServiceGallery media={service.gallery || []} />
          
        </div>
      </main>
    </div>
  );
}
