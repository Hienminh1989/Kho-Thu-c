'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pill, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin({ name: 'Quản trị viên', role: 'admin', email: 'admin@khothuoc.vn' });
      } else if (username === 'duocsi' && password === '123') {
        onLogin({ name: 'Dược sĩ Nguyễn Văn A', role: 'editor', email: 'nva@khothuoc.vn' });
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 border border-slate-100"
      >
        <div className="p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200 mb-4">
              <Pill className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kho Thuốc</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Hệ thống quản lý dược phẩm nội bộ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="admin / duocsi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Đăng nhập hệ thống
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Hệ thống bảo mật nội bộ</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
