'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Layers,
  ChevronRight,
  Pill,
  X,
  Save,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { initialCategories, initialMedicines } from '@/lib/data';

export default function CategoryList() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', color: 'bg-blue-500' });
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-yellow-500'];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedColorFilter ? cat.color === selectedColorFilter : true)
  );

  // Mock medicines for category detail view
  const categoryMedicines = initialMedicines.filter(m => !m.isHeader && m.category === selectedCategory?.name);
  const filteredCategoryMedicines = categoryMedicines.filter(m => 
    (m.name?.toLowerCase().includes(medicineSearchTerm.toLowerCase())) || 
    (m.generic?.toLowerCase().includes(medicineSearchTerm.toLowerCase()))
  );

  const handleOpenModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description, color: category.color });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', color: 'bg-blue-500' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
    } else {
      const newCategory = {
        id: Math.max(0, ...categories.map(c => c.id)) + 1,
        ...formData,
        count: 0
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhóm thuốc này?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  if (selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{selectedCategory.name}</h2>
            <p className="text-sm text-slate-500">{selectedCategory.description}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Tìm thuốc trong nhóm..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              value={medicineSearchTerm}
              onChange={(e) => setMedicineSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            {filteredCategoryMedicines.length} thuốc
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategoryMedicines.map(med => (
            <div 
              key={med.id} 
              onClick={() => setSelectedMedicine(med)}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                {med.images && med.images.length > 0 ? (
                  <img src={med.images[0]} alt={med.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Pill className="w-6 h-6" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{med.name}</h4>
                <p className="text-xs text-slate-500 italic">{med.generic}</p>
              </div>
            </div>
          ))}
          {filteredCategoryMedicines.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              Không tìm thấy thuốc nào phù hợp.
            </div>
          )}
        </div>

        {/* Medicine Detail Modal */}
        <AnimatePresence>
          {selectedMedicine && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                      <Pill className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{selectedMedicine.name}</h3>
                      <p className="text-sm text-slate-500 italic">{selectedMedicine.generic}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMedicine(null)}
                    className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {selectedMedicine.images && selectedMedicine.images.length > 0 && (
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-6">
                      <img src={selectedMedicine.images[0]} alt={selectedMedicine.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Chỉ định</p>
                      <p className="text-sm text-slate-700">{selectedMedicine.indications || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Chống chỉ định</p>
                      <p className="text-sm text-slate-700">{selectedMedicine.contraindications || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Liều dùng</p>
                      <p className="text-sm text-slate-700 whitespace-pre-line">{selectedMedicine.dosage || 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Tìm kiếm nhóm thuốc..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Color Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <button 
            onClick={() => setSelectedColorFilter(null)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${!selectedColorFilter ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            Tất cả màu
          </button>
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColorFilter(color === selectedColorFilter ? null : color)}
              className={`w-8 h-8 rounded-lg transition-all shrink-0 ${color} ${selectedColorFilter === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'opacity-50 hover:opacity-100'}`}
              title="Lọc theo màu"
            />
          ))}
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Thêm nhóm
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100/20`}>
                <Layers className="text-white w-6 h-6" />
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleOpenModal(cat)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Pill className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold">{cat.count} loại thuốc</span>
              </div>
              <button 
                onClick={() => setSelectedCategory(cat)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                Xem danh sách
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
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
                  {editingCategory ? 'Chỉnh sửa nhóm thuốc' : 'Thêm nhóm thuốc mới'}
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
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên nhóm thuốc</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="Ví dụ: Thuốc giải biểu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mô tả</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                    placeholder="Nhập mô tả chi tiết về nhóm thuốc..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Màu sắc đại diện</label>
                  <div className="flex gap-3">
                    {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500'].map(color => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-xl transition-all ${color} ${formData.color === color ? 'ring-4 ring-offset-2 ring-slate-200 scale-110' : 'opacity-60 hover:opacity-100'}`}
                      />
                    ))}
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
                  Lưu thay đổi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
