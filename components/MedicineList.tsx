'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Info,
  AlertCircle,
  CheckCircle2,
  Pill,
  Layers,
  Save,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { initialMedicines } from '@/lib/data';

export default function MedicineList() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState<any>({
    name: '',
    generic: '',
    category: '',
    icd_codes: '',
    dosage: '',
    notes: '',
    stock: 0,
    indications: '',
    contraindications: '',
    images: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPage, setJumpPage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalPages = 207; // Mock total pages

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleEditClick = () => {
    setEditData({ ...selectedMedicine });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setMedicines(prev => prev.map(m => m.id === editData.id ? editData : m));
    setSelectedMedicine(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setCurrentImageIndex(0);
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpPage('');
    }
  };

  const handleDelete = (med: any) => {
    setDeleteConfirm(med);
  };

  const confirmDelete = () => {
    setMedicines(prev => prev.filter(m => m.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const handleAddMedicine = () => {
    const id = Math.max(...medicines.map(m => m.id)) + 1;
    setMedicines(prev => [...prev, { ...newData, id, status: 'active', isHeader: false }]);
    setIsAdding(false);
    setNewData({
      name: '',
      generic: '',
      category: '',
      icd_codes: '',
      dosage: '',
      notes: '',
      stock: 0,
      indications: '',
      contraindications: '',
      images: []
    });
  };

  const getPaginationRange = () => {
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift('...');
    range.unshift(1);
    if (currentPage + delta < totalPages - 1) range.push('...');
    range.push(totalPages);

    return range;
  };

  const filteredMedicines = medicines.filter(med => 
    (med.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (med.generic?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (med.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Tìm theo tên thuốc, hoạt chất, ICD..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {/* Search Suggestions */}
          <AnimatePresence>
            {isSearchFocused && inputValue.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
              >
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {filteredMedicines.slice(0, 5).map((med) => !med.isHeader && (
                    <div
                      key={med.id}
                      onClick={() => {
                        setInputValue(med.name);
                        setSearchTerm(med.name);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{med.name}</h4>
                        <p className="text-[10px] text-slate-500 italic">{med.generic}</p>
                      </div>
                    </div>
                  ))}
                  {filteredMedicines.filter(m => !m.isHeader).length === 0 && (
                    <div className="p-4 text-center text-sm text-slate-400">
                      Không tìm thấy kết quả phù hợp
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            <Plus className="w-4 h-4" />
            Thêm thuốc
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
          <h2 className="text-center font-bold text-slate-800 uppercase tracking-wide">
            Danh mục thuốc hóa dược và thuốc dược liệu, thuốc cổ truyền cần chú ý trong thanh toán BHYT
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="w-48 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Tên thuốc</th>
                <th className="w-64 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Chỉ định</th>
                <th className="w-64 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Chống chỉ định</th>
                <th className="w-32 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100 text-center">Mã ICD gợi ý</th>
                <th className="w-64 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Liều lượng - Cách dùng</th>
                <th className="w-48 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Chú ý</th>
                <th className="w-24 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMedicines.map((med) => (
                med.isHeader ? (
                  <tr key={med.id} className="bg-slate-50/80">
                    <td colSpan={6} className="px-6 py-3 text-center font-bold text-slate-700 text-sm">
                      {med.name}
                    </td>
                    <td className="px-6 py-3"></td>
                  </tr>
                ) : (
                  <motion.tr 
                    key={med.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors group align-top"
                  >
                    <td className="px-4 py-4 border-r border-slate-50">
                      <p className="text-sm font-bold text-slate-900">{med.name}</p>
                      <p className="text-[10px] text-slate-400 italic">{med.generic}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-50">
                      <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">{med.indications}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-50">
                      <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">{med.contraindications}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-50 text-center">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {med.icd_codes}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-50">
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{med.dosage}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-50">
                      <p className="text-xs text-slate-500 italic">{med.notes || '-'}</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setSelectedMedicine(med)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedMedicine(med);
                            setEditData({ ...med });
                            setIsEditing(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(med)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Hiển thị <span className="font-bold text-slate-900">1-6</span> trong tổng số <span className="font-bold text-slate-900">12,450</span> thuốc
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" 
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {getPaginationRange().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="text-slate-400 px-1">...</span>
                ) : (
                  <button 
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                      currentPage === page 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <form onSubmit={handleJumpPage} className="flex items-center gap-2 ml-2">
              <input 
                type="number" 
                placeholder="Trang..."
                className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
              />
              <button type="submit" className="text-xs font-bold text-blue-600 hover:underline">Nhảy</button>
            </form>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedMedicine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
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

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Image Gallery Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hình ảnh sản phẩm</p>
                    {isEditing && (
                      <button 
                        onClick={() => setEditData({ ...editData, images: [...(editData.images || []), `https://picsum.photos/seed/${Math.random()}/400/300`] })}
                        className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3 h-3" /> Thêm ảnh (Mô phỏng)
                      </button>
                    )}
                  </div>
                  
                  <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden group/gallery">
                    {(isEditing ? editData.images : selectedMedicine.images)?.length > 0 ? (
                      <>
                        <Image 
                          src={(isEditing ? editData.images : selectedMedicine.images)[currentImageIndex]} 
                          alt={isEditing ? editData.name : selectedMedicine.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {(isEditing ? editData.images : selectedMedicine.images).length > 1 && (
                          <>
                            <button 
                              onClick={() => setCurrentImageIndex(prev => (prev === 0 ? (isEditing ? editData.images : selectedMedicine.images).length - 1 : prev - 1))}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setCurrentImageIndex(prev => (prev === (isEditing ? editData.images : selectedMedicine.images).length - 1 ? 0 : prev + 1))}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {(isEditing ? editData.images : selectedMedicine.images).map((_: any, i: number) => (
                                <div 
                                  key={i} 
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-blue-600 w-4' : 'bg-white/60'}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                        <Layers className="w-10 h-10 opacity-20" />
                        <p className="text-xs font-medium">Chưa có hình ảnh</p>
                      </div>
                    )}
                  </div>

                  {isEditing && editData.images?.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {editData.images.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                          <Image 
                            src={img} 
                            alt={`Preview ${idx}`} 
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button 
                            onClick={() => {
                              const newImages = [...editData.images];
                              newImages.splice(idx, 1);
                              setEditData({ ...editData, images: newImages });
                              if (currentImageIndex >= newImages.length) setCurrentImageIndex(Math.max(0, newImages.length - 1));
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600"
                          >
                            <X className="w-2 h-2" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nhóm thuốc</p>
                    {isEditing ? (
                      <input 
                        className="w-full text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg outline-none border border-blue-200"
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg inline-block">
                        {selectedMedicine.category}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mã ICD gợi ý</p>
                    {isEditing ? (
                      <input 
                        className="w-full text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg outline-none border border-slate-200"
                        value={editData.icd_codes}
                        onChange={(e) => setEditData({ ...editData, icd_codes: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-700">{selectedMedicine.icd_codes || 'N/A'}</p>
                    )}
                  </div>
                </div>

                {/* Dosage Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <h4 className="font-bold">Liều lượng - Cách dùng</h4>
                  </div>
                  {isEditing ? (
                    <textarea 
                      className="w-full text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                      value={editData.dosage}
                      onChange={(e) => setEditData({ ...editData, dosage: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100 whitespace-pre-line">
                      {selectedMedicine.dosage || 'N/A'}
                    </p>
                  )}
                </div>

                {/* Medical Details */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Info className="w-5 h-5" />
                      <h4 className="font-bold">Chỉ định</h4>
                    </div>
                    {isEditing ? (
                      <textarea 
                        className="w-full text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        value={editData.indications}
                        onChange={(e) => setEditData({ ...editData, indications: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        {selectedMedicine.indications || 'Thông tin đang được cập nhật...'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertCircle className="w-5 h-5" />
                      <h4 className="font-bold">Chống chỉ định</h4>
                    </div>
                    {isEditing ? (
                      <textarea 
                        className="w-full text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        value={editData.contraindications}
                        onChange={(e) => setEditData({ ...editData, contraindications: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed bg-red-50/30 p-4 rounded-2xl border border-red-100">
                        {selectedMedicine.contraindications || 'Thông tin đang được cập nhật...'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FileText className="w-5 h-5" />
                      <h4 className="font-bold">Chú ý</h4>
                    </div>
                    {isEditing ? (
                      <textarea 
                        className="w-full text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                        value={editData.notes}
                        onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 italic">
                        {selectedMedicine.notes || 'Không có chú ý đặc biệt.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleCancelEdit}
                      className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Hủy
                    </button>
                    <button 
                      onClick={handleSaveEdit}
                      className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Lưu thay đổi
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setSelectedMedicine(null)}
                      className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200"
                    >
                      Đóng
                    </button>
                    <button 
                      onClick={handleEditClick}
                      className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Chỉnh sửa thông tin
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Medicine Modal */}
      <AnimatePresence>
        {isAdding && (
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
                    <Plus className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Thêm thuốc mới</h3>
                    <p className="text-sm text-slate-500">Nhập thông tin chi tiết cho thuốc mới</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Tên thuốc</label>
                    <input 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={newData.name}
                      onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Hoạt chất</label>
                    <input 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={newData.generic}
                      onChange={(e) => setNewData({ ...newData, generic: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nhóm thuốc</label>
                    <input 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={newData.category}
                      onChange={(e) => setNewData({ ...newData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Mã ICD gợi ý</label>
                    <input 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={newData.icd_codes}
                      onChange={(e) => setNewData({ ...newData, icd_codes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Liều lượng - Cách dùng</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    value={newData.dosage}
                    onChange={(e) => setNewData({ ...newData, dosage: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Hình ảnh (URLs)</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setNewData({ ...newData, images: [...newData.images, `https://picsum.photos/seed/${Math.random()}/400/300`] })}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100"
                    >
                      + Thêm ảnh mẫu
                    </button>
                    <p className="text-[10px] text-slate-400 self-center italic">* Mô phỏng việc tải lên nhiều ảnh</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {newData.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                        <Image 
                          src={img} 
                          alt="Preview" 
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => {
                            const imgs = [...newData.images];
                            imgs.splice(idx, 1);
                            setNewData({ ...newData, images: imgs });
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-sm"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Chỉ định</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    value={newData.indications}
                    onChange={(e) => setNewData({ ...newData, indications: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Chống chỉ định</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    value={newData.contraindications}
                    onChange={(e) => setNewData({ ...newData, contraindications: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleAddMedicine}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Thêm thuốc
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Xác nhận xóa?</h3>
                <p className="text-sm text-slate-500">
                  Bạn có chắc chắn muốn xóa thuốc <span className="font-bold text-slate-900">{deleteConfirm.name}</span>? 
                  Hành động này sẽ thực hiện &quot;xóa mềm&quot; và có thể khôi phục từ nhật ký hệ thống.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                >
                  Xác nhận xóa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
