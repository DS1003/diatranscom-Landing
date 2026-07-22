import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = {};
  try {
    const rawSettings = await prisma.setting.findMany();
    settings = rawSettings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch settings from database:", error);
  }

  return (
    <div className="bg-primary-950 text-white min-h-screen flex flex-col">
      <Header settings={settings} />
      <main className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
