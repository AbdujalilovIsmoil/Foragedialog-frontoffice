import { Metadata } from "next";
import NewsView from "./newsView";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Yangiliklar",
    ru: "Новости",
    en: "News",
    ger: "Nachrichten",
  };

  return {
    title: titles[params.locale],
  };
}

const Blog = () => {
  return <NewsView />;
};

export default Blog;
