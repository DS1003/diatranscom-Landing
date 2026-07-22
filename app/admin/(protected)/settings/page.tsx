import { getSettings } from "@/actions/setting-actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres Généraux</h1>
      <SettingsForm initialData={settings} />
    </div>
  );
}
