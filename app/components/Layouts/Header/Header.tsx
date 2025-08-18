"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/app/components";
import ProfileImage from "@/public/images/png/profile-image.png";
import SiteLogoLeft from "@/public/images/png/site-logo-left.webp";
import SitLogoRight from "@/public/images/png/site-right-logo.webp";
import Link from "next/link";

const languages = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[2]); // Default to English
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Image src={SiteLogoLeft.src} alt="logo" height={60} width={150} />

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[18px] font-medium text-gray-700 hover:text-gray-900 transition-colors hover:underline underline-offset-4 decoration-2 decoration-blue-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
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

            <div className="relative">
              <Button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0a9 9 0 919-9 9 9 0 01-9 9m0 0a9 9 0 01-9-9 9 9 0 019 9z"
                  />
                </svg>
                <span className="hidden sm:inline text-[18px]">
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
                <span className="sm:hidden text-[18px]">
                  {selectedLanguage.flag}
                </span>
                <svg
                  className="h-3 w-3"
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
              </Button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2 text-[18px]">{language.flag}</span>
                      <span className="text-[18px]">{language.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center rounded-full hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
              >
                <Image
                  width={40}
                  height={40}
                  alt="Profile"
                  src={ProfileImage}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-xs sm:text-sm">
                  JD
                </div>
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

                  <Link
                    href="/profile"
                    className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <svg
                      className="mr-3 h-4 w-4"
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
                    My Profile
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Button className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <svg
                        className="mr-3 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Image src={SitLogoRight} alt="logo" height={60} width={150} />
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "min-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-4 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
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
