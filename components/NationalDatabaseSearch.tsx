'use client';

import React, { useState } from 'react';
import { Search, Database, Loader2, FileText, Building2, Pill, Globe } from 'lucide-react';

interface MedicineRecord {
  id: string;
  registrationNo: string;
  name: string;
  activeIngredient: string;
  dosageForm: string;
  packaging: string;
  manufacturer: string;
  country: string;
  standard: string;
  issueDate: string;
}

export default function NationalDatabaseSearch() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState<MedicineRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/national-db?q=${encodeURIComponent(query)}&type=${searchType}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tra cứu CSDL Dược Quốc gia</h2>
            <p className="text-slate-500">Kết nối trực tiếp với hệ thống dữ liệu của Cục Quản lý Dược - Bộ Y Tế</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48 shrink-0">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="name">Tên thuốc</option>
              <option value="regNo">Số đăng ký</option>
              <option value="activeIngredient">Hoạt chất</option>
            </select>
          </div>
          
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchType === 'name' ? 'Nhập tên thuốc (VD: Paracetamol)...' :
                searchType === 'regNo' ? 'Nhập số đăng ký (VD: VD-31580-19)...' :
                'Nhập hoạt chất (VD: Amoxicillin)...'
              }
              className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="h-12 px-8 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tra cứu...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Tra cứu
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Kết quả tìm kiếm</h3>
            <span className="text-sm font-medium text-slate-500">
              Tìm thấy <strong className="text-blue-600">{results.length}</strong> bản ghi
            </span>
          </div>

          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
              <p>Đang kết nối CSDL Quốc gia...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold border-b border-slate-100">Số đăng ký</th>
                    <th className="p-4 font-bold border-b border-slate-100">Tên thuốc / Hoạt chất</th>
                    <th className="p-4 font-bold border-b border-slate-100">Dạng bào chế</th>
                    <th className="p-4 font-bold border-b border-slate-100">Sản xuất</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                          <FileText className="w-3.5 h-3.5" />
                          {item.registrationNo}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 mb-1">{item.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5" />
                          {item.activeIngredient}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-slate-700">{item.dosageForm}</div>
                        <div className="text-xs text-slate-500 mt-1">{item.packaging}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-slate-700 flex items-center gap-1.5 mb-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="line-clamp-1">{item.manufacturer}</span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          {item.country}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 flex flex-col items-center justify-center text-slate-500">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy dữ liệu</p>
              <p className="text-sm">Không có bản ghi nào khớp với thông tin tìm kiếm của bạn.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
