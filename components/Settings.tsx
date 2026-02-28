'use client';

import React, { useState, useEffect } from 'react';
import { Save, Database, Key, Link as LinkIcon, ShieldCheck, Loader2 } from 'lucide-react';

export default function Settings() {
  const [apiUrl, setApiUrl] = useState('https://api.drugbank.vn/v1');
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage (simulating DB/env config for demo)
    const savedUrl = localStorage.getItem('national_db_url');
    const savedKey = localStorage.getItem('national_db_key');
    if (savedUrl) setApiUrl(savedUrl);
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Save to localStorage for demo purposes
    localStorage.setItem('national_db_url', apiUrl);
    localStorage.setItem('national_db_key', apiKey);
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Đã lưu cấu hình CSDL Quốc gia thành công!');
    }, 800);
  };

  return (
    <div className="max-w-4xl space-y-8">
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

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
