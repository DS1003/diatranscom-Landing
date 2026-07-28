import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-[#F4F4F7] overflow-hidden selection:bg-accent-500/30">
      <div className="p-4 pr-0 h-full hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header user={session.user} />
        <main className="admin-scrollbar flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
