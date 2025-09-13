"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const language = pathname.split("/")[1] as "uz" | "ru" | "en" | "ger";

  const pages = [
    {
      name: { uz: "Bosh sahifa", ru: "Главная", en: "Home", ger: "Startseite" },
      href: "/",
    },
    {
      name: {
        uz: "Biz haqimizda",
        ru: "О нас",
        en: "About Us",
        ger: "Über uns",
      },
      href: "/about",
    },
    {
      name: { uz: "Blog", ru: "Блог", en: "Blog", ger: "Blog" },
      href: "/blog",
    },
    {
      name: {
        uz: "Yangiliklar",
        ru: "Новости",
        en: "News",
        ger: "Nachrichten",
      },
      href: "/news",
    },
    {
      name: {
        uz: "Resurslar",
        ru: "Ресурсы",
        en: "Resources",
        ger: "Ressourcen",
      },
      href: "/resources",
    },
    {
      name: { uz: "Kontakt", ru: "Контакт", en: "Contact", ger: "Kontakt" },
      href: "/contact",
    },
  ];

  const translations = {
    projectTitle: {
      uz: "Bizning loyiha",
      ru: "Наш проект",
      en: "Our Project",
      ger: "Unser Projekt",
    },
    projectDesc: {
      uz: "Bizning loyiha barqarorlik va innovatsiyaga asoslangan bo‘lib, iqlimga chidamli qishloq xo‘jaligini rivojlantirishni maqsad qiladi.",
      ru: "Наш проект основан на устойчивости и инновациях и направлен на развитие климатически устойчивого сельского хозяйства.",
      en: "Our project is built on sustainability and innovation, aiming to develop climate-resilient agriculture.",
      ger: "Unser Projekt basiert auf Nachhaltigkeit und Innovation und hat das Ziel, klimaresistente Landwirtschaft zu fördern.",
    },
    linksTitle: {
      uz: "Bizning havolalar",
      ru: "Наши ссылки",
      en: "Our Links",
      ger: "Unsere Links",
    },
    socialsTitle: {
      uz: "Bizning ijtimoiy tarmoqlarimiz",
      ru: "Наши социальные сети",
      en: "Our Social Networks",
      ger: "Unsere sozialen Netzwerke",
    },
  };

  const socialMedia = [
    {
      name: "Telegram",
      href: "https://t.me/foragedialogproject",
      icon: (
        <svg
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <circle
            cx="120"
            cy="120"
            r="120"
            fill="currentColor"
            opacity="0.06"
          />
          <path
            d="M45.6 120.7l149.2-57.6c4.2-1.6 8.6 1.4 7.6 5.8l-24.8 116.6c-1 4.6-6.2 6.8-10.1 4.3L131.3 186.8l-20.6 20.9c-3.8 3.8-9.8 2.1-11.6-2.9L73.2 145.5 45.6 120.7z"
            fill="currentColor"
          />
          <path
            d="M75.6 131.8l84.6-49.6c2.6-1.5 5.9.4 5.1 3.3l-20.2 73.9c-.6 2.3-3.2 3.7-5.3 2.6L104.1 153.4c-2.7-1.4-6.1-1.2-8.6.6l-17.9 13.3c-1.7 1.3-4.2.7-5.2-1.1l-6.9-13.3c-1.2-2.3.6-4.9 3.9-5.0z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/foragedialog-uzbekistan",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554V14.87c0-1.332-.027-3.048-1.86-3.048-1.862 0-2.147 1.45-2.147 2.948v5.682H9.333V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.369-1.85 3.6 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM6.756 20.452H3.916V9h2.84v11.452z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@foragedialog",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a2.974 2.974 0 00-2.094-2.106C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.404.58A2.974 2.974 0 00.502 6.186 31.23 31.23 0 000 12a31.23 31.23 0 00.502 5.814 2.974 2.974 0 002.094 2.106C4.5 20.5 12 20.5 12 20.5s7.5 0 9.404-.58a2.974 2.974 0 002.094-2.106A31.23 31.23 0 0024 12a31.23 31.23 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-black text-center lg:text-left">
                {translations.linksTitle[language]}
              </h3>
              <nav className="space-y-3">
                {pages.map((page) => {
                  const isActive =
                    pathname ===
                    `/${language}${page.href === "/" ? "" : page.href}`;
                  return (
                    <Link
                      key={page.href}
                      href={`/${language}${page.href === "/" ? "" : page.href}`}
                      className={`block text-center lg:text-left transition-all duration-300 group ${
                        isActive
                          ? "text-black font-bold"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      <span className="flex items-center justify-center lg:justify-start">
                        {isActive && (
                          <span className="w-2 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 mr-3"></span>
                        )}
                        {page.name[language]}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-black text-center lg:text-left">
                {translations.socialsTitle[language]}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="group flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                    title={social.name}
                  >
                    <div className="text-gray-600 group-hover:text-black transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="py-6 text-center">
            <p className="text-gray-600 text-sm">&copy; Foragedialog 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
