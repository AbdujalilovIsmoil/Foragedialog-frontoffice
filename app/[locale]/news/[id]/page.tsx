import { Metadata, ResolvingMetadata } from "next";
import NewsView from "./newsView";

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

const Blog = () => {
  return <NewsView />;
};

export default Blog;
