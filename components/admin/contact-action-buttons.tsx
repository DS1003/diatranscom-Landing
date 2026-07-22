"use client";

import { Eye, Check, Trash2 } from "lucide-react";
import { markContactAsRead, deleteContact } from "@/actions/contact-actions";
import { toast } from "sonner";
import { useState } from "react";

interface ContactActionButtonsProps {
  id: string;
  status: string;
  message: string;
}

export const ContactActionButtons = ({ id, status, message }: ContactActionButtonsProps) => {
  const [isViewing, setIsViewing] = useState(false);

  const handleMarkAsRead = async () => {
    try {
      await markContactAsRead(id);
      toast.success("Message marqué comme lu");
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        await deleteContact(id);
        toast.success("Message supprimé");
      } catch {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleView = () => {
    if (status === "NEW") {
      handleMarkAsRead();
    }
    // Simplification for now: Use alert to show message, 
    // ideally should use a Dialog/Modal from shadcn
    alert("Message:\n\n" + message);
  };

  return (
    <div className="flex justify-end gap-2">
      <button 
        onClick={handleView}
        className="text-blue-600 hover:text-blue-800 p-1"
        title="Voir le message"
      >
        <Eye className="w-4 h-4" />
      </button>
      
      {status === "NEW" && (
        <button 
          onClick={handleMarkAsRead}
          className="text-green-600 hover:text-green-800 p-1"
          title="Marquer comme lu"
        >
          <Check className="w-4 h-4" />
        </button>
      )}

      <button 
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 p-1"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
