"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ZoomIn, MapPin, Calendar, Tag } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ServiceGalleryProps {
  media: any[];
}

export const ServiceGallery = ({ media }: ServiceGalleryProps) => {
  const [index, setIndex] = useState(-1);
  const activeMedia = media.filter(m => m.isActive);

  if (activeMedia.length === 0) return null;

  // Format slides for the Lightbox
  const slides = activeMedia.map((item) => {
    const isYoutube = item.type === "VIDEO" && item.url.includes("youtube");
    const videoId = isYoutube ? (item.url.split("v=")[1]?.split("&")[0] || item.url.split("/").pop()) : null;
    
    // Construct captions
    const metaParts = [];
    if (item.location) metaParts.push(`📍 ${item.location}`);
    if (item.date) metaParts.push(`📅 ${format(new Date(item.date), "MMMM yyyy", { locale: fr })}`);
    if (item.project) metaParts.push(`🏗️ Projet: ${item.project.title}`);
    
    const description = [
      item.description || "",
      metaParts.length > 0 ? `<div style="margin-top:10px;font-size:14px;color:#cbd5e1">${metaParts.join(" &nbsp;|&nbsp; ")}</div>` : ""
    ].filter(Boolean).join("<br/>");

    if (item.type === "VIDEO") {
      return {
        type: "video" as const,
        sources: [
          {
            src: item.url,
            type: "video/mp4",
          },
        ],
        title: item.title || "Vidéo",
        description,
      };
    }

    return {
      src: item.url,
      title: item.title || "Image",
      description,
    };
  });

  return (
    <div className="pt-24 border-t border-white/10 mt-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
          Nos <span className="text-accent-500">Réalisations</span>
        </h2>
        <p className="text-primary-300 text-lg">
          Découvrez quelques-uns de nos projets et interventions sur le terrain.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {activeMedia.map((item, i) => {
          const isYoutube = item.type === "VIDEO" && item.url.includes("youtube");
          const videoId = isYoutube ? (item.url.split("v=")[1]?.split("&")[0] || item.url.split("/").pop()) : null;
          const thumbUrl = isYoutube 
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
            : item.url;

          return (
            <div 
              key={item.id} 
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-primary-900 border border-white/5"
              onClick={() => setIndex(i)}
            >
              <div className="relative w-full aspect-auto">
                <img 
                  src={thumbUrl} 
                  alt={item.title || "Réalisation"} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title && <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>}
                  
                  <div className="flex flex-wrap gap-3 mt-3">
                    {item.location && (
                      <span className="inline-flex items-center text-xs font-medium text-primary-300 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.location}
                      </span>
                    )}
                    {item.project && (
                      <span className="inline-flex items-center text-xs font-medium text-primary-300 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {item.project.title}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Icon indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                {item.type === "VIDEO" ? <Play className="w-4 h-4 fill-current" /> : <ZoomIn className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Video, Captions]}
        captions={{ showToggle: true, descriptionTextAlign: "start" }}
        video={{
          autoPlay: true,
          controls: true
        }}
      />
    </div>
  );
};
