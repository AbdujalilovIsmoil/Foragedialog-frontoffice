"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/app/components";
import { usePathname } from "next/navigation";
import { useGet } from "@/app/hooks";
import { get } from "lodash";
import { ArrowRightIcon, CalendarIcon, EyeIcon } from "lucide-react";

// ✅ Swiper (carousel)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface Category {
  id: number;
  categoryName: {
    uz: string;
    ru: string;
    en: string;
    ger: string;
  };
}

interface NewsApiItem {
  id: number;
  subject: Record<"uz" | "ru" | "en" | "ger", string>;
  title: Record<"uz" | "ru" | "en" | "ger", string>;
  text: Record<"uz" | "ru" | "en" | "ger", string>;
  categories: Record<"uz" | "ru" | "en" | "ger", string>[];
  tags: Record<"uz" | "ru" | "en" | "ger", string>[];
  images: string[];
  readingTime: string;
  publishedDate: string;
  viewsCount: number | string;
}

interface NewsItem {
  id: number;
  title: string;
  subject: string;
  text: string;
  categories: string[];
  tags: string[];
  images: string[];
  readingTime: string;
  date: string;
  views: number;
  publishedDate: string;
  viewsCount: string | number;
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ✅ Har sahifada nechta yangilik chiqadi

  const pathName = usePathname();
  const language = pathName.split("/")[1] as "uz" | "ru" | "en" | "ger";

  // ✅ Kategoriya API
  const { data: categoriesData } = useGet({
    queryKey: "news-category",
    path: "/NewsCategory/GetAll",
  });

  // ✅ Yangiliklar API
  const { data: newsData } = useGet({
    queryKey: "news",
    path: "/News/GetAll",
  });

  // ✅ Newslarni tayyorlash
  const news: NewsItem[] = useMemo(() => {
    if (!newsData?.content) return [];
    console.log("newsdata", newsData.content);

    return newsData.content.map((n: NewsApiItem) => ({
      id: n.id,
      title: n.title[language] || n.title["uz"],
      subject: n.subject[language] || "",
      text: n.text[language] || "",
      categories: n.categories.map((c) => c[language]),
      tags: n.tags.map((t) => t[language]),
      images: n.images.map(
        (imgId) =>
          `https://back.foragedialog.uz/File/DownloadFile/download/${imgId}`
      ),
      readingTime: n.readingTime ? `${n.readingTime} min` : "—",
      date: new Date(n.publishedDate).toLocaleDateString(language, {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }),
      viewsCount: n.viewsCount,
    }));
  }, [newsData, language]);

  // ✅ Filter
  const filteredNews = useMemo(() => {
    return news.filter((n: NewsItem) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.text.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === null ||
        n.categories.includes(
          (get(categoriesData, "content", []) as Category[]).find(
            (c) => c.id === selectedCategory
          )?.categoryName[language] ?? ""
        );

      return matchesSearch && matchesCategory;
    });
  }, [news, searchTerm, selectedCategory, categoriesData, language]);

  // ✅ Pagination hisoblash
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const inputPlaceholder = {
    en: "Search news",
    ru: "Поиск новостей",
    ger: "Nachrichten suchen",
    uz: "Yangiliklarni qidirish",
  };

  const newsContent = {
    uz: {
      all: "Hammasi",
      notFound: "Bu categoriyaga oid yangiliklar mavjud emas",
    },
    ru: {
      all: "Все",
      notFound: "Новостей по этой категории нет",
    },
    en: {
      all: "All",
      notFound: "No news available for this category",
    },
    ger: {
      all: "Alle",
      notFound: "Keine Nachrichten für diese Kategorie verfügbar",
    },
  };

  type Lang = "uz" | "ru" | "en" | "ger";

  const renderTagLabel = (tag: any, lang: Lang) => {
    if (tag == null) return "";
    if (typeof tag === "string" || typeof tag === "number") return String(tag);
    if (typeof tag === "object") {
      return (
        tag[lang] ||
        tag["uz"] ||
        Object.values(tag as Record<string, string>)[0] ||
        ""
      );
    }
    return String(tag);
  };

  const formatDate = (dateString: string) => {
    try {
      const locale =
        language === "uz"
          ? "uz-UZ"
          : language === "ru"
          ? "ru-RU"
          : language === "ger"
          ? "de-DE"
          : "en-US";

      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const getLocalized = (
    field: string | Partial<Record<Lang, string>>,
    lang: Lang
  ) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return (
      (field as Partial<Record<Lang, string>>)[lang] ||
      (field as Partial<Record<Lang, string>>)["uz"] ||
      Object.values(field as Record<string, string>)[0] ||
      ""
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Search + Categories */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 items-center">
            {/* Search */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // ✅ qidirganda 1-sahifaga qaytadi
                }}
                placeholder={inputPlaceholder[language]}
                className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Categories */}
            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === null
                      ? "bg-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600 border border-gray-200"
                  }`}
                >
                  {newsContent[language].all}
                </Button>
                {(get(categoriesData, "content", []) as Category[]).map(
                  (category) => (
                    <Button
                      type="button"
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === category.id
                          ? "bg-teal-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600 border border-gray-200"
                      }`}
                    >
                      {category.categoryName[language]}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* News */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedNews.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {newsContent[language].notFound}
                </h3>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {paginatedNews.map((news) => {
                    const title = getLocalized(news.title, language);
                    const img =
                      news.images && news.images.length > 0
                        ? news.images[0]
                        : "";

                    console.log("news component", news.date);

                    return (
                      <article className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
                        {/* Image container */}
                        <div className="aspect-video bg-gray-100 overflow-hidden">
                          {img ? (
                            <Image
                              src={img}
                              alt={title || "news image"}
                              width={900}
                              height={500}
                              unoptimized
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l4-4m0 0h10l4 4M7 3v4m10-4v4"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6 gap-4">
                          {/* Title */}
                          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                            {title || "Untitled"}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {Array.isArray(news.tags) &&
                              news.tags.slice(0, 3).map((tag, i) => {
                                const label = renderTagLabel(tag, language);
                                if (!label) return null;
                                return (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-teal-50 text-teal-700 rounded-full"
                                  >
                                    {label}
                                  </span>
                                );
                              })}
                            {Array.isArray(news.tags) &&
                              news.tags.length > 3 && (
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                  +{news.tags.length - 3}
                                </span>
                              )}
                          </div>

                          {/* Read more link */}
                          <div className="mt-auto flex justify-end">
                            <Link
                              href={`/${language}/news/${news.id}`}
                              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                            >
                              {language === "uz"
                                ? "Batafsil o‘qish"
                                : language === "ru"
                                ? "Подробнее"
                                : language === "ger"
                                ? "Mehr lesen"
                                : "Read more"}
                              <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                          </div>

                          {/* Date & Views */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 mt-2">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(news.date)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <EyeIcon className="w-4 h-4" />
                              <span>
                                {Number(news.viewsCount).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* ✅ Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
                    {/* Previous */}
                    <Button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                      {language === "uz"
                        ? "Oldingi"
                        : language === "ru"
                        ? "Предыдущая"
                        : language === "ger"
                        ? "Zurück"
                        : "Previous"}
                    </Button>

                    {/* Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    )}

                    {/* Next */}
                    <Button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                      {language === "uz"
                        ? "Keyingi"
                        : language === "ru"
                        ? "Следующая"
                        : language === "ger"
                        ? "Weiter"
                        : "Next"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
