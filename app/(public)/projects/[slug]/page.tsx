import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  const images = Array.isArray(project.images) ? project.images : [];
  const mainImage = images.length > 0 ? images[0] : null;

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-16">
        <Link href="/#projects">
          <Button variant="outline" className="mb-8 rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au portfolio
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-primary-950 mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-gray-100">
            {project.client && (
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Client</span>
                <span className="font-medium text-primary-900">{project.client}</span>
              </div>
            )}
            {project.date && (
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Date</span>
                <span className="font-medium text-primary-900">
                  {new Date(project.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
            )}
          </div>

          {mainImage && (
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img src={typeof mainImage === 'string' ? mainImage : undefined} alt={project.title} className="w-full h-auto object-cover aspect-[21/9]" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }} />
          </div>
        </div>
      </div>
    </div>
  );
}
