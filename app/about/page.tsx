import { AboutSection } from "@/components/sections/about-section";

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="bg-primary-950 py-32 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-6">À Propos de Nous</h1>
        <p className="text-xl text-primary-300 max-w-2xl mx-auto">Découvrez l'histoire, la vision et les valeurs qui animent Diatranscom au quotidien.</p>
      </div>
      <AboutSection />
    </div>
  );
}
