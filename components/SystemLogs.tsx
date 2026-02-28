'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  Shield, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

const mockLogs = [
  { id: 1, user: 'Admin', action: 'Cập nhật danh mục thuốc', target: 'Paracetamol', time: '2024-03-20 14:30:22', type: 'update', status: 'success' },
  { id: 2, user: 'Dược sĩ A', action: 'Thêm thuốc mới', target: 'Amoxicillin', time: '2024-03-20 14:15:05', type: 'create', status: 'success' },
  { id: 3, user: 'Admin', action: 'Xóa thuốc (Soft delete)', target: 'Salbutamol', time: '2024-03-20 13:50:11', type: 'delete', status: 'warning' },
  { id: 4, user: 'Hệ thống', action: 'Đăng nhập thất bại', target: 'User123', time: '2024-03-20 13:45:00', type: 'auth', status: 'error' },
  { id: 5, user: 'Dược sĩ B', action: 'Xuất báo cáo Excel', target: 'Danh mục thuốc quý 1', time: '2024-03-20 11:20:33', type: 'export', status: 'success' },
  { id: 6, user: 'Admin', action: 'Thay đổi phân quyền', target: 'Dược sĩ C', time: '2024-03-20 10:05:12', type: 'security', status: 'success' },
  { id: 7, user: 'Dược sĩ A', action: 'Cập nhật tồn kho', target: 'Metformin', time: '2024-03-20 09:30:45', type: 'update', status: 'success' },
];

export default function SystemLogs() {
  const [logs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-emerald-50 text-emerald-600';
      case 'update': return 'bg-blue-50 text-blue-600';
      case 'delete': return 'bg-red-50 text-red-600';
      case 'auth': return 'bg-purple-50 text-purple-600';
      case 'security': return 'bg-slate-900 text-white';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Tìm kiếm nhật ký..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <Filter className="w-4 h-4" />
            Lọc theo loại
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <Clock className="w-4 h-4" />
            Thời gian
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hành động</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Đối tượng</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.time}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 italic">{log.target}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {getStatusIcon(log.status)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
