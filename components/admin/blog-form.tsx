"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { createPost, updatePost } from "@/actions/blog-actions";
import { toast } from "sonner";

const blogSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  slug: z.string().min(2, "Slug requis"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Contenu requis"),
  imageUrl: z.string().optional(),
  authorName: z.string().optional(),
  isActive: z.boolean(),
});

export const BlogForm = ({ initialData, onSuccess }: { initialData?: any, onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData ? {
      title: initialData.title || "",
      slug: initialData.slug || "",
      excerpt: initialData.excerpt || "",
      content: initialData.content || "",
      imageUrl: initialData.imageUrl || "",
      authorName: initialData.authorName || "",
      isActive: initialData.isActive ?? true,
    } : {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      authorName: "",
      isActive: true,
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await updatePost(initialData.id, data);
        toast.success("Article mis à jour");
      } else {
        await createPost(data);
        toast.success("Article créé");
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'article</label>
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
            placeholder="ex: nouvelle-infrastructure-dakar"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
          <input
            {...register("authorName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extrait (Court résumé)</label>
          <input
            {...register("excerpt")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu (Texte / Markdown)</label>
        <textarea
          {...register("content")}
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none font-mono text-sm"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
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
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Publier cet article</label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        {onSuccess && (
          <Button type="button" variant="outline" className="mr-3" onClick={onSuccess}>
            Annuler
          </Button>
        )}
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader size={16} className="mr-2 animate-spin" /> : null}
          {initialData ? "Mettre à jour" : "Créer l'article"}
        </Button>
      </div>
    </form>
  );
};
