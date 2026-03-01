import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function LicensePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-900">BV Thiệu Hóa</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Thông tin Giấy phép</h1>
          <p className="text-slate-500 mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
          
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
            <h2>1. Bản quyền phần mềm</h2>
            <p>Hệ thống Tra cứu Thuốc BV Thiệu Hóa là tài sản trí tuệ thuộc quyền sở hữu của Bệnh viện Đa khoa Huyện Thiệu Hóa. Mọi hành vi sao chép, dịch ngược mã nguồn, hoặc sử dụng trái phép đều bị nghiêm cấm.</p>
            
            <h2>2. Nguồn dữ liệu</h2>
            <p>Dữ liệu dược phẩm trên hệ thống được tổng hợp từ các nguồn chính thống:</p>
            <ul>
              <li>Dược thư Quốc gia Việt Nam.</li>
              <li>Cơ sở dữ liệu Dược Quốc gia (Cục Quản lý Dược - Bộ Y tế).</li>
              <li>Danh mục thuốc nội bộ của Bệnh viện Thiệu Hóa.</li>
            </ul>
            <p>Bản quyền của các dữ liệu này thuộc về các cơ quan ban hành tương ứng.</p>

            <h2>3. Giấy phép mã nguồn mở</h2>
            <p>Hệ thống có sử dụng một số thư viện mã nguồn mở. Dưới đây là danh sách các giấy phép chính:</p>
            <ul>
              <li><strong>React & Next.js:</strong> MIT License</li>
              <li><strong>Tailwind CSS:</strong> MIT License</li>
              <li><strong>Lucide Icons:</strong> ISC License</li>
              <li><strong>Prisma ORM:</strong> Apache License 2.0</li>
            </ul>

            <h2>4. Miễn trừ trách nhiệm y tế</h2>
            <p>Phần mềm được cung cấp &quot;nguyên trạng&quot; (as is) nhằm mục đích hỗ trợ tra cứu. Chúng tôi không cấp phép cho việc sử dụng phần mềm này như một thiết bị y tế chẩn đoán độc lập. Người sử dụng (bác sĩ, dược sĩ) phải chịu trách nhiệm hoàn toàn về các quyết định chuyên môn của mình.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
