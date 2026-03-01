import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Điều khoản sử dụng</h1>
          <p className="text-slate-500 mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
          
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
            <h2>1. Chấp nhận điều khoản</h2>
            <p>Bằng việc truy cập và sử dụng hệ thống Tra cứu Thuốc BV Thiệu Hóa, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng hệ thống.</p>
            
            <h2>2. Mục đích sử dụng</h2>
            <p>Hệ thống được thiết kế nhằm mục đích tra cứu thông tin dược phẩm, hỗ trợ bác sĩ và dược sĩ trong quá trình kê đơn và cấp phát thuốc. Thông tin trên hệ thống chỉ mang tính chất tham khảo và không thay thế cho quyết định chuyên môn của nhân viên y tế.</p>
            
            <h2>3. Quyền và trách nhiệm của người dùng</h2>
            <ul>
              <li>Người dùng cam kết sử dụng thông tin từ hệ thống vào mục đích hợp pháp và đúng chuyên môn.</li>
              <li>Không được sao chép, phân phối hoặc sử dụng dữ liệu của hệ thống cho mục đích thương mại khi chưa có sự cho phép.</li>
              <li>Bảo mật thông tin tài khoản (nếu có) và chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của mình.</li>
            </ul>

            <h2>4. Giới hạn trách nhiệm</h2>
            <p>Bệnh viện Thiệu Hóa không chịu trách nhiệm pháp lý đối với bất kỳ hậu quả nào phát sinh từ việc sử dụng thông tin trên hệ thống. Quyết định điều trị cuối cùng luôn thuộc về bác sĩ điều trị trực tiếp.</p>

            <h2>5. Thay đổi điều khoản</h2>
            <p>Chúng tôi có quyền sửa đổi, bổ sung các điều khoản này vào bất kỳ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên hệ thống.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
