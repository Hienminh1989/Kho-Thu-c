import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Chính sách bảo mật</h1>
          <p className="text-slate-500 mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
          
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
            <h2>1. Thu thập thông tin</h2>
            <p>Chúng tôi thu thập các thông tin cơ bản khi bạn sử dụng hệ thống, bao gồm:</p>
            <ul>
              <li>Lịch sử tra cứu thuốc và tương tác thuốc.</li>
              <li>Thông tin tài khoản (nếu bạn đăng nhập vào hệ thống quản trị).</li>
              <li>Dữ liệu kỹ thuật như địa chỉ IP, loại trình duyệt, thời gian truy cập để cải thiện hiệu suất hệ thống.</li>
            </ul>
            
            <h2>2. Sử dụng thông tin</h2>
            <p>Thông tin thu thập được sử dụng cho các mục đích:</p>
            <ul>
              <li>Cung cấp và duy trì các tính năng của hệ thống.</li>
              <li>Cải thiện độ chính xác của kết quả tìm kiếm và gợi ý AI.</li>
              <li>Phân tích thống kê để tối ưu hóa trải nghiệm người dùng.</li>
              <li>Bảo vệ hệ thống khỏi các hành vi truy cập trái phép.</li>
            </ul>

            <h2>3. Chia sẻ thông tin</h2>
            <p>Chúng tôi cam kết không bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được chia sẻ trong các trường hợp:</p>
            <ul>
              <li>Có yêu cầu từ cơ quan pháp luật có thẩm quyền.</li>
              <li>Để bảo vệ quyền lợi hợp pháp của Bệnh viện Thiệu Hóa.</li>
            </ul>

            <h2>4. Bảo mật dữ liệu</h2>
            <p>Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu của bạn khỏi việc truy cập, thay đổi, tiết lộ hoặc phá hủy trái phép. Mọi kết nối đến hệ thống đều được mã hóa qua giao thức HTTPS.</p>

            <h2>5. Quyền của người dùng</h2>
            <p>Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình khỏi hệ thống. Vui lòng liên hệ với ban quản trị để được hỗ trợ.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
