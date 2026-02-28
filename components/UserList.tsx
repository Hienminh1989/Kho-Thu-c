'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  User, 
  Shield, 
  Mail, 
  X, 
  Save, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const initialUsers = [
  { id: 1, name: 'Quản trị viên', role: 'admin', email: 'admin@medicat.pro', status: 'active' },
  { id: 2, name: 'Dược sĩ Nguyễn Văn A', role: 'editor', email: 'nva@medicat.pro', status: 'active' },
  { id: 3, name: 'Dược sĩ Trần Thị B', role: 'editor', email: 'ttb@medicat.pro', status: 'inactive' },
];

export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'editor', status: 'active' });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'editor', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id ? { ...u, ...formData } : u
      ));
    } else {
      const newUser = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        ...formData
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-4 h-4" />
          Thêm người dùng
        </button>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Người dùng</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Vai trò</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center relative overflow-hidden border-2 border-white shadow-sm">
                        <Image 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                          alt="Avatar" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{user.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${user.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <Shield className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {user.role === 'admin' ? 'Quản trị viên' : 'Dược sĩ'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                      {user.status === 'active' ? 'Đang hoạt động' : 'Tạm khóa'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email liên hệ</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="example@medicat.pro"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Vai trò</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none font-bold"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="admin">Quản trị viên</option>
                      <option value="editor">Dược sĩ</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Trạng thái</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none font-bold"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Tạm khóa</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <Save className="w-4 h-4" />
                  Lưu thông tin
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
