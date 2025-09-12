"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components";

import ProfileImage from "@/public/images/png/profile-image.png";
import SiteLogoLeft from "@/public/images/png/site-logo-left.webp";
import SiteLogoLeftGerman from "@/public/images/png/site-logo-left-german.png";
import SiteLogoRight from "@/public/images/png/site-right-logo.webp";

// qo‘llab-quvvatlanadigan tillar
const languages = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ger", name: "Deutsch", flag: "🇩🇪" },
];

// menu itemlari (til bo‘yicha)
const navigationItems: Record<string, { name: string; href: string }[]> = {
  uz: [
    { name: "Bosh sahifa", href: "/" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Yangiliklar", href: "/news" },
    { name: "Kontakt", href: "/contact" },
  ],
  ru: [
    { name: "Домашняя страница", href: "/" },
    { name: "О нас", href: "/about" },
    { name: "Блог", href: "/blog" },
    { name: "Новости", href: "/news" },
    { name: "Контакт", href: "/contact" },
  ],
  en: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ],
  ger: [
    { name: "Startseite", href: "/" },
    { name: "Über uns", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Nachricht", href: "/news" },
    { name: "Kontakt", href: "/contact" },
  ],
};

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<string>("uz"); // default

  const pathname = usePathname();
  const router = useRouter();

  // Hydration errorni oldini olish uchun language ni client tarafda aniqlaymiz
  useEffect(() => {
    const currentLang = pathname.split("/")[1];
    if (languages.some((l) => l.code === currentLang)) {
      setLanguage(currentLang);
    } else {
      setLanguage("uz");
    }
  }, [pathname]);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Image
            src={language === "ger" ? SiteLogoLeftGerman : SiteLogoLeft}
            alt="logo"
            width={150}
            height={60}
            className="w-[150px] h-auto"
          />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems[language]?.map((item) => (
              <Link
                key={item.name}
                href={`/${language}${item.href}`}
                className="text-[18px] font-medium text-gray-700 hover:text-gray-900 transition-colors hover:underline underline-offset-4 decoration-2 decoration-blue-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Language dropdown */}
            <div className="relative">
              <Button
                type="button"
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center gap-2 px-3 py-2 text-[18px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                {languages.find((l) => l.code === language)?.flag}{" "}
                {languages.find((l) => l.code === language)?.name}
              </Button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((l) => (
                    <Button
                      key={l.code}
                      type="button"
                      onClick={() => changeLanguage(l.code)}
                      className="w-full text-left px-4 py-2 text-[16px] text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2">{l.flag}</span>
                      {l.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <Button
                type="button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
              >
                <Image
                  src={ProfileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                />
              </Button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 text-sm">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      john.doe@example.com
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {/* Right logo */}
            <Image
              src={SiteLogoRight}
              alt="logo"
              width={150}
              height={60}
              className="w-[150px] h-auto"
            />
          </div>
        </div>

        {/* Mobile nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            {navigationItems[language]?.map((item) => (
              <Link
                key={item.name}
                href={`/${language}${item.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
