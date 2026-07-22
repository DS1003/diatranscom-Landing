import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

import { ProjectsSection } from "@/components/sections/projects-section";

export default async function Home() {
  const [services, testimonials, heroList, aboutList, rawSettings, projects] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.hero.findMany({ where: { isActive: true }, take: 1 }),
    prisma.about.findMany({ where: { isActive: true }, take: 1 }),
    prisma.setting.findMany(),
    prisma.project.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
  ]);

  const hero = heroList[0] || null;
  const about = aboutList[0] || null;
  const settings = rawSettings.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return (
    <>
      <HeroSection initialHero={hero} />
      <AboutSection initialAbout={about} />
      <ServicesSection initialServices={services} />
      <ProjectsSection initialProjects={projects} />
      <StatsSection initialStats={about?.stats} />
      <TestimonialsSection initialTestimonials={testimonials} />
      <CtaSection />
      <ContactSection settings={settings} />
    </>
  );
}
