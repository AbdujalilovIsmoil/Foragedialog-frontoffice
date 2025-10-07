import NewsPage from "./news";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Yangiliklar",
    ru: "Новости",
    en: "News",
    ger: "Nachrichten",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

const News = () => {
  return <NewsPage />;
};

export default News;
