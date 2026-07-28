"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader, Plus } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";
import { getServiceGallery, reorderServiceMedia } from "@/actions/gallery-actions";
import { SortableMediaItem } from "./sortable-media-item";
import { MediaForm } from "./media-form";

interface ServiceGalleryManagerProps {
  serviceId: string;
}

export const ServiceGalleryManager = ({ serviceId }: ServiceGalleryManagerProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const data = await getServiceGallery(serviceId);
      setItems(data);
    } catch (error) {
      toast.error("Erreur lors du chargement de la galerie");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [serviceId]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Update order field in UI immediately for optimism
      const reorderedItems = newItems.map((item, index) => ({
        ...item,
        order: index,
      }));
      setItems(reorderedItems);

      // Send to server
      try {
        await reorderServiceMedia(reorderedItems.map((i) => ({ id: i.id, order: i.order })));
        toast.success("Ordre mis à jour");
      } catch (error) {
        toast.error("Erreur lors de la réorganisation");
        loadMedia(); // reload on error
      }
    }
  };

  const openModal = (media?: any) => {
    setSelectedMedia(media || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
    loadMedia(); // refresh list after create/update
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Galerie de Réalisations</h3>
          <p className="text-sm text-gray-500">Ajoutez et réorganisez les photos et vidéos pour ce service.</p>
        </div>
        <Button type="button" variant="accent" size="sm" onClick={() => openModal()}>
          <Plus size={16} className="mr-2" />
          Ajouter un média
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-500">
          Aucun média dans la galerie pour le moment.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((media) => (
                <SortableMediaItem 
                  key={media.id} 
                  media={media} 
                  onEdit={() => openModal(media)}
                  onRefresh={loadMedia}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedMedia ? "Modifier le média" : "Ajouter un média"}
      >
        <MediaForm 
          serviceId={serviceId} 
          initialData={selectedMedia} 
          onSuccess={closeModal} 
        />
      </Modal>
    </div>
  );
};
