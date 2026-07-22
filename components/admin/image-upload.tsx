"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-gray-200">
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={onRemove}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <Image fill className="object-cover" alt="Image uploadée" src={value} />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
            Aucune image
          </div>
        )}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset="diatranscom_preset">
        {({ open }) => {
          const onClick = () => open();

          return (
            <button
              type="button"
              onClick={onClick}
              className="bg-gray-100 text-gray-700 px-4 py-2 flex items-center gap-2 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            >
              <ImagePlus className="w-4 h-4" />
              Charger une image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
