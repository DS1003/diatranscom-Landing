"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid,
  Image,
  DocumentText,
  Briefcase,
  Message,
  BookOpen,
  Users,
  Settings,
  Logout
} from "reicon-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Grid },
  { name: "Hero (Accueil)", href: "/admin/hero", icon: Image },
  { name: "À propos", href: "/admin/about", icon: DocumentText },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projets", href: "/admin/projects", icon: Image },
  { name: "Témoignages", href: "/admin/testimonials", icon: Message },
  { name: "Blog", href: "/admin/blog", icon: BookOpen },
  { name: "Messages", href: "/admin/contacts", icon: Users },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[260px] bg-[#090D14] text-gray-300 flex flex-col h-full rounded-2xl relative z-20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-white/[0.05]">
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="h-20 flex items-center px-8 border-b border-white/[0.05] font-black text-2xl tracking-tight z-10">
        Diatrans<span className="text-accent-500">CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 z-10 no-scrollbar">
        <ul className="space-y-1.5 px-3">
          <li className="px-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 mt-2">
            Menu Principal
          </li>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-500 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
                  )}
                  <item.icon size={18} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-accent-500 ml-2" : "text-gray-500 group-hover:text-gray-300"}`} />
                  <span className={isActive ? "" : "ml-2"}>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/[0.05] z-10 bg-black/20 backdrop-blur-md">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="group flex items-center gap-3.5 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
        >
          <Logout size={18} className="transition-transform duration-300 group-hover:-translate-x-1 ml-2" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};
