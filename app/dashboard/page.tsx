import { ContactSection } from "@/components/sections/contact-section";

export default function DashboardPage() {
  // Originally routed as /dashboard to Contact component in CRA
  return (
    <div className="pt-24">
      <div className="bg-primary-950 py-32 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-6">Contact & Dashboard</h1>
        <p className="text-xl text-primary-300 max-w-2xl mx-auto">Espace client et prise de contact avec nos experts en ingénierie.</p>
      </div>
      <ContactSection />
    </div>
  );
}
