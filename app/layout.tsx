import './globals.css';

import { Flame } from 'lucide-react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import WebsiteAuth from '@/components/Auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calories Burn',
  description: 'App to track calories burned',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <div className="flex justify-between border-t-2 p-4">
          <div className="flex gap-1 items-center">
            <Flame className="stroke-red-500" />
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Calories Burn
            </span>
          </div>
          <WebsiteAuth />
        </div>
      </body>
    </html>
  );
}
