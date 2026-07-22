import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {
  Briefcase,
  ImageIcon,
  MessageSquare,
  Users,
  TrendingUp,
} from "lucide-react";

// Server Component Fetch
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function DashboardPage() {
  const [servicesCount, projectsCount, testimonialsCount, contactsCount] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.contact.count(),
  ]);

  const stats = [
    { name: "Services", value: servicesCount, icon: Briefcase, color: "bg-blue-500" },
    { name: "Projets", value: projectsCount, icon: ImageIcon, color: "bg-accent-500" },
    { name: "Témoignages", value: testimonialsCount, icon: MessageSquare, color: "bg-green-500" },
    { name: "Messages", value: contactsCount, icon: Users, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center mr-4 shadow-sm`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-500" />
            Aperçu de l'activité
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            [Graphique Recharts à intégrer]
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Derniers messages reçus</h2>
          <div className="space-y-4">
            {/* Simulation de messages vides */}
            {contactsCount === 0 ? (
              <p className="text-sm text-gray-500 italic">Aucun message pour le moment.</p>
            ) : (
              <div className="text-sm text-gray-500">Affichage des messages bientôt disponible.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
