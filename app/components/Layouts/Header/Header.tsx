"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components";
import ProfileImage from "@/public/images/png/profile-image.png";
import SiteLogoLeft from "@/public/images/png/site-logo-left.webp";
import SitLogoRight from "@/public/images/png/site-right-logo.webp";

const languages = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ger", name: "Deutsch", flag: "🇩🇪" },
];

const navigationItems = [
  { name: "Bosh sahifa", href: "/" },
  { name: "Biz haqimizda", href: "/about" },
  { name: "Yangiliklar", href: "/news" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakt", href: "/contact" },
];

const blogDropdownItems = [
  { name: "Barcha Postlar", href: "/blog" },
  { name: "Texnologiya", href: "/blog/technology" },
  { name: "Biznes", href: "/blog/business" },
  { name: "Dizayn", href: "/blog/design" },
  { name: "Rivojlantirish", href: "/blog/development" },
];

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const language = pathname.split("/")[1];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang; // faqat til qismini o‘zgartiramiz
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Chap logo */}
          <Image
            unoptimized
            src={SiteLogoLeft}
            alt="logo"
            height={60}
            width={150}
          />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) =>
              item.name === "Blog" ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-[18px] font-medium text-gray-700 hover:text-gray-900 transition-colors hover:underline underline-offset-4 decoration-2 decoration-blue-500 flex items-center gap-1"
                  >
                    {item.name}
                    <svg
                      className="h-3 w-3 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>

                  {/* Blog dropdown */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                    <div className="w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2">
                      {blogDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-[18px] text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[18px] font-medium text-gray-700 hover:text-gray-900 transition-colors hover:underline underline-offset-4 decoration-2 decoration-blue-500"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <Button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>

            {/* Language dropdown */}
            <div className="relative">
              <Button
                type="button"
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-[18px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                🌐 {language}
              </Button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <Button
                      type="button"
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className="w-full text-left px-3 sm:px-4 py-2 text-[16px] text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2">{language.flag}</span>
                      <span className="text-[16px]">{language.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile / Auth */}
            {isLoggedIn ? (
              <div className="relative">
                <Button
                  type="button"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
                >
                  <Image
                    width={32}
                    height={32}
                    alt="Profile"
                    unoptimized
                    src={ProfileImage}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                  />
                </Button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-3 sm:px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900 text-sm">
                        John Doe
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        john.doe@example.com
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Button
                  type="button"
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Button>

                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Right logo */}
            <Image
              unoptimized
              src={SitLogoRight}
              alt="logo"
              height={60}
              width={150}
            />
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
