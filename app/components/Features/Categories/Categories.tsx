"use client";

import { get } from "lodash";
import { useState } from "react";
import { useGet } from "@/app/hooks";
import { usePathname } from "next/navigation";

interface Category {
  id: number;
  picturesId: string;
  name: {
    uz: string;
    ru: string;
    en: string;
    ger: string;
  };
}

const categoryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M5 21c7 0 12-5 12-12V4a1 1 0 0 0-1-1h-5C6.477 3 3 6.477 3 11v5a5 5 0 0 0 2 4z" />
  </svg>
);

const Categories = () => {
  const pathName = usePathname();
  const language = pathName.split("/")[1];
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const { data } = useGet({
    queryKey: "our-category",
    path: "/OurCategory/GetAll",
  });

  interface categoryContentInterface {
    [key: string]: {
      title: string;
      description: string;
    };
  }

  const categoryContent: categoryContentInterface = {
    uz: {
      title: "Bizning Kategoriyalar",
      description: `
      Raqamli xizmatlarimizning keng doirasini kashf eting va
      biznesingizni rivojlantiring`,
    },
    ru: {
      title: "Наши категории",
      description: `
      Откройте для себя наш широкий спектр цифровых услуг и развивайте свой бизнес`,
    },
    en: {
      title: "Our categories",
      description: `
      Discover our wide range of digital services and grow your business`,
    },
    ger: {
      title: "Unsere Kategorien",
      description: `
      Entdecken Sie unser breites Angebot an digitalen Services und erweitern Sie Ihr Geschäft`,
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {categoryContent[`${language}`].title}
          </h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {categoryContent[`${language}`].description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {get(data, "content", []).map((category: Category) => (
            <div
              key={category.id}
              onMouseLeave={() => setHoveredCategory(null)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/File/DownloadFile/download/${category.picturesId})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 transition-opacity duration-500 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/70" />

              <div className="relative z-10 p-6 h-48 flex flex-col justify-between">
                <div className="flex justify-start">
                  <div
                    className={`transform transition-all duration-500 ${
                      hoveredCategory === category.id
                        ? "scale-110 rotate-12"
                        : "scale-100 rotate-0"
                    }`}
                  >
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      {categoryIcon}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:translate-y-[-2px]">
                    {category.name[`${language}` as "uz" | "ru" | "en" | "ger"]}
                  </h3>

                  <div
                    className={`h-1 bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-500 ${
                      hoveredCategory === category.id ? "w-12" : "w-0"
                    }`}
                  />
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
