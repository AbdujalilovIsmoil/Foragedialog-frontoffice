"use client";

import { useState } from "react";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "Barcha resurslar", icon: "📁" },
    { id: "documents", name: "Hujjatlar", icon: "📄" },
    { id: "images", name: "Rasmlar", icon: "🖼️" },
    { id: "videos", name: "Videolar", icon: "🎥" },
    { id: "presentations", name: "Taqdimotlar", icon: "📊" },
    { id: "templates", name: "Shablonlar", icon: "📋" },
    { id: "reports", name: "Hisobotlar", icon: "📈" },
  ];

  const resources = [
    {
      id: 1,
      name: "Qishloq xo'jaligi hisoboti 2024",
      category: "reports",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-01-15",
      description: "Yillik qishloq xo'jaligi mahsulotlari hisoboti",
    },
    {
      id: 2,
      name: "Ekin yetishtirish bo'yicha qo'llanma",
      category: "documents",
      type: "DOCX",
      size: "1.8 MB",
      date: "2024-01-10",
      description: "Ekin yetishtirish texnologiyalari haqida batafsil ma'lumot",
    },
    {
      id: 3,
      name: "Tuproq tahlili natijalari",
      category: "images",
      type: "JPG",
      size: "856 KB",
      date: "2024-01-08",
      description: "Turli hududlardagi tuproq tahlili rasmlari",
    },
    {
      id: 4,
      name: "Zamonaviy qishloq xo'jaligi texnologiyalari",
      category: "videos",
      type: "MP4",
      size: "45.2 MB",
      date: "2024-01-05",
      description: "Yangi texnologiyalar haqida video ma'lumot",
    },
    {
      id: 5,
      name: "Mahsulot taqdimoti shablon",
      category: "templates",
      type: "PPTX",
      size: "3.1 MB",
      date: "2024-01-03",
      description: "Mahsulot taqdimoti uchun tayyor shablon",
    },
    {
      id: 6,
      name: "Moliyaviy hisobot 2023",
      category: "presentations",
      type: "PPTX",
      size: "4.7 MB",
      date: "2023-12-28",
      description: "2023 yil moliyaviy natijalar taqdimoti",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "docx":
      case "doc":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      case "mp4":
      case "avi":
        return "🎥";
      case "pptx":
      case "ppt":
        return "📊";
      default:
        return "📁";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resurslar</h1>
              <p className="mt-2 text-gray-600">
                Kompaniya hujjatlari va materiallar
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kategoriyalar
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistika
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jami fayllar:</span>
                  <span className="font-semibold text-gray-900">
                    {resources.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Umumiy hajm:</span>
                  <span className="font-semibold text-gray-900">58.1 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Oxirgi yangilanish:</span>
                  <span className="font-semibold text-gray-900">
                    15.01.2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Fayllarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {getFileIcon(resource.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 line-clamp-2">
                            {resource.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {resource.date}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Ko'rish
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Yuklab olish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hech qanday fayl topilmadi
                </h3>
                <p className="text-gray-600">
                  Qidiruv shartlaringizni o'zgartiring yoki yangi fayllar
                  yuklang
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
