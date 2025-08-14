"use client";
import { Button } from "@/app/components";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsImage1 from "@/public/images/png/news-image-1.png";
import NewsImage2 from "@/public/images/png/news-image-2.png";
import NewsImage3 from "@/public/images/png/news-image-3.png";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface NewsItem {
  id: number;
  date: string;
  image: string;
  title: string;
  description: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    image: NewsImage1.src,
    title: "Revolutionary AI Technology Transforms Industry Standards",
    description:
      "Discover how cutting-edge artificial intelligence is reshaping business operations and creating new opportunities across multiple sectors.",
    date: "December 15, 2024",
  },
  {
    id: 2,
    image: NewsImage2.src,
    title: "Global Market Trends Show Unprecedented Growth",
    description:
      "Latest market analysis reveals significant growth patterns that are influencing investment strategies worldwide.",
    date: "December 12, 2024",
  },
  {
    id: 3,
    image: NewsImage3.src,
    title: "Startup Innovation Drives Economic Recovery",
    description:
      "Young entrepreneurs are leading the charge in economic recovery with innovative solutions and disruptive technologies.",
    date: "December 10, 2024",
  },
  {
    id: 4,
    image: NewsImage1.src,
    title: "Digital Transformation Accelerates Across Industries",
    description:
      "Companies worldwide are embracing digital solutions to enhance efficiency and customer experience.",
    date: "December 8, 2024",
  },
  {
    id: 5,
    image: NewsImage2.src,
    title: "Sustainable Business Practices Gain Momentum",
    description:
      "Environmental consciousness is driving new business models and sustainable practices across global markets.",
    date: "December 5, 2024",
  },
];

const News = () => {
  const handleCardClick = (newsId: number) => {
    console.log(`Navigating to news article ${newsId}`);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our News</h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to transform
            your digital presence
          </p>
        </div>

        <div className="relative">
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
              640: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {newsData.map((news) => (
              <SwiperSlide key={news.id}>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-white/20"
                  onClick={() => handleCardClick(news.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-full h-32 sm:h-40 lg:h-48 xl:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2 sm:gap-0">
                      <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full w-fit border border-teal-200">
                        Breaking News
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm sm:ml-3 font-sans">
                        {news.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-teal-700 mb-3 group-hover:text-teal-800 transition-colors duration-300 font-sans truncate">
                      {news.title}
                    </h3>

                    <p className="text-teal-600 mb-4 leading-relaxed font-sans text-xs sm:text-sm lg:text-base truncate">
                      {news.description}
                    </p>

                    <Button
                      className="inline-flex items-center px-4 sm:px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 group-hover:shadow-lg transform hover:scale-105 font-sans text-xs sm:text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(news.id);
                      }}
                    >
                      Read More
                      <svg
                        className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-teal-50 text-teal-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 group border border-teal-100">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
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
          </Button>

          <Button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-teal-50 text-teal-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 group border border-teal-100">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>

        <div className="swiper-pagination-custom flex justify-center mt-6 sm:mt-8 space-x-2"></div>

        <div className="text-center mt-12">
          <Button className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium">
            <span>Learn More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
