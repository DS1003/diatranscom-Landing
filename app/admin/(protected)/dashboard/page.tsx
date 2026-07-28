import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/admin/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let servicesCount = 0;
  let projectsCount = 0;
  let testimonialsCount = 0;
  let contactsCount = 0;
  let latestContacts: any[] = [];

  try {
    const [s, p, t, c, latest] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.testimonial.count(),
      prisma.contact.count(),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      })
    ]);
    servicesCount = s;
    projectsCount = p;
    testimonialsCount = t;
    contactsCount = c;
    latestContacts = latest;
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
  }

  const stats = [
    { name: "Services", value: servicesCount, iconName: "Briefcase", color: "bg-blue-500" },
    { name: "Projets", value: projectsCount, iconName: "Image", color: "bg-orange-500" },
    { name: "Témoignages", value: testimonialsCount, iconName: "Message", color: "bg-emerald-500" },
    { name: "Messages", value: contactsCount, iconName: "Users", color: "bg-violet-500" },
  ];

  // Dummy chart data for Recharts (representing visits or activity)
  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Fév", value: 300 },
    { name: "Mar", value: 550 },
    { name: "Avr", value: 450 },
    { name: "Mai", value: 700 },
    { name: "Juin", value: 900 },
  ];

  return (
    <DashboardClient 
      stats={stats} 
      chartData={chartData} 
      latestContacts={latestContacts} 
    />
  );
}
