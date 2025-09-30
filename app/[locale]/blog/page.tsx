"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/app/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGet } from "@/app/hooks";
import { get } from "lodash";
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
  text: string;
  categories: string[];
  tags: string[];
  images: string[];
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

  const itemsPerPage = 6;
  const [publishers, setPublishers] = useState<Record<number, Publisher>>({});

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  const { data: categoriesData } = useGet({
    queryKey: "news-category",
    path: "/NewsCategory/GetAll",
  });

  const { data: newsData } = useGet({
    queryKey: "blog",
    path: "/Blog/GetAll",
  });

  const news: NewsItem[] = useMemo(() => {
    if (!newsData?.content) return [];
    return newsData.content.map((n: NewsApiItem) => ({
      id: n.id,
      title: n.title[language] || n.title["uz"],
      text: n.text[language] || "",
      categories: n.categories.map((c) => c[language]),
      tags: n.tags.map((t) => t[language]),
      images: n.images.map(
        (imgId) =>
          `https://back.foragedialog.uz/File/DownloadFile/download/${imgId}`
      ),
      date: new Date(n.publishedDate).toLocaleDateString(language, {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }),
      views: n.viewsCount,
      publishedDate: n.publishedDate,
      publisher: publishers[n.publisherId],
    }));
  }, [newsData, language, publishers]);

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

    result = result.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        : new Date(a.publishedDate).getTime() -
          new Date(b.publishedDate).getTime()
    );

    return result;
  }, [news, searchTerm, selectedCategory, categoriesData, language, sortOrder]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const newsContent = {
    uz: { all: "Hammasi", notFound: "Yangilik topilmadi" },
    ru: { all: "Все", notFound: "Новостей нет" },
    en: { all: "All", notFound: "No news found" },
    ger: { all: "Alle", notFound: "Keine Nachrichten gefunden" },
  };

  useEffect(() => {
    const fetchPublishers = async () => {
      if (!newsData?.content) return;
      const ids = [
        ...new Set(newsData.content.map((n: NewsApiItem) => n.publisherId)),
      ];
      const results: Record<number, Publisher> = {};
      await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await fetch(
              `https://back.foragedialog.uz/Publisher/GetById?id=${id}`
            );
            const data = await res.json();
            if (data?.content) {
              results[id as number] = {
                id: data.content.id,
                name: data.content.name,
                imageId: data.content.imageId,
              };
            }
          } catch {}
        })
      );
      setPublishers(results);
    };
    fetchPublishers();
  }, [newsData]);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Filters */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
            {/* Search + Sort */}
            <div className="flex w-full gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    updateParams({ search: val, page: "1" });
                    setCurrentPage(1);
                  }}
                  placeholder="Search news..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              <select
                value={sortOrder}
                onChange={(e) => {
                  const val = e.target.value as "newest" | "oldest";
                  setSortOrder(val);
                  updateParams({ sort: val, page: "1" });
                  setCurrentPage(1);
                }}
                className="w-40 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {/* Categories (horizontal scroll) */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  updateParams({ category: null, page: "1" });
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === null
                    ? "bg-teal-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
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
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-teal-600 text-white shadow"
                        : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                    }`}
                  >
                    {category.categoryName[language]}
                  </Button>
                )
              )}
            </div>
          </div>
        </section>

        {/* News grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {paginatedNews.length === 0 ? (
              <p className="text-center text-gray-600">
                {newsContent[language].notFound}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNews.map((news) => {
                  console.log(news);

                  return (
                    <article
                      key={news.id}
                      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg border overflow-hidden transition duration-300"
                    >
                      {/* Image */}
                      <div className="relative w-full h-48 bg-gray-100">
                        {news.images[0] ? (
                          <Image
                            src={news.images[0]}
                            alt={news.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                          <span>{news.date}</span>
                          <span>{news.views} views</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {news.text}
                        </p>

                        {/* Publisher */}
                        {news.publisher && (
                          <div className="flex items-center gap-2 mb-4">
                            <Image
                              src={`https://back.foragedialog.uz/File/DownloadFile/download/${news.publisher.imageId}`}
                              alt={news.publisher.name}
                              width={32}
                              height={32}
                              className="rounded-full border"
                            />
                            <span className="text-sm text-gray-700">
                              {news.publisher.name}
                            </span>
                          </div>
                        )}

                        {/* Button */}
                        <Link
                          href={`/${language}/blog/${news.id}`}
                          className="mt-auto block w-full text-center px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
                        >
                          Read more
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
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
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
