"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { createService, updateService } from "@/actions/service-actions";
import { toast } from "sonner";

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

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre du service</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Identifiant URL (slug)</label>
          <input
            {...register("slug")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: terrassement"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image de couverture</label>
        <ImageUpload 
          value={imageUrl || ""} 
          onChange={(url) => setValue("imageUrl", url)} 
          onRemove={() => setValue("imageUrl", "")} 
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} id="isActive" className="w-4 h-4 text-accent-600 rounded" />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Rendre ce service public sur le site</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {initialData ? "Mettre à jour" : "Créer le service"}
        </Button>
      </div>
    </form>
  );
};
