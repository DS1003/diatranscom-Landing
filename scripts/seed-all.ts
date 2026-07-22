import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding all static data into DB...");

  // Hero
  await prisma.hero.create({
    data: {
      title: "L'Excellence",
      subtitle: "Construction Durable",
      description: "Solutions d'ingénierie avancées en assainissement et terrassement. Nous bâtissons l'avenir des infrastructures sénégalaises avec rigueur et innovation.",
      buttonText: "Explorer nos projets",
      buttonLink: "#projects",
      imageUrl: "https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg",
      badges: ["BTP & Génie Civil au Sénégal"],
      isActive: true,
    }
  });

  // About
  await prisma.about.create({
    data: {
      title: "Bâtir le futur avec Expertise.",
      content: "Diatranscom est un leader reconnu dans le secteur des travaux publics et du BTP au Sénégal. Nous accompagnons nos clients dans la réalisation de projets d'infrastructure majeurs.",
      imageUrl: "https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg",
      mission: JSON.stringify([
        { title: "Notre Mission", desc: "Apporter des solutions d'ingénierie innovantes et durables pour transformer les infrastructures de demain." },
        { title: "Notre Équipe", desc: "Une équipe d'experts passionnés et qualifiés, dédiée à la réussite de chaque projet." },
        { title: "Qualité & Sécurité", desc: "Le respect strict des normes de sécurité et un engagement qualité sans compromis." },
        { title: "Innovation", desc: "L'utilisation des dernières technologies pour une efficacité optimale." }
      ]),
      stats: [
        { value: "15+", label: "Années d'Expérience" },
        { value: "150+", label: "Projets Réalisés" },
        { value: "95%", label: "Satisfaction Client" },
      ],
      isActive: true,
    }
  });

  // Settings
  await prisma.setting.createMany({
    data: [
      { key: "siteName", value: "Diatranscom" },
      { key: "contactEmail", value: "contact@diatranscom.sn" },
      { key: "contactPhone", value: "+221 76 143 18 07" },
      { key: "address", value: "Keur Massar, Dakar, Sénégal" },
      { key: "facebookUrl", value: "https://facebook.com/diatranscom" },
      { key: "linkedinUrl", value: "https://linkedin.com/company/diatranscom" },
      { key: "twitterUrl", value: "https://twitter.com/diatranscom" }
    ],
    skipDuplicates: true
  });

  // Services
  await prisma.service.createMany({
    data: [
      { title: "Assainissement", slug: "assainissement", description: "Services complets d'assainissement urbain et rural : réseaux d'égouts, stations d'épuration.", order: 1 },
      { title: "Terrassement", slug: "terrassement", description: "Travaux de terrassement pour tous types de projets : excavation, nivellement.", order: 2 },
      { title: "Travaux BTP", slug: "travaux-btp", description: "Construction et rénovation d'infrastructures : bâtiments, routes, ponts et ouvrages d'art.", order: 3 }
    ],
    skipDuplicates: true
  });

  // Projects
  await prisma.project.createMany({
    data: [
      { 
        title: "Autoroute de l'Avenir", 
        slug: "autoroute-avenir", 
        client: "État du Sénégal", 
        description: "Construction du tronçon principal avec ouvrages d'art et système d'assainissement intégré.",
        images: JSON.stringify(["https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg"]),
        order: 1 
      },
      { 
        title: "Station d'Épuration Keur Massar", 
        slug: "station-epuration-keur-massar", 
        client: "ONAS", 
        description: "Réalisation complète d'une station d'épuration dernière génération pour la banlieue dakaroise.",
        images: JSON.stringify(["https://res.cloudinary.com/dgro5x4h8/image/upload/f_auto,q_auto/v1747407227/IMG_1700_3_qxzt02.jpg"]),
        order: 2 
      }
    ],
    skipDuplicates: true
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Amadou Diallo",
        role: "Directeur de Projet, ONAS",
        content: "Diatranscom a transformé notre infrastructure avec un professionnalisme exemplaire. Les délais ont été respectés et la qualité est au rendez-vous.",
        rating: 5,
        order: 1
      },
      {
        name: "Sophie Ndiaye",
        role: "Maire de Commune",
        content: "Un partenaire fiable pour nos travaux d'assainissement. Leur équipe a su s'adapter aux contraintes locales avec une grande efficacité.",
        rating: 5,
        order: 2
      }
    ],
    skipDuplicates: true
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
