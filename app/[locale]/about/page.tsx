import { Metadata } from "next";
import About from "./about";

// --- METADATA (server component) ---
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Biz haqimizda",
    ru: "О нас",
    en: "About Us",
    ger: "Über uns",
  };

  const locale = (params?.locale || "uz") as "uz" | "ru" | "en" | "ger";

  return {
    title: titles[locale],
  };
}

// --- PAGE KOMPONENT ---
export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return <About />;
}
