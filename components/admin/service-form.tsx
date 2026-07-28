"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { createService, updateService } from "@/actions/service-actions";
import { toast } from "sonner";
import { ServiceGalleryManager } from "./service-gallery-manager";

const serviceSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  slug: z.string().min(2, "Slug requis"),
  description: z.string().min(10, "Description requise"),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  order: z.number().optional(),
});

export const ServiceForm = ({ initialData, onSuccess }: { initialData?: any, onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "gallery">("info");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData ? {
      title: initialData.title || "",
      slug: initialData.slug || "",
      description: initialData.description || "",
      icon: initialData.icon || "",
      imageUrl: initialData.imageUrl || "",
      isActive: initialData.isActive ?? true,
      order: initialData.order ?? 0,
    } : {
      title: "",
      slug: "",
      description: "",
      icon: "",
      imageUrl: "",
      isActive: true,
      order: 0,
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: z.infer<typeof serviceSchema>) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await updateService(initialData.id, data);
        toast.success("Service mis à jour");
      } else {
        await createService(data);
        toast.success("Service créé");
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl">
      {initialData && (
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "info" ? "border-accent-500 text-accent-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Informations
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "gallery" ? "border-accent-500 text-accent-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("gallery")}
          >
            Galerie
          </button>
        </div>
      )}

      {activeTab === "info" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Titre du service</label>
          <input
            {...register("title")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Identifiant URL (slug)</label>
          <input
            {...register("slug")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            placeholder="ex: terrassement"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image de couverture</label>
        <ImageUpload 
          value={imageUrl || ""} 
          onChange={(url) => setValue("imageUrl", url)} 
          onRemove={() => setValue("imageUrl", "")} 
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
        <input type="checkbox" {...register("isActive")} id="isActive" className="w-5 h-5 text-accent-600 rounded focus:ring-accent-500" />
        <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Rendre ce service public sur le site</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
          <Button type="submit" variant="accent" disabled={isLoading}>
            {isLoading ? <Loader size={16} className="mr-2 animate-spin" /> : null}
            {initialData ? "Mettre à jour" : "Créer le service"}
          </Button>
        </div>
      </form>
      ) : (
        initialData?.id && (
          <div className="py-4">
            <ServiceGalleryManager serviceId={initialData.id} />
          </div>
        )
      )}
    </div>
  );
};
