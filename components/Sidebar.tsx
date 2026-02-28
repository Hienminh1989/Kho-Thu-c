'use client';

import React from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Pill, 
  Layers, 
  History, 
  Settings, 
  Users, 
  LogOut,
  Stethoscope
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'editor', 'viewer'] },
  { id: 'medicines', label: 'Danh mục thuốc', icon: Pill, roles: ['admin', 'editor', 'viewer'] },
  { id: 'categories', label: 'Nhóm thuốc', icon: Layers, roles: ['admin', 'editor'] },
  { id: 'logs', label: 'Nhật ký hệ thống', icon: History, roles: ['admin'] },
  { id: 'users', label: 'Người dùng', icon: Users, roles: ['admin'] },
];

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Stethoscope className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 leading-tight">Medicat Pro</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Hospital System</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {filteredMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white overflow-hidden relative">
              <Image 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Avatar" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase font-bold tracking-tighter">
                {user?.role === 'admin' ? 'Quản trị viên' : 'Dược sĩ'}
              </p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <Settings className="w-5 h-5 text-slate-400" />
          Cài đặt hệ thống
        </button>
      </div>
    </aside>
  );
}
