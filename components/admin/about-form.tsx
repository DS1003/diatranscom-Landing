"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveAbout } from "@/actions/about-actions";
import { toast } from "sonner";

export const AboutForm = ({ initialData }: { initialData?: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Parse JSON for lists if they exist
  let initialMissions = [
    { title: "Notre Mission", desc: "" },
    { title: "Notre Équipe", desc: "" }
  ];
  let initialStats = [
    { value: "15+", label: "Années d'Expérience" },
  ];

  if (initialData?.mission) {
    try { initialMissions = JSON.parse(initialData.mission); } catch (e) {}
  }
  if (initialData?.stats) {
    try { 
      initialStats = typeof initialData.stats === "string" 
        ? JSON.parse(initialData.stats) 
        : initialData.stats; 
    } catch (e) {}
  }

  const [missions, setMissions] = useState(initialMissions);
  const [stats, setStats] = useState(initialStats);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        mission: JSON.stringify(missions),
        stats: JSON.stringify(stats),
      };
      await saveAbout(formattedData);
      toast.success("Section À Propos mise à jour");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-xl border border-gray-200">
      
      {/* General Infos */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Informations Générales</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de section</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
            placeholder="ex: Bâtir le futur avec Expertise."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte principal (Paragraphe)</label>
          <textarea
            {...register("content")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image d'illustration</label>
          <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setValue("imageUrl", url)} 
            onRemove={() => setValue("imageUrl", "")} 
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold text-gray-900">Les Statistiques (Chiffres clés)</h2>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => setStats([...stats, { value: "", label: "" }])}
          >
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>
        
        {stats.map((stat: any, index: number) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index].value = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none mb-2"
                placeholder="ex: 150+"
              />
            </div>
            <div className="flex-[2]">
              <input
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index].label = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="ex: Projets Réalisés"
              />
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="text-red-500 hover:text-red-700"
              onClick={() => setStats(stats.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Missions */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold text-gray-900">Nos Valeurs / Missions</h2>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => setMissions([...missions, { title: "", desc: "" }])}
          >
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>
        
        {missions.map((mission: any, index: number) => (
          <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
            <div className="flex-1 space-y-3">
              <input
                value={mission.title}
                onChange={(e) => {
                  const newMissions = [...missions];
                  newMissions[index].title = e.target.value;
                  setMissions(newMissions);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="Titre (ex: Innovation)"
              />
              <textarea
                value={mission.desc}
                onChange={(e) => {
                  const newMissions = [...missions];
                  newMissions[index].desc = e.target.value;
                  setMissions(newMissions);
                }}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none"
                placeholder="Description courte"
              />
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="text-red-500 hover:text-red-700 bg-white"
              onClick={() => setMissions(missions.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Mettre à jour À Propos
        </Button>
      </div>
    </form>
  );
};
