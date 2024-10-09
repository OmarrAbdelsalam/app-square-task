"use client"
import { Tajawal } from 'next/font/google';
import { cn } from '@/lib/utils';
import "@/app/globals.css";
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Index';

const tajawal = Tajawal({ subsets: ['latin'], weight: '700', display: 'swap', variable: '--font-ta' });



export default function LoginLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={cn(tajawal.variable, 'font-ta bg-white h-screen overflow-hidden')}>
        <main className="h-full">
            
                      <div className="flex h-full">
            <div className="w-[60%] md:flex hidden items-center tajawal-bold bg-red-900 justify-center text-white text-5xl">
              <h1 className="w-[86%] flex items-start leading-[4rem] p-10">
                المنصة الاولي في الشرق الاوسط والوطن العربي
              </h1>
            </div>
            <div className="md:w-[50%] w-full px-2 md:px-10 flex items-center h-full">
              <div className="justify-center items-center sm:w-[90%] w-full m-auto">
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
