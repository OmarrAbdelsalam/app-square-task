"use client";
import { Globe } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Link, useRouter } from "@/i18n/routing";

const translations = {
  ar: { language: 'English', shortLanguage: 'EN' },
  en: { language: 'العربية', shortLanguage: 'AR' },
};

const Header = () => {
  const t = useTranslations('Header'); 
  const locale = useLocale(); 
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState(locale === 'ar' || locale === 'en' ? locale : 'en'); // Initialize language state

  const onLocaleChange = (nextLocale) => {
    // Get the current pathname without the locale prefix (e.g., remove /en or /ar)
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(en|ar)/, '');

    // Replace the current locale with the new one
    startTransition(() => {
      router.replace(`/${nextLocale}${newPath}`);
    });

    // Update language state
    setLanguage(nextLocale);
  };

  const toggleLanguage = () => {
    // Toggle between 'en' and 'ar'
    const nextLocale = language === 'en' ? 'ar' : 'en';
    onLocaleChange(nextLocale);
  };

  return (
    <div className="flex justify-between mx-5  md:mx-20 lg:mx-40 py-5">
      <h1 className="text-[44px] fonts2-bold">الدكتور</h1>

      <nav className="hidden lg:flex justify-center relative mr-10 items-center gap-8">
        <ul className="flex gap-10 text-gray-700 items-center transition-all duration-300 tajawal-medium text-[18px]">
          <li><Link href="/" className="hover:text-main border-b-2 border-main py-2">{t('home')}</Link></li>
          <li><Link href="/pricing" className="hover:text-main">{t('pricing')}</Link></li>
          <li><Link href="/templates" className="hover:text-main">{t('templates')}</Link></li>
          <li><Link href="/about-us" className="hover:text-main">{t('aboutUs')}</Link></li>
          <li><Link href="/how-to-use" className="hover:text-main">{t('howToUse')}</Link></li>
        </ul>
      </nav>

      <div className="flex items-center gap-5 justify-center">
        {/* Language Toggle Button */}
        <button onClick={toggleLanguage} className="tajawal-regular flex items-center gap-1 text-[17px] text-gray-500">
          {translations[language] && (
            <>
              <span className="text-black hidden md:block">{translations[language].language}</span>
              <span className="text-black rounded-full md:hidden text-sm">{translations[language].shortLanguage}</span>
            </>
          )}
          <Globe size={20} />
        </button>

        <Link href="/login" className="tajawal-regular px-5 py-3 text-white bg-main/80 rounded-full">
            {t('login')}
        </Link>
      </div>
    </div>
  );
};

export default Header;
