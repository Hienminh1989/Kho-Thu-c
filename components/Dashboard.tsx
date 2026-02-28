'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  Layers, 
  History, 
  Settings, 
  Users, 
  LogOut,
  Search,
  Plus,
  Bell,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { initialMedicines, initialCategories } from '@/lib/data';

// Mock Data
const statsData = [
  { name: 'T2', value: 400 },
  { name: 'T3', value: 300 },
  { name: 'T4', value: 600 },
  { name: 'T5', value: 800 },
  { name: 'T6', value: 500 },
  { name: 'T7', value: 900 },
  { name: 'CN', value: 700 },
];

const categoryData = [
  { name: 'Kháng sinh', count: 120, color: '#3b82f6' },
  { name: 'Giảm đau', count: 85, color: '#10b981' },
  { name: 'Tim mạch', count: 65, color: '#f59e0b' },
  { name: 'Tiêu hóa', count: 45, color: '#ef4444' },
];

const recentLogs = [
  { id: 1, user: 'Admin', action: 'Cập nhật thuốc', target: 'Paracetamol 500mg', time: '2 phút trước' },
  { id: 2, user: 'Editor', action: 'Thêm mới thuốc', target: 'Amoxicillin 250mg', time: '15 phút trước' },
  { id: 3, user: 'Admin', action: 'Xóa thuốc', target: 'Aspirin 81mg', time: '1 giờ trước' },
];

export default function Dashboard() {
  // Calculate real stats
  const totalMedicines = initialMedicines.length;
  const totalCategories = initialCategories.length;
  
  // Calculate category distribution
  const categoryDistribution = initialCategories.map(cat => {
    const count = initialMedicines.filter(m => m.category === cat.name && !m.isHeader).length;
    // Assign a color based on index or predefined list
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const color = colors[cat.id % colors.length];
    return { name: cat.name, count, color };
  }).sort((a, b) => b.count - a.count); // Show all categories, sorted by count

  const maxCategoryCount = Math.max(...categoryDistribution.map(c => c.count), 1);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng số thuốc', value: totalMedicines.toString(), change: 'Thực tế', icon: Pill, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Nhóm thuốc', value: totalCategories.toString(), change: 'Thực tế', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Lượt tra cứu', value: '8,290', change: '+12%', icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Người dùng', value: '156', change: '0%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Tần suất tra cứu thuốc</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col max-h-[400px]">
          <h3 className="font-bold text-slate-800 mb-6 shrink-0">Phân bổ theo nhóm (Thực tế)</h3>
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {categoryDistribution.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{cat.name}</span>
                  <span className="font-semibold text-slate-900">{cat.count} thuốc</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Settings & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Advanced Settings */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              Cài đặt chuyên sâu
            </h3>
          </div>
          <div className="p-6 space-y-6 flex-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Cảnh báo tồn kho thấp</h4>
                  <p className="text-xs text-slate-500">Ngưỡng số lượng tối thiểu để cảnh báo</p>
                </div>
                <input type="number" defaultValue={50} className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Cảnh báo thuốc sắp hết hạn</h4>
                  <p className="text-xs text-slate-500">Số tháng trước khi hết hạn</p>
                </div>
                <input type="number" defaultValue={6} className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Tự động đồng bộ CSDL Quốc gia</h4>
                  <p className="text-xs text-slate-500">Cập nhật dữ liệu định kỳ hàng ngày</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                Lưu cài đặt
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Hoạt động gần đây</h3>
            <button className="text-sm text-blue-600 hover:underline">Xem nhật ký hệ thống</button>
          </div>
          <div className="divide-y divide-slate-50 flex-1 overflow-y-auto max-h-[300px]">
          {recentLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <History className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">
                  <span className="font-semibold">{log.user}</span> {log.action}: <span className="text-blue-600 font-medium">{log.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{log.time}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
