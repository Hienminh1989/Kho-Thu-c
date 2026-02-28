import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Tra cứu Thuốc Bệnh Viện Thiệu Hóa',
  description: 'Hệ thống quản lý danh mục thuốc nội bộ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#FCFAF7] text-[#1A1A1A] antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
