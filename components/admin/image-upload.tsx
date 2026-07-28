"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash, Loader } from "reicon-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 10 Mo");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'upload");
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
      // Reset the file input so the same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value && typeof value === "string" && value.trim() !== "" ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-gray-200">
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={onRemove}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
              >
                <Trash size={16} />
              </button>
            </div>
            <Image fill className="object-cover" alt="Image uploadée" src={value} sizes="200px" />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader size={32} className="animate-spin text-accent-500" />
                <span className="text-sm">Upload en cours...</span>
              </div>
            ) : (
              "Aucune image"
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload-input"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="bg-gray-100 text-gray-700 px-4 py-2 flex items-center gap-2 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <ImagePlus size={16} />
        )}
        {isUploading ? "Upload en cours..." : "Charger une image"}
      </button>
    </div>
  );
};
