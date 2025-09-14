"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGet } from "@/app/hooks";
import { Button } from "@/app/components";
import { get } from "lodash";

// Swiper (carousel)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Lang = "uz" | "ru" | "en" | "ger";

interface LocalizedRecord {
  uz: string;
  ru: string;
  en: string;
  ger: string;
}

interface NewsApiItem {
  id: number;
  subject: LocalizedRecord;
  title: LocalizedRecord;
  text: LocalizedRecord; // CKEditor HTML
  categories: LocalizedRecord[];
  tags: LocalizedRecord[];
  images: string[]; // ids
  readingTime: string;
  publishedDate: string;
  viewsCount: number;
}

export default function NewsView() {
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();

  // extract language (fallback to 'uz')
  const rawLang = (pathName?.split("/")[1] ?? "uz") as string;
  const language = (
    ["uz", "ru", "en", "ger"].includes(rawLang) ? rawLang : "uz"
  ) as Lang;

  const newsId = Number(params?.id);

  // fetch all news
  const {
    data: newsData,
    isLoading,
    isError,
  } = useGet({
    queryKey: "blog",
    path: "/Blog/GetAll",
  });

  const localeMap: Record<Lang, string> = {
    uz: "uz",
    ru: "ru-RU",
    en: "en-US",
    ger: "de-DE",
  };

  const contentArray = (get(newsData, "content", []) as NewsApiItem[]) ?? [];
  const article = contentArray.find((n) => n.id === newsId);

  // backend image URLs
  const imageBase = "https://back.foragedialog.uz/File/DownloadFile/download";

  const imageUrls: string[] = useMemo(() => {
    if (!article?.images || article.images.length === 0) return [];
    return article.images.map((imgId) => `${imageBase}/${imgId}`);
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading article.
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Button
              type="button"
              onClick={() => router.push(`/${language}/news`)}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300"
            >
              Back to News
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const backText: Record<Lang, string> = {
    uz: "Barcha Bloglarga qaytish",
    ru: "Назад ко всем блогам",
    en: "Back to All Blogs",
    ger: "Zurück zu allen Blogs",
  };

  // helpers
  const localized = (rec: LocalizedRecord) =>
    rec[language] && rec[language].trim() !== "" ? rec[language] : rec.uz || "";

  const localizedArr = (arr: LocalizedRecord[]) =>
    arr.map((r) =>
      r[language] && r[language].trim() !== "" ? r[language] : r.uz
    );

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Cover + Carousel */}
        <section className="relative">
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            {imageUrls.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop
                className="h-full"
              >
                {imageUrls.map((src, idx) => (
                  <SwiperSlide key={src} className="h-full">
                    <Image
                      width={1200}
                      height={700}
                      unoptimized
                      src={src}
                      alt={localized(article.title) || `article-${article.id}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* text content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {article.categories.length > 0 &&
                    localizedArr(article.categories).map((c, i) => (
                      <span
                        key={`${c}-${i}`}
                        className="bg-teal-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full"
                      >
                        {c}
                      </span>
                    ))}

                  <span className="text-white/90 text-sm">
                    {new Date(article.publishedDate).toLocaleDateString(
                      localeMap[language],
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>

                  <span className="text-white/90 text-sm">
                    {article.readingTime && article.readingTime.trim() !== ""
                      ? `${article.readingTime} min`
                      : "—"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  {localized(article.title)}
                </h1>
                <p className="text-white/90 text-lg lg:text-xl max-w-3xl">
                  {localized(article.subject)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  (article.text[language] &&
                  article.text[language].trim() !== ""
                    ? article.text[language]
                    : article.text.uz) || "",
              }}
            />

            {/* tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {article.tags &&
                localizedArr(article.tags).map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-teal-50 hover:text-teal-600 transition-colors duration-300"
                  >
                    #{t}
                  </span>
                ))}
            </div>

            {/* back button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => router.push(`/${language}/blog`)}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {backText[`${language}`]}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Global styles for CKEditor images & iframes */}
      <style jsx global>{`
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        .prose iframe {
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 16/9;
        }
      `}</style>
    </div>
  );
}
