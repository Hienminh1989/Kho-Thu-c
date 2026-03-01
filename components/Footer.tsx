'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
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

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Bản quyền thuộc về Nguyễn Bá Nam _ Tổ CNTT _ bệnh viện đa khoa Thiệu Hóa.</p>
            {clientIp && <p className="text-slate-500">IP đang truy cập: {clientIp}</p>}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Điều khoản</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Bảo mật</Link>
            <Link href="/license" className="hover:text-white transition-colors">Giấy phép</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
