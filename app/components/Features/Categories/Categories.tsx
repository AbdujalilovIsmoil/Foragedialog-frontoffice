"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: {
    uz: string;
    ru: string;
    en: string;
    ger: string;
  };
  picturesId: string;
}

const categoryIcon = (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://95.130.227.28:8080/OurCategory/GetAll");
        const data = await res.json();
        if (data.code === 200 && data.content) {
          setCategories(data.content);
        }
      } catch (error) {
        console.error("Kategoriya ma'lumotlarini olishda xato:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bizning <span className="text-teal-600">Kategoriyalar</span>
          </h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Raqamli xizmatlarimizning keng doirasini kashf eting va
            biznesingizni rivojlantiring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(http://95.130.227.28:8080/File/DownloadFile/download?id=${category.picturesId})`,
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
                    {category.name.uz}
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
