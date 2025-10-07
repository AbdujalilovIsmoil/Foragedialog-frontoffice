import { Metadata } from "next";
import NewsPage from "./news";

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
    title: titles[params.locale] || "Bosh sahifa",
  };
}

const News = () => {
  return <NewsPage />;
};

export default News;
