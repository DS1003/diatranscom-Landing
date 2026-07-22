import { getHero } from "@/actions/hero-actions";
import { HeroForm } from "@/components/admin/hero-form";

export default async function HeroPage() {
  const hero = await getHero();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Accueil (Hero Section)</h1>
      <HeroForm initialData={hero} />
    </div>
  );
}
