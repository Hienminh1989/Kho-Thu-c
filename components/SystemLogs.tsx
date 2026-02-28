'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  Shield, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Info,
  Columns,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockLogs = [
  { id: 1, user: 'Admin', action: 'Cập nhật danh mục thuốc', target: 'Paracetamol', time: '2024-03-20 14:30:22', type: 'update', status: 'success' },
  { id: 2, user: 'Dược sĩ A', action: 'Thêm thuốc mới', target: 'Amoxicillin', time: '2024-03-20 14:15:05', type: 'create', status: 'success' },
  { id: 3, user: 'Admin', action: 'Xóa thuốc (Soft delete)', target: 'Salbutamol', time: '2024-03-20 13:50:11', type: 'delete', status: 'warning' },
  { id: 4, user: 'Hệ thống', action: 'Đăng nhập thất bại', target: 'User123', time: '2024-03-20 13:45:00', type: 'auth', status: 'error' },
  { id: 5, user: 'Dược sĩ B', action: 'Xuất báo cáo Excel', target: 'Danh mục thuốc quý 1', time: '2024-03-20 11:20:33', type: 'export', status: 'success' },
  { id: 6, user: 'Admin', action: 'Thay đổi phân quyền', target: 'Dược sĩ C', time: '2024-03-20 10:05:12', type: 'security', status: 'success' },
  { id: 7, user: 'Dược sĩ A', action: 'Cập nhật tồn kho', target: 'Metformin', time: '2024-03-20 09:30:45', type: 'update', status: 'success' },
  { id: 8, user: 'Admin', action: 'Thêm nhóm thuốc', target: 'Kháng sinh', time: '2024-03-19 15:20:10', type: 'create', status: 'success' },
  { id: 9, user: 'Dược sĩ C', action: 'Cập nhật giá', target: 'Ibuprofen', time: '2024-03-19 14:10:05', type: 'update', status: 'success' },
  { id: 10, user: 'Hệ thống', action: 'Đồng bộ CSDL Quốc gia', target: 'API Drugbank', time: '2024-03-19 02:00:00', type: 'system', status: 'success' },
  { id: 11, user: 'Admin', action: 'Xóa người dùng', target: 'Dược sĩ D', time: '2024-03-18 16:45:22', type: 'delete', status: 'warning' },
  { id: 12, user: 'Dược sĩ A', action: 'Thêm thuốc mới', target: 'Omeprazole', time: '2024-03-18 10:15:30', type: 'create', status: 'success' },
];

const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? <span key={i} className="bg-yellow-200 font-bold text-slate-900 px-0.5 rounded">{part}</span> : <span key={i}>{part}</span>
      )}
    </span>
  );
};

export default function SystemLogs() {
  const [logs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [visibleColumns, setVisibleColumns] = useState({
    time: true,
    user: true,
    action: true,
    target: true,
    type: true,
    status: true
  });
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleColumn = (col: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

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
        <div className="flex items-center gap-3 w-full md:w-auto relative">
          <button 
            onClick={() => setShowColumnToggle(!showColumnToggle)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <Columns className="w-4 h-4" />
            Cột hiển thị
          </button>
          
          <AnimatePresence>
            {showColumnToggle && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-10"
              >
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 px-2">Tùy chỉnh cột</div>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.time} onChange={() => toggleColumn('time')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Thời gian</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.user} onChange={() => toggleColumn('user')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Người dùng</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.action} onChange={() => toggleColumn('action')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Hành động</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.target} onChange={() => toggleColumn('target')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Đối tượng</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.type} onChange={() => toggleColumn('type')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Loại</span>
                </label>
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={visibleColumns.status} onChange={() => toggleColumn('status')} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Trạng thái</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <Filter className="w-4 h-4" />
            Lọc
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {visibleColumns.time && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian</th>}
                {visibleColumns.user && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Người dùng</th>}
                {visibleColumns.action && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hành động</th>}
                {visibleColumns.target && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Đối tượng</th>}
                {visibleColumns.type && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại</th>}
                {visibleColumns.status && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedLogs.map((log) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {visibleColumns.time && <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.time}</td>}
                  {visibleColumns.user && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          <HighlightText text={log.user} highlight={searchTerm} />
                        </span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.action && (
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                      <HighlightText text={log.action} highlight={searchTerm} />
                    </td>
                  )}
                  {visibleColumns.target && (
                    <td className="px-6 py-4 text-sm text-slate-600 italic">
                      <HighlightText text={log.target} highlight={searchTerm} />
                    </td>
                  )}
                  {visibleColumns.type && (
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {getStatusIcon(log.status)}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
              {paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Không tìm thấy nhật ký nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="text-sm text-slate-500">
              Hiển thị <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> đến <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredLogs.length)}</span> trong tổng số <span className="font-bold text-slate-900">{filteredLogs.length}</span> bản ghi
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                      currentPage === page 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
