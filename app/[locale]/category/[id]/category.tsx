"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useGet } from "@/app/hooks";

const apiBase = "https://back.foragedialog.uz";

// ==== Interfaces ====
interface Blog {
  id: number;
  title: Record<string, string>;
  text: Record<string, string>;
  publishedDate: string;
  images: string[];
}

interface ReferenceBlog {
  id: number;
  categoryId: number;
  blogId: number;
  blog: Blog;
}

interface PictureModel {
  id: number;
  categoryId: number;
  categoryName: Record<string, string>;
  imagesIds: number[];
}

interface ReferencePicture {
  id: number;
  categoryId: number;
  picturesId: number;
  pictures: PictureModel;
  downloadLinks: string[];
}

// ==== Helper ====
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").slice(0, 180) + "...";
}

const CategoryPage: React.FC = () => {
  const params = useParams();
  const pathName = usePathname();
  const id = params?.id as string;
  const locale = (pathName?.split("/")[1] ?? "uz") as
    | "uz"
    | "ru"
    | "en"
    | "ger";

  const [blogs, setBlogs] = useState<ReferenceBlog[]>([]);
  const [pictures, setPictures] = useState<ReferencePicture[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: ourCategory } = useGet({
    queryKey: "our-category",
    path: `/OurCategory/GetById?id=${id}`,
  });

  // ====== Fetch BLOGS ======
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiBase}/ReferenceToBlog/GetReferencesByCategoryIds?id=${id}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setBlogs(data?.content ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    return () => controller.abort();
  }, [id]);

  // ====== Fetch PICTURES ======
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchPictures = async () => {
      try {
        const res = await fetch(
          `${apiBase}/ReferenceToPictures/GetReferencesByCategoryIds?id=${id}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setPictures(data?.content ?? []);
      } catch (err) {
        console.error("❌ Error fetching pictures:", err);
      }
    };

    fetchPictures();
    return () => controller.abort();
  }, [id]);

  // === Find pictures by category ===
  const categoryPictures = pictures?.[0]?.downloadLinks || [];

  const readMore = {
    uz: "Batafsil o'qish",
    en: "Read more",
    ger: "Mehr lesen",
    ru: "Читать далее",
  };

  const emptyArticle = {
    uz: "Maqolalar topilmadi",
    en: "No articles found",
    ger: "Keine Artikel gefunden",
    ru: "Статьи не найдены",
  };

  const loadingData = {
    uz: "Yuklanmoqda",
    en: "Loading",
    ger: "Wird geladen",
    ru: "Загрузка",
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-teal-600 mb-8">
        📚{" "}
        {ourCategory?.content?.name?.[locale] ||
          ourCategory?.content?.name?.uz ||
          ""}
      </h1>

      {/* Blogs */}
      {loading ? (
        <p className="text-center text-gray-500">⏳ {loadingData[locale]}...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          ❌ {emptyArticle[locale]}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => {
            const blog = item.blog;
            const title = blog.title[locale] || blog.title["uz"];
            const text = blog.text[locale] || blog.text["uz"];
            const date = new Date(blog.publishedDate).toLocaleDateString(
              locale
            );
            const imageUrl = blog.images.length
              ? `${apiBase}/File/DownloadFile/download/${blog.images[0]}`
              : "/no-image.jpg";

            return (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Blog Info */}
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold line-clamp-2 text-gray-800">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500">{date}</p>
                  {/* <p className="text-gray-600 text-sm line-clamp-3">
                    {stripHtml(text)}
                  </p> */}
                  <Link
                    href={`/${locale}/blog/${blog.id}`}
                    className="mt-3 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                  >
                    {readMore[locale]} →
                  </Link>
                </div>

                {/* Pictures Swiper (rasmlar shu yerda) */}
                {categoryPictures.length > 0 && (
                  <div className="mt-4 border-t border-gray-100">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop
                      className="h-56"
                    >
                      {categoryPictures.map((link, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="relative w-full h-56">
                            <Image
                              src={link}
                              alt={`category-img-${idx}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
