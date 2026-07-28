"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "reicon-react";
import { Button } from "@/components/ui/button";
import { saveSettings } from "@/actions/setting-actions";
import { toast } from "sonner";

export const SettingsForm = ({ initialData }: { initialData: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      siteName: initialData?.siteName || "Diatranscom",
      contactEmail: initialData?.contactEmail || "contact@diatranscom.com",
      contactPhone: initialData?.contactPhone || "+221 77 000 00 00",
      address: initialData?.address || "Keur Massar, Dakar",
      facebookUrl: initialData?.facebookUrl || "",
      linkedinUrl: initialData?.linkedinUrl || "",
      twitterUrl: initialData?.twitterUrl || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await saveSettings(data);
      toast.success("Paramètres enregistrés");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
      
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Informations Générales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Site</label>
            <input
              {...register("siteName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contact</label>
            <input
              {...register("contactEmail")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de Contact</label>
            <input
              {...register("contactPhone")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Physique</label>
            <input
              {...register("address")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Réseaux Sociaux</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input
              {...register("facebookUrl")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input
              {...register("linkedinUrl")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
            <input
              {...register("twitterUrl")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader size={16} className="mr-2 animate-spin" /> : null}
          Sauvegarder les paramètres
        </Button>
      </div>
    </form>
  );
};
