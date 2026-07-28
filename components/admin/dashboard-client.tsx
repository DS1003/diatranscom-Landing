"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Image,
  Message,
  Users,
  TrendUp,
  ArrowUpRight
} from "reicon-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface DashboardClientProps {
  stats: {
    name: string;
    value: number;
    iconName: string;
    color: string;
  }[];
  chartData: { name: string; value: number }[];
  latestContacts: any[];
}

export const DashboardClient = ({ stats, chartData, latestContacts }: DashboardClientProps) => {
  const router = useRouter();

  const iconsMap: any = {
    Briefcase,
    Image,
    Message,
    Users
  };

  const styleMap: any = {
    Briefcase: "text-blue-600 bg-blue-50 border-blue-100/50",
    Image: "text-orange-600 bg-orange-50 border-orange-100/50",
    Message: "text-emerald-600 bg-emerald-50 border-emerald-100/50",
    Users: "text-violet-600 bg-violet-50 border-violet-100/50"
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemAnim} className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
        <p className="text-xs text-gray-500">Aperçu rapide de l&apos;activité et des contenus de votre plateforme.</p>
      </motion.div>

      {/* STATS CARDS */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = iconsMap[stat.iconName] || Briefcase;
          const styles = styleMap[stat.iconName] || "text-gray-600 bg-gray-50 border-gray-100";

          return (
            <motion.div 
              whileHover={{ y: -3, scale: 1.01, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={stat.name} 
              className="bg-white rounded-2xl border border-gray-200/70 p-5 flex items-center justify-between shadow-sm hover:border-gray-300 transition-colors cursor-pointer group"
              onClick={() => {
                const targetPath = stat.name === "Services" ? "/admin/services" : 
                                   stat.name === "Projets" ? "/admin/projects" : 
                                   stat.name === "Témoignages" ? "/admin/testimonials" : "/admin/contacts";
                router.push(targetPath);
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${styles}`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{stat.name}</p>
                </div>
              </div>
              
              <div className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* GRAPHS AND MESSAGES */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-6 border border-gray-200/70 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100/50">
              <TrendUp size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Activité récente</h2>
              <p className="text-xs text-gray-400 mt-0.5">Vue d&apos;ensemble des 6 derniers mois</p>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                  dy={8}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 8px 20px -6px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', fontSize: 12 }}
                  itemStyle={{ fontSize: 12, color: '#f97316' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f97316" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LATEST MESSAGES SECTION */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 border border-gray-200/70 hover:shadow-md transition-shadow flex flex-col">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100/50">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Derniers messages</h2>
              <p className="text-xs text-gray-400 mt-0.5">Dernières prises de contact reçues</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[250px] no-scrollbar">
            {latestContacts.length === 0 ? (
              <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-100 p-4">
                <Message size={24} className="mb-2 text-gray-300" />
                <p className="text-xs font-semibold text-gray-500">Aucun message récent.</p>
              </div>
            ) : (
              latestContacts.map((contact, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  key={contact.id} 
                  onClick={() => router.push(`/admin/contacts?search=${encodeURIComponent(contact.name)}`)}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 group cursor-pointer transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 ${
                    contact.status === 'NEW' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate leading-tight ${contact.status === 'NEW' ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                        {contact.name}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                        {new Date(contact.createdAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5 leading-none">
                      {contact.service || "Général"}
                    </p>
                  </div>
                  {contact.status === 'NEW' && (
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

