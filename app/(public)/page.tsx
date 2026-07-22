import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  let services: any[] = [];
  let testimonials: any[] = [];
  let hero: any = null;
  let about: any = null;
  let settings: any = {};
  let projects: any[] = [];

  try {
    const [servicesRes, testimonialsRes, heroList, aboutList, rawSettings, projectsRes] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.hero.findMany({ where: { isActive: true }, take: 1 }),
      prisma.about.findMany({ where: { isActive: true }, take: 1 }),
      prisma.setting.findMany(),
      prisma.project.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    ]);

    services = servicesRes;
    testimonials = testimonialsRes;
    hero = heroList[0] || null;
    about = aboutList[0] || null;
    settings = rawSettings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    projects = projectsRes;
  } catch (error) {
    console.error("Database connection error on Home page:", error);
  }

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
