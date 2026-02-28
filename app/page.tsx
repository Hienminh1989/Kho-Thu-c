'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import MedicineList from '@/components/MedicineList';
import CategoryList from '@/components/CategoryList';
import SystemLogs from '@/components/SystemLogs';
import UserList from '@/components/UserList';
import Login from '@/components/Login';
import LandingPage from '@/components/LandingPage';
import { Bell, Search, HelpCircle } from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'landing' | 'login' | 'admin'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setView('admin');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setActiveTab('dashboard');
  };

  if (view === 'landing') {
    return <LandingPage onGoToLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Tổng quan hệ thống' : 
               activeTab === 'medicines' ? 'Quản lý danh mục thuốc' : 
               activeTab === 'categories' ? 'Quản lý nhóm thuốc' : 
               activeTab === 'logs' ? 'Nhật ký hệ thống' : 
               activeTab === 'users' ? 'Quản lý người dùng' : 'Hệ thống'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Trợ giúp</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'medicines' && <MedicineList />}
          {activeTab === 'categories' && <CategoryList />}
          {activeTab === 'logs' && <SystemLogs />}
          {activeTab === 'users' && <UserList />}
        </div>
      </main>
    </div>
  );
}
