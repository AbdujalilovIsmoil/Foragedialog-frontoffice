"use client";

import { get } from "lodash";
import Image from "next/image";
import { useGet } from "@/app/hooks";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRightIcon, CalendarIcon, EyeIcon } from "lucide-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

type Lang = "uz" | "ru" | "en" | "ger";

interface NewsItem {
  id: number;
  images: string[];
  publishedDate: string;
  viewsCount: number | string;
  publisherId: number | string;
  categories: (string | number)[];
  text: Partial<Record<Lang, string>> | string;
  title: Partial<Record<Lang, string>> | string;
  subject: Partial<Record<Lang, string>> | string;
  tags: Array<number | string | Partial<Record<Lang, string>>>;
}

const News = () => {
  const pathName = usePathname();
  const language = (pathName?.split("/")[1] || "uz") as Lang;

  const { data } = useGet({
    queryKey: "news",
    path: "/News/GetAll",
  });

  const formattedNews: NewsItem[] = get(data, "content", []).map(
    (item: any) => {
      const images: string[] =
        (item.images || []).map(
          (imgId: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/File/DownloadFile/download/${imgId}`
        ) || [];

      return {
        id: item.id,
        subject: item.subject || {},
        tags: item.tags || [],
        viewsCount: item.viewsCount ?? 0,
        publisherId: item.publisherId,
        title: item.title || {},
        text: item.text || {},
        categories: item.categories || [],
        publishedDate: item.publishedDate,
        images,
      } as NewsItem;
    }
  );

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

  const newsContent: Record<
    Lang,
    { title: string; description: string; readMoreAll: string }
  > = {
    uz: {
      title: "Bizning yangiliklar",
      description: "So'nggi yangiliklar va yangiliklarimiz bilan tanishing",
      readMoreAll: "Ko‘proq o‘qish",
    },
    ru: {
      title: "Наши новости",
      description: "Ознакомьтесь с нашими последними новостями и обновлениями",
      readMoreAll: "Читать больше",
    },
    en: {
      title: "Our news",
      description: "Check out our latest news and updates",
      readMoreAll: "Read more",
    },
    ger: {
      title: "Unsere Neuigkeiten",
      description:
        "Schauen Sie sich unsere neuesten Nachrichten und Updates an",
      readMoreAll: "Mehr lesen",
    },
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {newsContent[language].title}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {newsContent[language].description}
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {formattedNews.map((news) => {
            const title = getLocalized(news.title, language);
            const img =
              news.images && news.images.length > 0 ? news.images[0] : "";

            return (
              <SwiperSlide key={news.id} className="!h-auto">
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
                      {Array.isArray(news.tags) && news.tags.length > 3 && (
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
                        <span>{formatDate(news.publishedDate)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <EyeIcon className="w-4 h-4" />
                        <span>{Number(news.viewsCount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Ko'proq o'qish button */}
        <div className="mt-6 flex justify-center">
          <Link
            href={`/${language}/news`}
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow hover:bg-teal-700 transition"
          >
            {newsContent[language].readMoreAll}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
