"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader } from "reicon-react";
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
      title: initialData.title || "",
      slug: initialData.slug || "",
      client: initialData.client || "",
      date: formattedDate,
      description: initialData.description || "",
      images: JSON.stringify(initialImages),
      isActive: initialData.isActive ?? true,
      order: initialData.order ?? 0,
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
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Titre du projet</label>
          <input
            {...register("title")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Slug URL</label>
          <input
            {...register("slug")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            placeholder="ex: route-nationale-1"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client</label>
          <input
            {...register("client")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            placeholder="ex: État du Sénégal"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description complète</label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full px-5 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image Principale</label>
        <ImageUpload 
          value={currentImages.length > 0 ? currentImages[0] : ""} 
          onChange={handleImageChange} 
          onRemove={handleImageRemove} 
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
        <input type="checkbox" {...register("isActive")} id="isActive" className="w-5 h-5 text-accent-600 rounded focus:ring-accent-500" />
        <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Publier sur le site</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader size={16} className="mr-2 animate-spin" /> : null}
          {initialData ? "Mettre à jour" : "Créer le projet"}
        </Button>
      </div>
    </form>
  );
};
