'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pill, ArrowRight, Search, Layers, Info, X,
  Sparkles, FileText, AlertCircle, CheckCircle2, ArrowUpRight,
  Stethoscope, ShieldCheck, Activity, Loader2, Database, Building2, Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { initialMedicines, initialCategories } from '@/lib/data';
import AIChat from './AIChat';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export default function LandingPage({ onGoToLogin }: LandingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [searchSource, setSearchSource] = useState<'local' | 'national'>('local');
  const [nationalResults, setNationalResults] = useState<any[]>([]);
  const [nationalSuggestions, setNationalSuggestions] = useState<any[]>([]);
  const [isSearchingNational, setIsSearchingNational] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [hasSearchedNational, setHasSearchedNational] = useState(false);
  const [clientIp, setClientIp] = useState<string>('');

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchIp();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchSource === 'national' && searchTerm.trim().length > 1) {
      const delayDebounceFn = setTimeout(async () => {
        setIsFetchingSuggestions(true);
        try {
          const res = await fetch(`/api/national-db?q=${encodeURIComponent(searchTerm)}&type=name`);
          const data = await res.json();
          if (data.success) {
            setNationalSuggestions(data.data.slice(0, 5));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetchingSuggestions(false);
        }
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setNationalSuggestions([]);
    }
  }, [searchTerm, searchSource]);

  const handleRegister = () => {
    alert('Tính năng đăng ký đang được phát triển. Vui lòng quay lại sau!');
  };

  const executeNationalSearch = async (term: string) => {
    setIsSearchingNational(true);
    setHasSearchedNational(true);
    try {
      const res = await fetch(`/api/national-db?q=${encodeURIComponent(term)}&type=name`);
      const data = await res.json();
      if (data.success) {
        setNationalResults(data.data);
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearchingNational(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    if (searchSource === 'national') {
      await executeNationalSearch(searchTerm);
    } else {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredMedicines = initialMedicines.filter(med => {
    if (med.isHeader) return false;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = med.name?.toLowerCase().includes(searchLower) || 
                         med.generic?.toLowerCase().includes(searchLower) ||
                         med.icd_codes?.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory ? med.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Tra cứu Thuốc BV Thiệu Hóa</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Tra cứu', 'Nhóm thuốc', 'Dược điển'].map((item) => (
              <a 
                key={item}
                href={`#${item === 'Tra cứu' ? 'search' : item === 'Nhóm thuốc' ? 'categories' : 'results'}`} 
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onGoToLogin}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              Đăng nhập
            </button>
            <button 
              onClick={handleRegister}
              className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Dùng thử
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="search" className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-100/50 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-8">
                <Activity className="w-4 h-4" />
                Hệ thống chuẩn hóa Y Tế
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Quản lý dược phẩm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Thông minh hơn.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Nền tảng tra cứu và quản lý danh mục thuốc chuẩn xác, tích hợp AI hỗ trợ quyết định lâm sàng cho bác sĩ và dược sĩ.
              </p>

              {/* Search Bar */}
              <div className={`relative max-w-2xl transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row items-center bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-2 gap-2 z-20">
                  <div className="flex items-center w-full sm:w-auto px-3 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0">
                    <Database className="w-4 h-4 text-blue-600 mr-2" />
                    <select 
                      value={searchSource} 
                      onChange={(e) => {
                        setSearchSource(e.target.value as 'local' | 'national');
                        setNationalResults([]);
                        setHasSearchedNational(false);
                      }}
                      className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer w-full py-2"
                    >
                      <option value="local">Kho nội bộ</option>
                      <option value="national">CSDL Quốc gia</option>
                    </select>
                  </div>
                  <div className="flex-1 flex items-center w-full">
                    <div className="pl-3 pr-2">
                      <Search className={`w-5 h-5 transition-colors ${isSearchFocused ? 'text-blue-600' : 'text-slate-400'}`} />
                    </div>
                    <input 
                      type="text"
                      placeholder={searchSource === 'local' ? "Tìm tên thuốc, hoạt chất..." : "Tra cứu CSDL Dược Quốc gia..."}
                      className="flex-1 py-3 bg-transparent text-base font-medium outline-none placeholder:text-slate-400 w-full"
                      value={searchTerm}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedCategory(null);
                        if (searchSource === 'national') setHasSearchedNational(false);
                      }}
                    />
                  </div>
                  <button type="submit" disabled={isSearchingNational} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSearchingNational ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    <span className="sm:hidden font-bold">Tìm kiếm</span>
                  </button>
                </form>

                {/* Search Suggestions */}
                <AnimatePresence>
                  {isSearchFocused && searchTerm.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="max-h-[350px] overflow-y-auto p-2">
                        {searchSource === 'local' ? (
                          <>
                            {filteredMedicines.slice(0, 5).map((med) => (
                              <div
                                key={med.id}
                                onClick={() => {
                                  setSelectedMedicine(med);
                                  setIsSearchFocused(false);
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                              >
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                  <Pill className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="text-slate-900 font-bold">{med.name}</h4>
                                  <p className="text-slate-500 text-xs">{med.generic}</p>
                                </div>
                              </div>
                            ))}
                            {filteredMedicines.length === 0 && (
                              <div className="p-6 text-center text-slate-500 text-sm">
                                Không tìm thấy kết quả phù hợp
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {isFetchingSuggestions ? (
                              <div className="p-6 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                Đang tìm kiếm trên CSDL Quốc gia...
                              </div>
                            ) : nationalSuggestions.length > 0 ? (
                              nationalSuggestions.map((med) => (
                                <div
                                  key={med.id}
                                  onClick={() => {
                                    setSearchTerm(med.name);
                                    setIsSearchFocused(false);
                                    executeNationalSearch(med.name);
                                  }}
                                  className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                                >
                                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                    <Database className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-slate-900 font-bold">{med.name}</h4>
                                    <p className="text-slate-500 text-xs">{med.activeIngredient} • {med.registrationNo}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-6 text-center text-slate-500 text-sm">
                                Không tìm thấy kết quả trên CSDL Quốc gia
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-10 animate-pulse" />
                <Image 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Medical Professional" 
                  fill 
                  className="object-cover rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Sparkles className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">AI Assistant</p>
                      <p className="text-xs text-slate-500">Phân tích tương tác thuốc</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hệ thống tự động cảnh báo tương tác thuốc bất lợi dựa trên đơn thuốc hiện tại.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Nhóm thuốc chuyên khoa</h2>
              <p className="text-slate-600 max-w-2xl">Phân loại chi tiết theo hệ thống y tế, giúp tra cứu nhanh chóng và chính xác.</p>
            </div>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm('');
              }}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  setSelectedCategory(cat.name === selectedCategory ? null : cat.name);
                  setSearchTerm('');
                  document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group cursor-pointer p-8 rounded-3xl border transition-all duration-300 ${
                  selectedCategory === cat.name 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-lg hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedCategory === cat.name ? 'bg-white/20' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <Layers className="w-7 h-7" />
                  </div>
                  <ArrowUpRight className={`w-5 h-5 ${selectedCategory === cat.name ? 'text-white/50' : 'text-slate-400 group-hover:text-blue-600'}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{cat.name}</h3>
                <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${
                  selectedCategory === cat.name ? 'text-blue-100' : 'text-slate-600'
                }`}>
                  {cat.description}
                </p>

                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedCategory === cat.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {initialMedicines.filter(m => m.category === cat.name && !m.isHeader).length} sản phẩm
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                {searchSource === 'national' 
                  ? 'Kết quả từ CSDL Quốc gia' 
                  : selectedCategory 
                    ? `Nhóm: ${selectedCategory}` 
                    : searchTerm 
                      ? `Kết quả cho "${searchTerm}"` 
                      : 'Tất cả sản phẩm'}
              </h2>
              <p className="text-slate-600">
                {searchSource === 'national' 
                  ? (hasSearchedNational ? `Tìm thấy ${nationalResults.length} kết quả trên hệ thống quốc gia.` : 'Nhập từ khóa và nhấn Tìm kiếm để tra cứu.')
                  : `Tìm thấy ${filteredMedicines.length} kết quả phù hợp trong kho nội bộ.`}
              </p>
            </div>
            
            {/* Contextual Search */}
            {searchSource === 'local' && (
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Lọc kết quả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {searchSource === 'national' ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {isSearchingNational ? (
                <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
                  <p>Đang kết nối CSDL Quốc gia...</p>
                </div>
              ) : hasSearchedNational && nationalResults.length > 0 ? (
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
                      {nationalResults.map((item) => (
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
              ) : hasSearchedNational ? (
                <div className="p-20 flex flex-col items-center justify-center text-slate-500">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Database className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy dữ liệu</p>
                  <p className="text-sm">Không có bản ghi nào khớp với thông tin tìm kiếm trên CSDL Quốc gia.</p>
                </div>
              ) : (
                <div className="p-20 flex flex-col items-center justify-center text-slate-500">
                  <Database className="w-12 h-12 text-slate-200 mb-4" />
                  <p>Nhập từ khóa và nhấn Tìm kiếm để tra cứu CSDL Quốc gia.</p>
                </div>
              )}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med, idx) => (
                  <motion.div 
                    key={med.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedMedicine(med)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col group"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                      {med.images?.[0] ? (
                        <Image 
                          src={med.images[0]} 
                          alt={med.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Pill className="w-10 h-10 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-bold text-slate-700 rounded-lg shadow-sm">
                          {med.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{med.name}</h4>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-1">{med.generic}</p>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                        {med.indications}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Sẵn có</span>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Chi tiết <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy kết quả</h4>
                  <p className="text-slate-500 mb-6">Vui lòng thử lại với từ khóa khác.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
          )}
        </div>
      </section>

      {/* Medicine Detail Modal */}
      <AnimatePresence>
        {selectedMedicine && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                    <Pill className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{selectedMedicine.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{selectedMedicine.generic}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMedicine(null)}
                  className="p-2 bg-white rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    {selectedMedicine.images?.[0] ? (
                      <Image src={selectedMedicine.images[0]} alt={selectedMedicine.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Pill className="w-16 h-16 text-slate-300" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nhóm thuốc</p>
                        <p className="text-sm font-bold text-blue-600">{selectedMedicine.category}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Mã ICD gợi ý</p>
                        <p className="text-sm font-bold text-slate-900">{selectedMedicine.icd_codes || 'N/A'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-blue-600 mb-3">
                        <CheckCircle2 className="w-5 h-5" />
                        <h4 className="font-bold">Liều lượng - Cách dùng</h4>
                      </div>
                      <div className="text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-5 rounded-2xl border border-blue-100 whitespace-pre-line">
                        {selectedMedicine.dosage || 'Đang cập nhật...'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 mb-3">
                      <Info className="w-5 h-5 text-blue-500" />
                      <h4 className="font-bold">Chỉ định</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedMedicine.indications || 'Đang cập nhật...'}
                    </p>
                  </div>

                  <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-2 text-red-600 mb-3">
                      <AlertCircle className="w-5 h-5" />
                      <h4 className="font-bold">Chống chỉ định</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedMedicine.contraindications || 'Đang cập nhật...'}
                    </p>
                  </div>
                </div>

                {selectedMedicine.notes && (
                  <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-600 mb-3">
                      <FileText className="w-5 h-5" />
                      <h4 className="font-bold">Chú ý đặc biệt</h4>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedMedicine.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Chat Integration */}
      <AIChat />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-white">Tra cứu Thuốc BV Thiệu Hóa</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Nền tảng quản lý dược phẩm hiện đại, đồng hành cùng bác sĩ và dược sĩ trong việc cung cấp thông tin y tế chính xác, an toàn.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Liên kết</h4>
              <ul className="space-y-3 text-sm">
                {['Tra cứu', 'Nhóm thuốc', 'Dược điển', 'BHYT'].map(item => (
                  <li key={item}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Pháp lý</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Điều khoản', href: '/terms' },
                  { name: 'Bảo mật', href: '/privacy' },
                  { name: 'Giấy phép', href: '/license' },
                  { name: 'Liên hệ', href: '/contact' }
                ].map(item => (
                  <li key={item.name}><Link href={item.href} className="hover:text-blue-400 transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p>© {new Date().getFullYear()} Bản quyền thuộc về Nguyễn Bá Nam _ Tổ CNTT _ bệnh viện đa khoa Thiệu Hóa.</p>
              {clientIp && <p className="text-slate-500">IP đang truy cập: {clientIp}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Hệ thống hoạt động bình thường</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
