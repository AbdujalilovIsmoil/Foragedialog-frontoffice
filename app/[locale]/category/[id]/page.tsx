"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// API’dan keladigan blog interfeysi
interface Blog {
  id: number;
  title: Record<string, string>;
  text: Record<string, string>;
  publishedDate: string;
  images: string[];
}

interface Reference {
  id: number;
  categoryId: number;
  blogId: number;
  blog: Blog;
}

const apiBase = "https://back.foragedialog.uz";

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

  const [blogs, setBlogs] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(false);

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
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    return () => controller.abort();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-600 mb-8">
        📚 Category {id}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">⏳ Yuklanmoqda...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          ❌ Maqolalar topilmadi
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
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500">{date}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {stripHtml(text)}
                  </p>
                  <Link
                    href={`/${locale}/blog/${blog.id}`}
                    className="mt-3 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                  >
                    Batafsil →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
