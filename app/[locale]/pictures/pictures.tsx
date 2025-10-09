"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components";
import { usePathname, useRouter } from "next/navigation";

type Lang = "uz" | "ru" | "en" | "ger";

// API'dan keladigan element
interface PictureCategory {
  id: number;
  categoryId: number;
  categoryName: Record<Lang, string>;
  imagesIds: number[];
  imageModels: {
    fileId: string;
    imageName: string;
    id: number;
  }[];
}

const TRANSLATIONS: Record<
  Lang,
  {
    title: string;
    loading: string;
    empty: string;
    prev: string;
    next: string;
    pageSize: string;
    count: string;
  }
> = {
  uz: {
    title: "📸 Rasm toifalari",
    loading: "⏳ Yuklanmoqda...",
    empty: "❌ Hozircha ma'lumot yo‘q",
    prev: "◀ Avvalgi",
    next: "Keyingi ▶",
    pageSize: "Sahifadagi elementlar",
    count: "ta rasm",
  },
  ru: {
    title: "📸 Категории изображений",
    loading: "⏳ Загрузка...",
    empty: "❌ Нет данных",
    prev: "◀ Назад",
    next: "Вперед ▶",
    pageSize: "Элементов на странице",
    count: "изображений",
  },
  en: {
    title: "📸 Picture Categories",
    loading: "⏳ Loading...",
    empty: "❌ No data found",
    prev: "◀ Prev",
    next: "Next ▶",
    pageSize: "Items per page",
    count: "images",
  },
  ger: {
    title: "📸 Bilderkategorien",
    loading: "⏳ Wird geladen...",
    empty: "❌ Keine Daten gefunden",
    prev: "◀ Zurück",
    next: "Weiter ▶",
    pageSize: "Seitengröße",
    count: "Bilder",
  },
};

const PicturesPage = () => {
  const autoDetectLang = true;
  const initialPageSize = 8;
  const apiBase = "https://back.foragedialog.uz";

  const router = useRouter();
  const pathName = usePathname();

  const langFromPath = (pathName?.split("/")[1] ?? "uz") as string;
  const lang: Lang = ["uz", "ru", "en", "ger"].includes(langFromPath)
    ? (langFromPath as Lang)
    : "uz";

  const [categories, setCategories] = useState<PictureCategory[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const effectiveLang: Lang = useMemo(
    () => (autoDetectLang ? lang : "uz"),
    [autoDetectLang, lang]
  );

  const t = TRANSLATIONS[effectiveLang];

  useEffect(() => {
    const ac = new AbortController();
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiBase}/PicturesModel/GetAll?page=${page}&pageSize=${pageSize}`,
          { signal: ac.signal }
        );
        const data = await res.json();

        setCategories(data?.content ?? []);
        setTotalPages(data?.totalPages ?? 1);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => ac.abort();
  }, [page, pageSize, apiBase]);

  const emptyImage = {
    uz: "Rasm yo‘q",
    en: "No Image",
    ger: "Kein Bild",
    ru: "Нет изображения",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-teal-600">{t.title}</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">{t.pageSize}:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-1 rounded-md border bg-white"
          >
            {[6, 8, 12, 16, 24].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-gray-500">{t.loading}</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-400 italic">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const img = cat.imageModels?.[0];
            return (
              <div
                key={cat.id}
                onClick={() =>
                  router.push(`/${effectiveLang}/pictures/${cat.id}`)
                }
                className="cursor-pointer group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <div className="relative w-full h-48">
                  {img ? (
                    <Image
                      src={`${apiBase}/File/DownloadFile/download/${img.fileId}`}
                      alt={img.imageName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      {emptyImage[lang]}
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full shadow">
                  {cat.imageModels?.length ?? 0}
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {cat.categoryName?.[effectiveLang] ||
                      cat.categoryName?.uz ||
                      "No title"}
                  </h3>
                  {img && (
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {img.imageName}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-4 py-2 rounded-lg text-white bg-teal-600 disabled:opacity-40"
        >
          {t.prev}
        </Button>
        <span className="text-gray-600">
          {page} / {totalPages}
        </span>
        <Button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="px-4 py-2 rounded-lg text-white bg-teal-600 disabled:opacity-40"
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
};

export default PicturesPage;
