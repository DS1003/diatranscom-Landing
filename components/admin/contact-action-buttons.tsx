"use client";

import { Eye, Check, Trash2 } from "reicon-react";
import { markContactAsRead, deleteContact } from "@/actions/contact-actions";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

interface ContactActionButtonsProps {
  id: string;
  status: string;
  message: string;
  name?: string;
  email?: string;
  service?: string;
  date?: string;
}

export const ContactActionButtons = ({ id, status, message, name, email, service, date }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-end gap-2">
      <button 
        onClick={handleView}
        className="text-blue-600 hover:text-blue-800 p-1"
        title="Voir le message"
      >
        <Eye size={16} />
      </button>
      
      {status === "NEW" && (
        <button 
          onClick={handleMarkAsRead}
          className="text-green-600 hover:text-green-800 p-1"
          title="Marquer comme lu"
        >
          <Check size={16} />
        </button>
      )}

      <button 
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 p-1"
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails du message"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nom</p>
              <p className="text-sm text-gray-900">{name || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm text-gray-900">{email || "Non renseigné"}</p>
            </div>
            {service && (
              <div>
                <p className="text-sm font-medium text-gray-500">Service concerné</p>
                <p className="text-sm text-gray-900">{service}</p>
              </div>
            )}
            {date && (
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm text-gray-900">{date}</p>
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
              {message}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
