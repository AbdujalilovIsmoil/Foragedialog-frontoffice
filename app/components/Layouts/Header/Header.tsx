"use client";

import Image from "next/image";
import { useState } from "react";
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
  { name: "News", href: "/news" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const blogDropdownItems = [
  { name: "All Posts", href: "/blog" },
  { name: "Technology", href: "/blog/technology" },
  { name: "Business", href: "/blog/business" },
  { name: "Design", href: "/blog/design" },
  { name: "Development", href: "/blog/development" },
];

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[2]); // Default to English
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Logo */}
          <div className="flex items-center">
            <Image src={SiteLogoLeft.src} alt="logo" height={60} width={150} />
          </div>

          {/* Navigation Menu - Hidden on mobile */}
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

          {/* Right Side - Language Selector, Profile, Right Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
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
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
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
                <span className="hidden sm:inline text-[16px]">
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
                <span className="sm:hidden text-[16px]">
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
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 sm:px-4 py-2 text-[16px] text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2">{language.flag}</span>
                      <span className="text-[16px]">
                        {language.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn ? (
              /* Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
                >
                  <Image
                    width={32}
                    height={32}
                    alt="Profile"
                    src={ProfileImage}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />

                  <div className="hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-xs sm:text-sm">
                    JD
                  </div>
                </button>

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

                    <button className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
                    </button>

                    <button className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </button>

                    <button className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Others
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth icon when logged out */
              <div className="relative">
                <button
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
                </button>

                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Right Logo */}
            <div className="flex items-center">
              <Image src={SitLogoRight} alt="logo" height={60} width={150} />
            </div>
          </div>
        </div>

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

      {(isLanguageDropdownOpen ||
        isProfileDropdownOpen ||
        isMobileMenuOpen ||
        isAuthDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLanguageDropdownOpen(false);
            setIsProfileDropdownOpen(false);
            setIsMobileMenuOpen(false);
            setIsAuthDropdownOpen(false);
          }}
        />
      )}
    </header>
  );
}
