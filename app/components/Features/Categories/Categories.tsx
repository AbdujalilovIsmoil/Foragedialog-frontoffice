"use client";

import { useState } from "react";
import Category1 from "@/public/images/png/category-image-1.png";
import Category2 from "@/public/images/png/category-image-2.png";
import Category3 from "@/public/images/png/category-image-3.png";

const categories = [
  {
    id: 1,
    title: "Web Development",
    backgroundImage: Category1.src,
  },
  {
    id: 2,
    title: "UI/UX Design",
    backgroundImage: Category2.src,
  },
  {
    id: 3,
    title: "Digital Marketing",
    backgroundImage: Category3.src,
  },
];

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
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Categories
          </h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to transform
            your digital presence
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
                style={{ backgroundImage: `url(${category.backgroundImage})` }}
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
                    {category.title}
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
}

export default Categories;