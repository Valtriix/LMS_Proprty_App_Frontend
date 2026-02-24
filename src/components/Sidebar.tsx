
import React from 'react';
import { UserRole } from '@/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const isSales = user.role === UserRole.SALES_EXECUTIVE;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'leads', label: 'Leads', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'vcvp', label: 'VCVP', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'site-visits', label: 'Site Visits', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    
  ];

  if (isAdmin) {
    menuItems.push({ id: 'cross-pitch', label: 'Cross Pitch', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' });
    menuItems.push({ id: 'reports', label: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' });
    menuItems.push({ id: 'projects', label: 'Master Data', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' });
    menuItems.push({ id: 'all-projects', label: 'All Projects', icon: 'M3 7h18M3 12h18M3 17h18' });
  }

  return (
    <div className="w-64 bg-slate-900 flex flex-col h-full text-gray-300 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-2xl font-bold text-blue-400">EstateFlow</span>
        <span className="ml-2 text-xs font-semibold bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">CRM</span>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Signed in as</p>
          <p className="text-sm font-semibold text-white truncate">{user.name}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{user.role}</p>
        </div>
      </div>
    </div>
  );
};
