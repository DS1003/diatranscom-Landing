"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { createTestimonial, updateTestimonial } from "@/actions/testimonial-actions";
import { toast } from "sonner";

const testimonialSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  role: z.string().min(2, "Rôle requis"),
  content: z.string().min(10, "Contenu requis"),
  rating: z.number().min(1).max(5),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean(),
  order: z.number().optional(),
});

export const TestimonialForm = ({ initialData, onSuccess }: { initialData?: any, onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      content: "",
      rating: 5,
      imageUrl: "",
      isActive: true,
      order: 0,
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await updateTestimonial(initialData.id, data);
        toast.success("Témoignage mis à jour");
      } else {
        await createTestimonial(data);
        toast.success("Témoignage ajouté");
      }
      if (onSuccess) onSuccess();
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: Amadou Diallo"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle / Entreprise</label>
          <input
            {...register("role")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: Directeur, ONAS"
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu (Avis)</label>
        <textarea
          {...register("content")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (sur 5)</label>
          <input
            type="number"
            min="1"
            max="5"
            {...register("rating", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo du client (Optionnel)</label>
          <ImageUpload 
            value={imageUrl || ""} 
            onChange={(url) => setValue("imageUrl", url)} 
            onRemove={() => setValue("imageUrl", "")} 
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} id="isActive" className="w-4 h-4 text-accent-600 rounded" />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Afficher ce témoignage sur le site</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {initialData ? "Mettre à jour" : "Ajouter le témoignage"}
        </Button>
      </div>
    </form>
  );
};
