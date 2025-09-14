"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/app/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGet } from "@/app/hooks";
import { get } from "lodash";
import Link from "next/link";

// ✅ Swiper importlari
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
  publisherId: number;
}

interface Publisher {
  id: number;
  name: string;
  imageId: string;
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
  publisher?: Publisher;
}

export default function NewsPage() {
  const pathName = usePathname();
  const language = pathName.split("/")[1] as "uz" | "ru" | "en" | "ger";

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ URL dan initial qiymatlar
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : null;
  const initialSort =
    (searchParams.get("sort") as "newest" | "oldest") || "newest";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    initialCategory
  );
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 5; // ✅ Har bir sahifada nechta yangilik chiqishi

  // ✅ Publisherlar state (yuqoriga ko‘chirdik)
  const [publishers, setPublishers] = useState<Record<number, Publisher>>({});

  // ✅ URL params update qiluvchi funksiya
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  // Kategoriya API
  const { data: categoriesData } = useGet({
    queryKey: "news-category",
    path: "/NewsCategory/GetAll",
  });

  // Yangiliklar API
  const { data: newsData } = useGet({
    queryKey: "blog",
    path: "/Blog/GetAll",
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
      publishedDate: n.publishedDate,
      publisher: publishers[n.publisherId], // ✅ endi error chiqmaydi
    }));
  }, [newsData, language, publishers]);

  // Filter + Sort
  const filteredNews = useMemo(() => {
    let result = news.filter((n: NewsItem) => {
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

    // ✅ Sort by newest / oldest
    result = result.sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        );
      } else {
        return (
          new Date(a.publishedDate).getTime() -
          new Date(b.publishedDate).getTime()
        );
      }
    });

    return result;
  }, [news, searchTerm, selectedCategory, categoriesData, language, sortOrder]);

  // ✅ Pagination (slicing data)
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
      notFound: "Bu categoriyaga oid yangilik mavjud emas",
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

  useEffect(() => {
    const fetchPublishers = async () => {
      if (!newsData?.content) return;

      const uniquePublisherIds = [
        ...new Set(newsData.content.map((n: NewsApiItem) => n.publisherId)),
      ];

      const results: Record<number, Publisher> = {};
      await Promise.all(
        uniquePublisherIds.map(async (id) => {
          try {
            const res = await fetch(
              `https://back.foragedialog.uz/Publisher/GetById?id=${id}`
            );
            const data = await res.json();
            if (data?.content) {
              results[id as any] = {
                id: data.content.id,
                name: data.content.name,
                imageId: data.content.imageId,
              };
            }
          } catch (err) {
            console.error("Publisher fetch error:", err);
          }
        })
      );

      setPublishers(results);
    };

    fetchPublishers();
  }, [newsData]);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Search + Sort + Categories */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 items-center">
            {/* Search + Filter */}
            <div className="flex w-full gap-4">
              <div className="relative w-4/5">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    updateParams({ search: val, page: "1" });
                    setCurrentPage(1);
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

              {/* Sort filter */}
              <select
                value={sortOrder}
                onChange={(e) => {
                  const val = e.target.value as "newest" | "oldest";
                  setSortOrder(val);
                  updateParams({ sort: val, page: "1" });
                  setCurrentPage(1);
                }}
                className="w-1/5 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              >
                <option value="newest">
                  {language === "uz"
                    ? "Yangi"
                    : language === "ru"
                    ? "Новые"
                    : language === "ger"
                    ? "Neueste"
                    : "Newest"}
                </option>
                <option value="oldest">
                  {language === "uz"
                    ? "Eski"
                    : language === "ru"
                    ? "Старые"
                    : language === "ger"
                    ? "Älteste"
                    : "Oldest"}
                </option>
              </select>
            </div>

            {/* Categories Carousel */}
            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    updateParams({ category: null, page: "1" });
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
                        updateParams({
                          category: String(category.id),
                          page: "1",
                        });
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

        {/* News List */}
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
                  {paginatedNews.map((news) => (
                    <article
                      key={news.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-100"
                    >
                      {/* ✅ Swiper Carousel */}
                      <div className="relative w-full h-56">
                        <Swiper
                          modules={[Navigation, Pagination, Autoplay]}
                          spaceBetween={0}
                          slidesPerView={1}
                          navigation
                          pagination={{ clickable: true }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
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
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {news.publisher?.imageId && (
                              <Image
                                src={`https://back.foragedialog.uz/File/DownloadFile/download/${news.publisher.imageId}`}
                                alt={news.publisher.name}
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-full object-cover border"
                              />
                            )}
                            <span className="text-gray-700 font-medium text-sm">
                              {news.publisher?.name || "—"}
                            </span>
                          </div>
                          <time className="text-gray-500 text-xs">
                            {news.date}
                          </time>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                          {news.title}
                        </h2>

                        <Link
                          href={`/${language}/blog/${news.id}`}
                          className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition inline-block"
                        >
                          {readFullArticleText[language]}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* ✅ Pagination Controls with Numbers */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
                    {/* Previous */}
                    <Button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((prev) => prev - 1);
                        updateParams({ page: String(currentPage - 1) });
                      }}
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

                    {/* Numbered pages */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          type="button"
                          onClick={() => {
                            setCurrentPage(page);
                            updateParams({ page: String(page) });
                          }}
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
                      onClick={() => {
                        setCurrentPage((prev) => prev + 1);
                        updateParams({ page: String(currentPage + 1) });
                      }}
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
