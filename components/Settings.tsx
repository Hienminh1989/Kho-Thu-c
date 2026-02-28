'use client';

import React, { useState, useEffect } from 'react';
import { Save, Database, Key, Link as LinkIcon, ShieldCheck, Loader2, Phone, Server } from 'lucide-react';

export default function Settings() {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [zaloPhone, setZaloPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch settings from server
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setDatabaseUrl(data.databaseUrl || '');
          setApiUrl(data.pharmaApiUrl || '');
          setApiKey(data.pharmaApiKey || '');
          setZaloPhone(data.zaloPhone || '');
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          databaseUrl,
          pharmaApiUrl: apiUrl,
          pharmaApiKey: apiKey,
          zaloPhone,
        }),
      });
      
      if (res.ok) {
        alert('Đã lưu cấu hình hệ thống thành công! Máy chủ có thể sẽ khởi động lại để áp dụng thay đổi.');
      } else {
        alert('Có lỗi xảy ra khi lưu cấu hình.');
      }
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      alert('Không thể kết nối đến máy chủ.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Cấu hình Cơ sở dữ liệu</h2>
            <p className="text-slate-500">Thiết lập kết nối PostgreSQL (Prisma)</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Database URL</label>
            <div className="relative">
              <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={databaseUrl} 
                onChange={e => setDatabaseUrl(e.target.value)} 
                placeholder="VD: postgresql://user:password@localhost:5432/mydb?schema=public"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900" 
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Chuỗi kết nối PostgreSQL. Thay đổi này sẽ được lưu vào file .env và yêu cầu khởi động lại ứng dụng.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Cấu hình CSDL Dược Quốc gia</h2>
            <p className="text-slate-500">Thiết lập kết nối API tới hệ thống của Cục Quản lý Dược</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">API Endpoint URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={apiUrl} 
                onChange={e => setApiUrl(e.target.value)} 
                placeholder="VD: https://api.drugbank.vn/v1"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-900" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">API Key / Access Token</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)} 
                placeholder="Nhập API Key được cấp bởi Cục Quản lý Dược..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-900" 
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
              API Key được mã hóa và lưu trữ an toàn trên máy chủ. Không chia sẻ mã này.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Thông tin liên hệ</h2>
            <p className="text-slate-500">Cấu hình các kênh liên lạc với khách hàng</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại Zalo</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={zaloPhone} 
                onChange={e => setZaloPhone(e.target.value)} 
                placeholder="VD: 0123456789"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-900" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Lưu tất cả cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
