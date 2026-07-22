"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveHero } from "@/actions/hero-actions";
import { toast } from "sonner";

export const HeroForm = ({ initialData }: { initialData?: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      description: initialData?.description || "",
      buttonText: initialData?.buttonText || "",
      badges: initialData?.badges ? initialData.badges[0] : "", // Treat as single string for form
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        badges: data.badges ? [data.badges] : [], // Convert back to array
      };
      await saveHero(formattedData);
      toast.success("Page d'accueil mise à jour");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: L'Excellence"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre (Dégradé)</label>
          <input
            {...register("subtitle")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: Construction Durable"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton principal</label>
          <input
            {...register("buttonText")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Petit texte clignotant)</label>
          <input
            {...register("badges")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: BTP & Génie Civil"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image de fond (Hero)</label>
        <ImageUpload 
          value={imageUrl} 
          onChange={(url) => setValue("imageUrl", url)} 
          onRemove={() => setValue("imageUrl", "")} 
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Mettre à jour l'accueil
        </Button>
      </div>
    </form>
  );
};
