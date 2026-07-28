"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BlogForm } from "@/components/admin/blog-form";
import { deletePost } from "@/actions/blog-actions";
import { toast } from "sonner";

import { useSearchParams } from "next/navigation";

export const BlogClient = ({ posts }: { posts: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search") || "";

  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchVal.toLowerCase()) ||
    (post.authorName && post.authorName.toLowerCase().includes(searchVal.toLowerCase())) ||
    (post.content && post.content.toLowerCase().includes(searchVal.toLowerCase()))
  );

  const openModal = (post?: any) => {
    setSelectedPost(post || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      try {
        await deletePost(id);
        toast.success("Article supprimé");
      } catch (e) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Actualités & Blog</h1>
        <Button variant="accent" className="flex items-center gap-2" onClick={() => openModal()}>
          <Plus size={16} />
          Nouvel Article
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4">Date de Création</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Aucun article trouvé.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 text-gray-500">{post.authorName || "-"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        post.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {post.isActive ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => openModal(post)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedPost ? "Modifier l'article" : "Ajouter un article"}
        description={selectedPost ? "Modifiez le contenu de l'article." : "Rédigez un nouvel article pour le blog."}
      >
        <BlogForm initialData={selectedPost} onSuccess={closeModal} />
      </Modal>
    </div>
  );
};
