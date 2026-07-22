import { getAbout } from "@/actions/about-actions";
import { AboutForm } from "@/components/admin/about-form";

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">À Propos & Statistiques</h1>
      <AboutForm initialData={about} />
    </div>
  );
}
