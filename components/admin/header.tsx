"use client";

import { Bell, Search, User as UserIcon } from "lucide-react";
import type { User } from "next-auth";

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-full text-sm focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-accent-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pl-6">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500">{user?.role || "Administrateur"}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200 shadow-sm">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
        </div>
      </div>
    </header>
  );
};
