"use client";

import { Button } from "@/app/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useGet } from "@/app/hooks"; // ← sening custom hook'ing (SWR yoki React Query bo‘lishi mumkin)

// Typings
interface LocalizedRecord {
  uz: string;
  ru: string;
  en: string;
  ger: string;
}

interface ResourceItem {
  id: number;
  fileName: LocalizedRecord;
  fileType: string;
  subject: LocalizedRecord;
  resourceCategoryId: number;
  publishedDate: string;
  size: LocalizedRecord;
  fileIdUZ: string;
  fileIdRU: string;
  fileIdEN: string;
  fileIdGER: string;
}

interface CategoryItem {
  id: number;
  categoryName: LocalizedRecord;
}

// Helpers
const getFileIcon = (type: string) => {
  if (!type) return "📁";
  const t = type.toLowerCase();
  if (t.includes("pdf")) return "📄";
  if (t.includes("doc")) return "📝";
  if (t.includes("jpg") || t.includes("jpeg") || t.includes("png")) return "🖼️";
  if (t.includes("mp4") || t.includes("avi")) return "🎥";
  if (t.includes("ppt")) return "📊";
  return "📁";
};

// Bytes format
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function ResourcesPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const language =
    (pathName.split("/")[1] as "uz" | "ru" | "en" | "ger") || "uz";

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  // API calls
  const { data: resourcesData, isLoading: loadingResources } = useGet({
    queryKey: "resources",
    path: "/Resource/GetAll",
  });

  const { data: categoriesData, isLoading: loadingCategories } = useGet({
    queryKey: "resourceCategories",
    path: "/ResourceCategory/GetAll",
  });

  const resources: ResourceItem[] = resourcesData?.content || [];
  const categories: CategoryItem[] = categoriesData?.content || [];

  // Filtering
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const name = res.fileName[language]?.toLowerCase() || "";
      const desc = res.subject[language]?.toLowerCase() || "";
      const matchesSearch =
        searchTerm === "" ||
        name.includes(searchTerm.toLowerCase()) ||
        desc.includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        String(res.resourceCategoryId) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [resources, searchTerm, selectedCategory, language]);

  // URL params update
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory && selectedCategory !== "all")
      params.set("category", selectedCategory);
    router.replace(`/${language}/resources?${params.toString()}`);
  }, [searchTerm, selectedCategory, language, router]);

  // Statistika
  const totalFiles = resources.length;
  const totalSizeBytes = resources.reduce((acc, res) => {
    const sizeString = res.size[language] || res.size.uz;
    const match = sizeString.match(/([\d.]+)\s*(KB|MB|GB)/i);
    if (!match) return acc;
    let value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    if (unit === "KB") value *= 1024;
    if (unit === "MB") value *= 1024 * 1024;
    if (unit === "GB") value *= 1024 * 1024 * 1024;
    return acc + value;
  }, 0);

  const lastUpdate = resources
    .map((r) => new Date(r.publishedDate))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const resourceContent = {
    uz: {
      title: "Resurslar",
      description: "Kompaniya hujjatlari va materiallar",
    },
    ru: {
      title: "Ресурсы",
      description: "Документы и материалы компании",
    },
    en: {
      title: "Resources",
      description: "Company documents and materials",
    },
    ger: {
      title: "Ressourcen",
      description: "Unternehmensdokumente und Materialien",
    },
  };

  if (loadingResources || loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  const placeholderText: Record<string, string> = {
    uz: "Fayllarni qidirish",
    ru: "Поиск файлов",
    en: "Search files",
    ger: "Dateien durchsuchen",
  };
  const categoryText: Record<string, string> = {
    uz: "Kategoriyalar",
    ru: "Категории",
    en: "Categories",
    ger: "Kategorien",
  };

  const allResourceText: Record<string, string> = {
    uz: "Barcha resurslar",
    ru: "Все ресурсы",
    en: "All resources",
    ger: "Alle Ressourcen",
  };

  const downloadText: Record<string, string> = {
    uz: "Yuklab olish",
    ru: "Скачать",
    en: "Download",
    ger: "Herunterladen",
  };

  const statisticsData: Record<
    string,
    {
      statistic: string;
      allSizes: string;
      allFiles: string;
      lastUpdated: string;
    }
  > = {
    uz: {
      statistic: "Statistika",
      allSizes: "Umumiy hajm",
      allFiles: "Jami fayllar",
      lastUpdated: "Oxirgi yangilanish",
    },
    ru: {
      statistic: "Статистика",
      allSizes: "Общий размер",
      allFiles: "Всего файлов",
      lastUpdated: "Последнее обновление",
    },
    en: {
      statistic: "Statistics",
      allSizes: "Total size",
      allFiles: "Total files",
      lastUpdated: "Last updated",
    },
    ger: {
      statistic: "Statistik",
      allSizes: "Gesamtgröße",
      allFiles: "Gesamtanzahl Dateien",
      lastUpdated: "Zuletzt aktualisiert",
    },
  };

  const notFoundData: Record<string, { title: string; description: string }> = {
    uz: {
      title: "Hech qanday fayl topilmadi",
      description:
        "Qidiruv shartlaringizni o‘zgartiring yoki yangi fayllar yuklang",
    },
    ru: {
      title: "Файлы не найдены",
      description: "Измените условия поиска или загрузите новые файлы",
    },
    en: {
      title: "No files found",
      description: "Change your search criteria or upload new files",
    },
    ger: {
      title: "Keine Dateien gefunden",
      description:
        "Ändern Sie Ihre Suchkriterien oder laden Sie neue Dateien hoch",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {resourceContent[language].title}
          </h1>
          <p className="mt-2 text-gray-600">
            {resourceContent[language].description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {categoryText[`${language}`]}
            </h3>
            <div className="space-y-2">
              <Button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`w-full px-3 py-2 rounded-lg text-left ${
                  selectedCategory === "all"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                📁 {allResourceText[`${language}`]}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(String(cat.id))}
                  className={`w-full px-3 py-2 rounded-lg text-left ${
                    String(cat.id) === selectedCategory
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat.categoryName[language]}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {statisticsData[`${language}`].statistic}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {statisticsData[`${language}`].allFiles}:
                </span>
                <span className="font-semibold">{totalFiles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {statisticsData[`${language}`].allSizes}:
                </span>
                <span className="font-semibold">
                  {formatBytes(totalSizeBytes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {statisticsData[`${language}`].lastUpdated}:
                </span>
                <span className="font-semibold">
                  {lastUpdate ? lastUpdate.toLocaleDateString("uz-UZ") : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <input
              type="text"
              value={searchTerm}
              placeholder={placeholderText[`${language}`]}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Resources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
              const fileUrl = `/File/DownloadFile/download/${
                language === "uz"
                  ? res.fileIdUZ
                  : language === "ru"
                  ? res.fileIdRU
                  : language === "en"
                  ? res.fileIdEN
                  : res.fileIdGER
              }`;
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">
                        {getFileIcon(res.fileType)}
                      </div>
                      <div>
                        <h4 className="font-semibold line-clamp-2">
                          {res.fileName[language] || res.fileName.uz}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {res.fileType} • {res.size[language]}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {res.subject[language] || res.subject.uz}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {new Date(res.publishedDate).toLocaleDateString(
                          "uz-UZ"
                        )}
                      </span>
                      <div className="flex gap-3">
                        <a
                          href={fileUrl}
                          download
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {downloadText[`${language}`]}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-semibold">
                {notFoundData[`${language}`].title}
              </h3>
              <p className="text-gray-600">
                {notFoundData[`${language}`].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
