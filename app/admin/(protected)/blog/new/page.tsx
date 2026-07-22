import { BlogForm } from "@/components/admin/blog-form";

export default function NewPostPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Ajouter un Article</h1>
      <BlogForm />
    </div>
  );
}
