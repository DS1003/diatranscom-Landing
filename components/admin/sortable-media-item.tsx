"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Image as ReiconImage, Video, Trash2, Edit2, Star, EyeOff } from "reicon-react";
import Image from "next/image";
import { deleteServiceMedia, setServiceMediaCover } from "@/actions/gallery-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const SortableMediaItem = ({ media, onEdit, onRefresh }: { media: any, onEdit: () => void, onRefresh: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: media.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Supprimer ce média ?")) return;
    
    setIsDeleting(true);
    try {
      await deleteServiceMedia(media.id);
      toast.success("Média supprimé");
      onRefresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      setIsDeleting(false);
    }
  };

  const handleSetCover = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await setServiceMediaCover(media.id, media.serviceId);
      toast.success("Image de couverture définie");
      onRefresh();
    } catch (error) {
      toast.error("Erreur");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all ${
        !media.isActive ? "opacity-60 grayscale" : ""
      } ${media.isCover ? "ring-2 ring-accent-500" : "border-gray-200"}`}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm text-gray-500 cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Type Badge */}
      <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-medium rounded shadow-sm flex items-center">
        {media.type === "VIDEO" ? <Video size={12} className="mr-1" /> : <ReiconImage size={12} className="mr-1" />}
        {media.type === "VIDEO" ? "Vidéo" : "Photo"}
      </div>

      {/* Cover Badge */}
      {media.isCover && (
        <div className="absolute top-10 left-2 z-10 px-2 py-1 bg-accent-500 text-primary-950 text-xs font-bold rounded shadow-sm flex items-center">
          <Star size={12} className="mr-1 fill-current" />
          Cover
        </div>
      )}

      {/* Hidden Badge */}
      {!media.isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full shadow-sm flex items-center">
          <EyeOff size={16} className="mr-2" />
          Masqué
        </div>
      )}

      {/* Image Preview */}
      <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
        {media.type === "VIDEO" && media.url.includes("youtube") ? (
          <img 
            src={`https://img.youtube.com/vi/${media.url.split("v=")[1]?.split("&")[0] || media.url.split("/").pop()}/hqdefault.jpg`} 
            alt={media.title || "Video"} 
            className="w-full h-full object-cover"
          />
        ) : (
          <Image 
            src={media.url || "/placeholder-image.jpg"} 
            alt={media.title || "Media"} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-white border-t border-gray-100">
        <p className="text-sm font-medium text-gray-900 truncate">
          {media.title || "Sans titre"}
        </p>
        <p className="text-xs text-gray-500 truncate mt-0.5">
          {media.location || media.project?.title || "Aucun lieu"}
        </p>
      </div>

      {/* Hover Actions Overlay */}
      <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" onClick={onEdit}>
          <Edit2 size={16} />
        </Button>
        {media.type === "IMAGE" && !media.isCover && (
          <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-900" onClick={handleSetCover} title="Définir comme couverture">
            <Star size={16} />
          </Button>
        )}
        <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={handleDelete} disabled={isDeleting}>
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
