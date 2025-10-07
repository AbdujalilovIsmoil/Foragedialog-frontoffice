import { Metadata, ResolvingMetadata } from "next";
import About from "./about";

// --- METADATA (server component) ---
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Biz haqimizda",
    ru: "О нас",
    en: "About Us",
    ger: "Über uns",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

// --- PAGE KOMPONENT ---
export default function AboutPage() {
  return <About />;
}
