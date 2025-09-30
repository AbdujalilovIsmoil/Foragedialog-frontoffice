"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components";
import { usePathname } from "next/navigation";

type Lang = "uz" | "ru" | "en" | "ger";

// API'dan keladigan element
interface ImageItem {
  fileId: string;
  imageName: string;
  id: number;
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
  }
> = {
  uz: {
    title: "📸 Rasmlar Galereyasi",
    loading: "⏳ Yuklanmoqda...",
    empty: "❌ Hozircha rasm yo‘q",
    prev: "◀ Avvalgi",
    next: "Keyingi ▶",
    pageSize: "Sahifadagi rasm soni",
  },
  ru: {
    title: "📸 Галерея изображений",
    loading: "⏳ Загрузка...",
    empty: "❌ Нет изображений",
    prev: "◀ Назад",
    next: "Вперед ▶",
    pageSize: "Размер страницы",
  },
  en: {
    title: "📸 Image Gallery",
    loading: "⏳ Loading...",
    empty: "❌ No images found",
    prev: "◀ Prev",
    next: "Next ▶",
    pageSize: "Page size",
  },
  ger: {
    title: "📸 Bildergalerie",
    loading: "⏳ Wird geladen...",
    empty: "❌ Keine Bilder gefunden",
    prev: "◀ Zurück",
    next: "Weiter ▶",
    pageSize: "Seitengröße",
  },
};

const PicturesPage = () => {
  // Bu yerda default config
  const autoDetectLang = true;
  const initialPageSize = 8;
  const apiBase = "https://back.foragedialog.uz";

  const pathName = usePathname();

  // Pathname'dan tilni aniqlash
  const langFromPath = (pathName?.split("/")[1] ?? "uz") as string;
  const lang: Lang = ["uz", "ru", "en", "ger"].includes(langFromPath)
    ? (langFromPath as Lang)
    : "uz";

  const [images, setImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Tanlangan til
  const effectiveLang: Lang = useMemo(() => {
    return autoDetectLang ? lang : "uz";
  }, [autoDetectLang, lang]);

  const t = TRANSLATIONS[effectiveLang];

  // Rasm olish
  useEffect(() => {
    const ac = new AbortController();
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiBase}/ImageModel/GetAll?page=${page}&pageSize=${pageSize}`,
          { signal: ac.signal }
        );
        const data = await res.json();

        setImages(data?.content ?? []);
        setTotalPages(data?.totalPages ?? 1);
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    return () => ac.abort();
  }, [page, pageSize, apiBase]);

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
      ) : images.length === 0 ? (
        <p className="text-center text-gray-400 italic">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={`${apiBase}/File/DownloadFile/download/${img.fileId}`}
                  alt={img.imageName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-sm text-white truncate">{img.imageName}</p>
                <Button
                  type="button"
                  onClick={() => setLightbox(idx)}
                  className="mt-2 px-3 py-1 text-xs rounded bg-white/20 text-white hover:bg-white/40"
                >
                  👁 View
                </Button>
              </div>
            </div>
          ))}
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

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-sm font-medium">
                {images[lightbox].imageName}
              </h3>
              <Button
                type="button"
                onClick={() => setLightbox(null)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                ✖ Close
              </Button>
            </div>
            <div className="p-4 flex justify-center">
              <Image
                height={1000}
                width={1000}
                src={`${apiBase}/File/DownloadFile/download/${images[lightbox].fileId}`}
                alt={images[lightbox].imageName}
                className="max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicturesPage;
