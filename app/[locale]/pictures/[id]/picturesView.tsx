"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/app/components";
import Link from "next/link";

type Lang = "uz" | "ru" | "en" | "ger";

interface PictureItem {
  fileId: string;
  imageName: string;
  id: number;
}

interface PictureDetail {
  id: number;
  categoryId: number;
  categoryName: Record<Lang, string>;
  imageModels: PictureItem[];
}

const TRANSLATIONS: Record<
  Lang,
  {
    title: string;
    loading: string;
    empty: string;
    back: string;
  }
> = {
  uz: {
    title: "📷 Rasm toifasi",
    loading: "⏳ Yuklanmoqda...",
    empty: "❌ Rasm topilmadi",
    back: "⬅ Orqaga qaytish",
  },
  ru: {
    title: "📷 Категория изображений",
    loading: "⏳ Загрузка...",
    empty: "❌ Нет изображений",
    back: "⬅ Назад",
  },
  en: {
    title: "📷 Picture Category",
    loading: "⏳ Loading...",
    empty: "❌ No images found",
    back: "⬅ Go Back",
  },
  ger: {
    title: "📷 Bildkategorie",
    loading: "⏳ Wird geladen...",
    empty: "❌ Keine Bilder gefunden",
    back: "⬅ Zurück",
  },
};

const PicturesView = () => {
  const apiBase = "https://back.foragedialog.uz";

  const pathName = usePathname();
  const params = useParams();
  const id = params?.id;

  const langFromPath = (pathName?.split("/")[1] ?? "uz") as string;
  const lang: Lang = ["uz", "ru", "en", "ger"].includes(langFromPath)
    ? (langFromPath as Lang)
    : "uz";

  const [data, setData] = useState<PictureDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!id) return;

    const ac = new AbortController();
    let isActive = true; // komponent hali aktivmi?

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/PicturesModel/GetById?id=${id}`, {
          signal: ac.signal,
        });

        if (!res.ok) throw new Error("Serverdan noto‘g‘ri javob");
        const result = await res.json();

        if (isActive) {
          setData(result?.content ?? null);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          // fetch bekor qilindi — e’tibor bermaymiz
          return;
        }
        console.error("Fetch error:", err);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchData();

    // cleanup
    return () => {
      isActive = false;
      if (!ac.signal.aborted) ac.abort();
    };
  }, [id, apiBase]);

  const closeData = {
    uz: "Yopish",
    en: "Close",
    ger: "Schließen",
    ru: "Закрыть",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-teal-600">{t.title}</h1>
          {data && (
            <p className="text-gray-600 mt-1 text-lg">
              {data.categoryName?.[lang] || data.categoryName?.uz}
            </p>
          )}
        </div>
        <Link
          href={`/${lang}/pictures`}
          className="px-4 py-2 rounded-lg text-white bg-teal-600 hover:bg-teal-700"
        >
          {t.back}
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">{t.loading}</p>
      ) : !data ? (
        <p className="text-center text-gray-400 italic">{t.empty}</p>
      ) : data.imageModels?.length === 0 ? (
        <p className="text-center text-gray-400 italic">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.imageModels.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightbox(idx)}
              className="cursor-pointer group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
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
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && data?.imageModels?.[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-sm font-medium">
                {data.imageModels[lightbox].imageName}
              </h3>
              <Button
                type="button"
                onClick={() => setLightbox(null)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                ✖ {closeData[lang]}
              </Button>
            </div>
            <div className="p-4 flex justify-center">
              <Image
                height={1000}
                width={1000}
                src={`${apiBase}/File/DownloadFile/download/${data.imageModels[lightbox].fileId}`}
                alt={data.imageModels[lightbox].imageName}
                className="h-[350px] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicturesView;
