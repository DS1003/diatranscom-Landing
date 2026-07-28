"use client";

import { Bell, Search, Menu, X, Logout, ArrowLeft, Settings } from "reicon-react";
import type { User } from "next-auth";
import { useState, useEffect, useRef } from "react";
import { Sidebar } from "./sidebar";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { getContacts, markContactAsRead } from "@/actions/contact-actions";
import { globalSearch } from "@/actions/search-actions";
import Link from "next/link";

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    services: any[];
    projects: any[];
    blogs: any[];
    contacts: any[];
  }>({ services: [], projects: [], blogs: [], contacts: [] });

  const pathname = usePathname();
  const router = useRouter();

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch unread messages/contacts
  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (e) {
      console.error("Failed to fetch notifications:", e);
    }
  };

  useEffect(() => {
    fetchContacts();
    // Poll notifications every 30 seconds
    const interval = setInterval(fetchContacts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync search input value with URL parameter on path change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchVal(params.get("search") || "");
  }, [pathname]);

  // Debounced search logic for URL params syncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const currentQuery = params.get("search") || "";

      if (searchVal !== currentQuery) {
        if (searchVal) {
          params.set("search", searchVal);
        } else {
          params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal, pathname, router]);

  // Perform global database search when typing
  useEffect(() => {
    if (!searchVal.trim()) {
      setSearchResults({ services: [], projects: [], blogs: [], contacts: [] });
      return;
    }

    const performSearch = async () => {
      const results = await globalSearch(searchVal);
      setSearchResults(results);
    };

    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  // Close dropdowns on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setSearchFocused(false);
  }, [pathname]);

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadContacts = contacts.filter((c) => c.status === "NEW");

  return (
    <>
      <header className="h-16 bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl flex items-center justify-between px-4 lg:px-6 z-30 sticky top-4 mx-4 lg:mx-8">
        <div className="flex items-center flex-1 max-w-md gap-2">
          <button 
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 bg-black/[0.02] rounded-xl"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          
          <div className="relative group flex-1 hidden sm:block" ref={searchRef}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full pl-11 pr-4 py-2 bg-transparent hover:bg-black/[0.02] border border-transparent rounded-xl text-sm focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02] outline-none transition-all placeholder:text-gray-400"
            />

            {/* Global Search Results Dropdown */}
            {searchFocused && searchVal.trim() !== "" && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-[480px] overflow-y-auto z-50 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">Recherche Globale</span>
                  <span className="text-[10px] bg-accent-50 text-accent-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">CMS</span>
                </div>
                
                {Object.values(searchResults).every(arr => arr.length === 0) ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    Aucun résultat trouvé pour &ldquo;<span className="font-semibold">{searchVal}</span>&rdquo;
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {/* Services section */}
                    {searchResults.services.length > 0 && (
                      <div className="py-2.5">
                        <div className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Services ({searchResults.services.length})
                        </div>
                        {searchResults.services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/admin/services?search=${encodeURIComponent(searchVal)}`}
                            onClick={() => setSearchFocused(false)}
                            className="block px-4 py-2 hover:bg-gray-50 text-left"
                          >
                            <p className="text-sm font-semibold text-gray-900">{service.title}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{service.description}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Projects section */}
                    {searchResults.projects.length > 0 && (
                      <div className="py-2.5">
                        <div className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Projets ({searchResults.projects.length})
                        </div>
                        {searchResults.projects.map((project) => (
                          <Link
                            key={project.id}
                            href={`/admin/projects?search=${encodeURIComponent(searchVal)}`}
                            onClick={() => setSearchFocused(false)}
                            className="block px-4 py-2 hover:bg-gray-50 text-left"
                          >
                            <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {project.client ? `Client: ${project.client}` : ""} &bull; {project.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Blogs section */}
                    {searchResults.blogs.length > 0 && (
                      <div className="py-2.5">
                        <div className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Articles du Blog ({searchResults.blogs.length})
                        </div>
                        {searchResults.blogs.map((blog) => (
                          <Link
                            key={blog.id}
                            href={`/admin/blog?search=${encodeURIComponent(searchVal)}`}
                            onClick={() => setSearchFocused(false)}
                            className="block px-4 py-2 hover:bg-gray-50 text-left"
                          >
                            <p className="text-sm font-semibold text-gray-900">{blog.title}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{blog.excerpt || blog.content}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Contacts section */}
                    {searchResults.contacts.length > 0 && (
                      <div className="py-2.5">
                        <div className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Messages / Contacts ({searchResults.contacts.length})
                        </div>
                        {searchResults.contacts.map((contact) => (
                          <Link
                            key={contact.id}
                            href={`/admin/contacts?search=${encodeURIComponent(searchVal)}`}
                            onClick={() => setSearchFocused(false)}
                            className="block px-4 py-2 hover:bg-gray-50 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                              <span className="text-[10px] text-gray-400">{contact.email}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {contact.service ? `Sujet: ${contact.service}` : ""} &bull; {contact.message}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5 pl-2 lg:pl-6">
          {/* Notifications Button & Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                notificationsOpen ? "bg-black/[0.05] text-gray-900" : "text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]"
              }`}
            >
              <Bell size={18} />
              {unreadContacts.length > 0 && (
                <span className="absolute top-2 right-2 w-4.5 h-4.5 bg-accent-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white shadow-sm">
                  {unreadContacts.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                  {unreadContacts.length > 0 && (
                    <button
                      onClick={async () => {
                        await Promise.all(unreadContacts.map((c) => markContactAsRead(c.id)));
                        fetchContacts();
                      }}
                      className="text-xs text-accent-600 hover:text-accent-700 font-medium"
                    >
                      Tout marquer lu
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto pt-1">
                  {unreadContacts.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500 text-xs">
                      Aucune nouvelle notification
                    </div>
                  ) : (
                    unreadContacts.map((contact) => (
                      <Link
                        key={contact.id}
                        href="/admin/contacts"
                        onClick={async () => {
                          await markContactAsRead(contact.id);
                          setNotificationsOpen(false);
                          fetchContacts();
                        }}
                        className="block px-4 py-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0 text-left"
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {contact.name}
                          </p>
                          <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                          Sujet: {contact.service || "Général"}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
                <div className="px-4 pt-2 border-t border-gray-100 text-center">
                  <Link
                    href="/admin/contacts"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-medium inline-block"
                  >
                    Voir tous les messages
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer group hover:bg-black/[0.02] p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-black/[0.04] outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.name || "Admin"}</p>
                <p className="text-[11px] font-medium text-gray-500 leading-tight">{user?.role || "Administrateur"}</p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || "Super Admin"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "admin@diatranscom.com"}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft size={16} className="text-gray-400" />
                    Retour au site
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    Paramètres
                  </Link>
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Logout size={16} className="text-red-400" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div className="relative w-[260px] max-w-full h-full flex flex-col bg-[#090D14] shadow-2xl animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
};
