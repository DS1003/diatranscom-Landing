"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Image as ImageIcon,
  LogOut,
  Newspaper
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Hero (Accueil)", href: "/admin/hero", icon: ImageIcon },
  { name: "À propos", href: "/admin/about", icon: FileText },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projets", href: "/admin/projects", icon: ImageIcon },
  { name: "Témoignages", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Blog", href: "/admin/blog", icon: Newspaper },
  { name: "Messages", href: "/admin/contacts", icon: Users },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-primary-950 text-white flex flex-col h-full border-r border-primary-900">
      <div className="h-16 flex items-center px-6 border-b border-primary-900 font-bold text-xl tracking-tight">
        Diatranscom<span className="text-accent-500 ml-1">CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-900 text-white"
                      : "text-primary-300 hover:bg-primary-900/50 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-accent-500" : ""}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-900">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};
