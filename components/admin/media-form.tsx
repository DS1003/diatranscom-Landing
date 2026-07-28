"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addServiceMedia, updateServiceMedia } from "@/actions/gallery-actions";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./image-upload";
import { format } from "date-fns";

interface MediaFormProps {
  serviceId: string;
  initialData?: any;
  onSuccess: () => void;
}

export const MediaForm = ({ serviceId, initialData, onSuccess }: MediaFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom simple form state (replacing react-hook-form to avoid complex imports right now, or just using standard controlled inputs)
  // Actually, I'll use simple state to avoid zod/react-hook-form complexities for now, as it's a simple form.
  
  const [formData, setFormData] = useState({
    type: initialData?.type || "IMAGE",
    url: initialData?.url || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    date: initialData?.date ? format(new Date(initialData.date), "yyyy-MM-dd") : "",
    projectId: initialData?.projectId || "",
    isActive: initialData?.isActive ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      toast.error("Veuillez fournir une URL ou uploader un fichier");
      return;
    }

    setIsLoading(true);
    try {
      if (initialData) {
        await updateServiceMedia(initialData.id, formData);
        toast.success("Média mis à jour");
      } else {
        await addServiceMedia({ ...formData, serviceId });
        toast.success("Média ajouté");
      }
      onSuccess();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Type de média</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="IMAGE">Photo</option>
            <option value="VIDEO">Vidéo</option>
          </select>
        </div>
        <div className="space-y-2 flex items-end pb-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-gray-300 text-accent-500 focus:ring-accent-500 h-4 w-4"
            />
            <span>Visible sur le site</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {formData.type === "IMAGE" ? "Image (Upload)" : "URL de la vidéo (YouTube/Vimeo)"}
        </label>
        {formData.type === "IMAGE" ? (
          <ImageUpload
            value={formData.url || ""}
            onChange={(url) => setFormData(prev => ({ ...prev, url }))}
            onRemove={() => setFormData(prev => ({ ...prev, url: "" }))}
          />
        ) : (
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Titre (optionnel)</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Travaux sur l'autoroute A1"
          className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description (optionnelle)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Brève description de la réalisation..."
          className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Lieu (optionnel)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Dakar, Sénégal"
            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date (optionnelle)</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading || !formData.url}>
          {isLoading ? "Enregistrement..." : (initialData ? "Mettre à jour" : "Ajouter")}
        </Button>
      </div>
    </form>
  );
};
