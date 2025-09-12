"use client";

import { get } from "lodash";
import Image from "next/image";
import { useGet } from "@/app/hooks";
import { Button } from "@/app/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";

interface NewsItem {
  id: number;
  images: string[];
  publishedDate: string;
  tags: (string | number)[];
  viewsCount: number | string;
  publisherId: number | string;
  categories: (string | number)[];
  subject: Record<"uz" | "ru" | "en" | "ger", string>;
  title: Record<"uz" | "ru" | "en" | "ger", string>;
  text: Record<"uz" | "ru" | "en" | "ger", string>;
}

const News = () => {
  const pathName = usePathname();
  const language = pathName.split("/")[1] as "uz" | "ru" | "en" | "ger";

  const { data } = useGet({
    queryKey: "news",
    path: "/News/GetAll",
  });

  const formattedNews: NewsItem[] = get(data, "content", []).map(
    (item: any): NewsItem => ({
      id: item.id,
      subject: item.subject,
      tags: item.tags,
      viewsCount: item.viewsCount,
      publisherId: item.publisherId,
      title: item.title,
      text: item.text,
      categories: item.categories,
      publishedDate: item.publishedDate,
      images: item.images.map(
        (imgId: string) =>
          `${process.env.NEXT_PUBLIC_API_URL}/File/DownloadFile/download/${imgId}`
      ),
    })
  );

  // date formatter tilga qarab o'zgaradi
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat(
        language === "uz"
          ? "uz-UZ"
          : language === "ru"
          ? "ru-RU"
          : language === "ger"
          ? "de-DE"
          : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const newsContent = {
    uz: {
      title: "Bizning yangiliklar",
      description: "So'nggi yangiliklar va yangiliklarimiz bilan tanishing",
    },
    ru: {
      title: "Наши новости",
      description: "Ознакомьтесь с нашими последними новостями и обновлениями",
    },
    en: {
      title: "Our news",
      description: "Check out our latest news and updates",
    },
    ger: {
      title: "Unsere Neuigkeiten",
      description:
        "Schauen Sie sich unsere neuesten Nachrichten und Updates an",
    },
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {newsContent[language].title}
          </h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {newsContent[language].description}
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {formattedNews.map((news) => (
            <SwiperSlide key={news.id}>
              <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    unoptimized
                    src={news.images[0]}
                    alt={news.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarIcon />
                      <span>{formatDate(news.publishedDate)}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {news.title[language]}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {news.text[language] || news.subject[language]}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {news.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {news.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                        +{news.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <a
                    href={`/${language}/blog/${news.id}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {language === "uz"
                      ? "Batafsil o‘qish"
                      : language === "ru"
                      ? "Подробнее"
                      : language === "ger"
                      ? "Mehr lesen"
                      : "Read More"}
                    <ArrowRightIcon />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination-custom flex justify-center mt-6 sm:mt-8 space-x-2"></div>
      </div>
    </section>
  );
};

export default News;
