import BlogPage from "./blog";
import { Metadata, ResolvingMetadata } from "next";

// --- METADATA (server component) ---
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Maqolalar",
    ru: "Блог",
    en: "Blog",
    ger: "Blog",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

// --- PAGE KOMPONENT ---
export default function Blog() {
  return <BlogPage />;
}
