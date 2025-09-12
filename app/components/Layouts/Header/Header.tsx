"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import ProfileImage from "@/public/images/png/profile-image.png";
import SiteLogoLeft from "@/public/images/png/site-logo-left.webp";
import SiteLogoLeftGerman from "@/public/images/png/site-logo-left-german.png";
import SiteLogoRight from "@/public/images/png/site-right-logo.webp";
import { storage } from "@/app/services";

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

  // ✅ Auth holati (localStorage bilan)

  const pathname = usePathname();
  const router = useRouter();

  // localStorage orqali auth holatini saqlab qolamiz

  const login = () => {
    router.push(`${language}/login`);
    // setIsAuthenticated(true);
  };

  const logout = () => {
    storage.remove("isAuthenticated");
    setIsProfileDropdownOpen(false);
  };

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

          {/* Desktop Navigation */}
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

          {/* Right side (desktop) */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-5">
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

            {/* Right logo */}
            <Image
              src={SiteLogoRight}
              alt="logo"
              width={150}
              height={60}
              className="w-[150px] h-auto"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-slideDown">
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

            {/* Language select mobile */}
            <div className="px-4 pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Tilni tanlang:</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <Button
                    key={l.code}
                    type="button"
                    onClick={() => changeLanguage(l.code)}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 ${
                      language === l.code
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{l.flag}</span> {l.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
