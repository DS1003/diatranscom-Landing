"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { createProject, updateProject } from "@/actions/project-actions";
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  slug: z.string().min(2, "Slug requis"),
  client: z.string().optional(),
  date: z.string().optional(), // store as string in form, convert to Date before saving if needed
  description: z.string().min(10, "Description requise"),
  images: z.any().optional(), // Stringified JSON array
  isActive: z.boolean(),
  order: z.number().optional(),
});

export const ProjectForm = ({ initialData, onSuccess }: { initialData?: any, onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Parse images if string
  let initialImages: string[] = [];
  if (initialData?.images) {
    try {
      initialImages = typeof initialData.images === "string" ? JSON.parse(initialData.images) : initialData.images;
    } catch (e) {}
  }

  // Formatting date for HTML input type="date"
  let formattedDate = "";
  if (initialData?.date) {
    const d = new Date(initialData.date);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toISOString().split("T")[0];
    }
  }

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      ...initialData,
      date: formattedDate,
      images: JSON.stringify(initialImages)
    } : {
      title: "",
      slug: "",
      client: "",
      date: "",
      description: "",
      images: JSON.stringify([]),
      isActive: true,
      order: 0,
    },
  });

  const imagesStr = watch("images") as string;
  let currentImages: string[] = [];
  try { currentImages = JSON.parse(imagesStr); } catch (e) {}

  const handleImageChange = (url: string) => {
    // For simplicity, we just keep one image for now, or append to array. 
    // Since ImageUpload component is single URL for now, let's treat it as one.
    setValue("images", JSON.stringify([url]));
  };

  const handleImageRemove = () => {
    setValue("images", JSON.stringify([]));
  };

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
      };

      if (initialData) {
        await updateProject(initialData.id, formattedData);
        toast.success("Projet mis à jour");
      } else {
        await createProject(formattedData);
        toast.success("Projet créé");
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre du projet</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL</label>
          <input
            {...register("slug")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: route-nationale-1"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <input
            {...register("client")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: État du Sénégal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description complète</label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Principale</label>
        <ImageUpload 
          value={currentImages.length > 0 ? currentImages[0] : ""} 
          onChange={handleImageChange} 
          onRemove={handleImageRemove} 
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} id="isActive" className="w-4 h-4 text-accent-600 rounded" />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Publier sur le site</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {initialData ? "Mettre à jour" : "Créer le projet"}
        </Button>
      </div>
    </form>
  );
};
