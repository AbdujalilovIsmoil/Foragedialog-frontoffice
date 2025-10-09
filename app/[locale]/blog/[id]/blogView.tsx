"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGet } from "@/app/hooks";
import { Button } from "@/app/components";

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

interface Publisher {
  name: string;
  imageId: string;
  id: number;
}

export default function NewsView() {
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();

  const rawLang = (pathName?.split("/")[1] ?? "uz") as string;
  const language = (
    ["uz", "ru", "en", "ger"].includes(rawLang) ? rawLang : "uz"
  ) as Lang;

  const newsId = Number(params?.id);

  const { data: newOneData } = useGet({
    queryKey: "blog-one",
    path: `/Blog/GetById?id=${newsId}`,
  });

  const localeMap: Record<Lang, string> = {
    uz: "uz",
    ru: "ru-RU",
    en: "en-US",
    ger: "de-DE",
  };

  const imageBase = "https://back.foragedialog.uz/File/DownloadFile/download";

  const imageUrls: string[] = useMemo(() => {
    if (
      !newOneData?.content?.images ||
      newOneData?.content?.images.length === 0
    )
      return [];
    return newOneData?.content?.images.map(
      (imgId: string) => `${imageBase}/${imgId}`
    );
  }, [newOneData]);

  const { data: publisherData, isLoading } = useGet({
    queryKey: "publisher",
    path: newOneData?.content?.publisherId
      ? `/Publisher/GetById?id=${newOneData?.content?.publisherId}`
      : "",
  });

  const publisher: Publisher | null =
    publisherData && publisherData.content ? publisherData.content : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!newOneData) {
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

  const emptyImage = {
    uz: "Rasm yo‘q",
    en: "No Image",
    ger: "Kein Bild",
    ru: "Нет изображения",
  };

  const localized = (rec?: LocalizedRecord | null): string => {
    if (!rec || typeof rec !== "object") return "";
    const val =
      (rec[language] && rec[language].trim() !== "" ? rec[language] : rec.uz) ||
      "";
    return val;
  };

  const localizedArr = (arr?: LocalizedRecord[] | null): string[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map((r) =>
      r && typeof r === "object"
        ? (r[language] && r[language].trim() !== "" ? r[language] : r.uz) || ""
        : ""
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section with Swiper */}
        <section className="relative">
          <div className="relative h-[70vh] w-full overflow-hidden">
            {imageUrls.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop
                className="h-full w-full"
              >
                {imageUrls.map((src) => (
                  <SwiperSlide key={src}>
                    <Image
                      width={1600}
                      height={900}
                      unoptimized
                      src={src}
                      alt={localized(
                        newOneData?.content ? newOneData?.content?.title : ""
                      )}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">{emptyImage[language]}</span>
              </div>
            )}

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/50 z-20 flex flex-col justify-end">
              <div className="max-w-5xl mx-auto px-6 py-10 text-white relative z-30">
                {/* Categories + date + reading time */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {newOneData &&
                    newOneData?.content?.categories &&
                    newOneData?.content?.categories?.length > 0 &&
                    localizedArr(newOneData?.content?.categories).map(
                      (c, i) => (
                        <span
                          key={`${c}-${i}`}
                          className="bg-teal-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full"
                        >
                          {c}
                        </span>
                      )
                    )}
                  <span className="text-sm">
                    {new Date(
                      newOneData?.content?.publishedDate
                    ).toLocaleDateString(localeMap[language], {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-sm">
                    {newOneData?.content?.readingTime &&
                    newOneData?.content?.readingTime.trim() !== ""
                      ? `${newOneData?.content.readingTime} min`
                      : "—"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight drop-shadow-lg z-30 relative">
                  {localized(newOneData?.content?.title)}
                </h1>
                {/* Subject */}
                <p className="text-lg sm:text-xl text-white/90 max-w-3xl drop-shadow-md z-30 relative">
                  {localized(newOneData?.content?.subject)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-10 lg:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  newOneData?.content?.text &&
                  typeof newOneData?.content?.text === "object"
                    ? (newOneData?.content?.text[language] &&
                      newOneData?.content?.text[language].trim() !== ""
                        ? newOneData?.content?.text[language]
                        : newOneData?.content?.text.uz) || ""
                    : "",
              }}
            />

            {/* tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {newOneData?.content?.tags &&
                localizedArr(newOneData?.content?.tags).map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-teal-50 hover:text-teal-600 transition-colors duration-300"
                  >
                    #{t}
                  </span>
                ))}
            </div>

            {/* publisher */}
            {publisher && (
              <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4">
                <Image
                  src={`${imageBase}/${publisher.imageId}`}
                  alt={publisher.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border shadow-sm"
                  unoptimized
                />
                <div>
                  <p className="text-gray-900 font-semibold text-lg">
                    {publisher.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {language === "uz" && "Muallif"}
                    {language === "ru" && "Автор"}
                    {language === "en" && "Publisher"}
                    {language === "ger" && "Autor"}
                  </p>
                </div>
              </div>
            )}

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

      {/* Global styles */}
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
