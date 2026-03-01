'use client';

import React from 'react';
import { ShieldCheck, ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-slate-500 mb-12">Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ về hệ thống tra cứu thuốc, vui lòng liên hệ với chúng tôi qua các kênh dưới đây.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Địa chỉ</h3>
                  <p className="text-slate-600 leading-relaxed">Tiểu khu 2, Thị trấn Thiệu Hóa<br/>Huyện Thiệu Hóa, Tỉnh Thanh Hóa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Điện thoại hỗ trợ</h3>
                  <p className="text-slate-600">0237 3829 015 (Hành chính)</p>
                  <p className="text-slate-600">0912 345 678 (Hỗ trợ kỹ thuật IT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">bvthieuhoa@thanhhoa.gov.vn</p>
                  <p className="text-slate-600">it.bvthieuhoa@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Giờ làm việc (Hỗ trợ IT)</h3>
                  <p className="text-slate-600">Thứ 2 - Thứ 6: 07:00 - 17:00</p>
                  <p className="text-slate-600">Thứ 7, CN: Nghỉ</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Gửi tin nhắn cho chúng tôi</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Tính năng gửi tin nhắn đang được phát triển.'); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                  <input type="text" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Nguyễn Văn A" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email hoặc Số điện thoại</label>
                  <input type="text" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="email@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                  <textarea rows={4} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="Nhập nội dung cần hỗ trợ..." required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
