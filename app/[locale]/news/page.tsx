"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/app/components";
import { usePathname, useRouter } from "next/navigation";
import { useGet } from "@/app/hooks";
import { get } from "lodash";
import Link from "next/link";

// ✅ Swiper (carousel) importlari
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  viewsCount: number;
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
}

export default function NewsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pathName = usePathname();
  const language = pathName.split("/")[1] as "uz" | "ru" | "en" | "ger";

  // Kategoriya API dan
  const { data: categoriesData } = useGet({
    queryKey: "news-category",
    path: "/NewsCategory/GetAll",
  });

  // Yangiliklar API dan
  const { data: newsData } = useGet({
    queryKey: "news",
    path: "/News/GetAll",
  });

  // Newslarni tayyorlash
  const news: NewsItem[] = useMemo(() => {
    if (!newsData?.content) return [];
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
      views: n.viewsCount,
    }));
  }, [newsData, language]);

  // Filter news
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

  const readFullArticleText: Record<Lang, string> = {
    uz: "Yangilikni to‘liq o‘qish",
    ru: "Читать полную новость",
    en: "Read Full News",
    ger: "Ganze Nachricht lesen",
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Search + Categories */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 items-center">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Categories Carousel */}
            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                <Button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
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
                      onClick={() => setSelectedCategory(category.id)}
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

        {/* News List */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {newsContent[language].notFound}
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredNews.map((news) => (
                  <article
                    key={news.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-100"
                  >
                    {/* ✅ Swiper Carousel with autoplay + navigation + pagination */}
                    <div className="relative w-full h-56">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                      >
                        {news.images.map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <Image
                              width={600}
                              height={300}
                              src={img}
                              alt={news.title}
                              className="w-full h-56 object-cover"
                              unoptimized
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="p-6">
                      <time className="text-gray-500 text-sm">{news.date}</time>
                      <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                        {news.title}
                      </h2>

                      {/* ✅ Link til bilan */}
                      <Link
                        href={`/${language}/news/${news.id}`}
                        className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition inline-block"
                      >
                        {readFullArticleText[`${language}`]}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
