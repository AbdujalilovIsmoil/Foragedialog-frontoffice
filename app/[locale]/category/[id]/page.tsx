import { Metadata } from "next";
import CategoryPage from "./category";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Kategoriya",
    ru: "Категория",
    en: "Category",
    ger: "Kategorie",
  };

  return {
    title: titles[params.locale],
  };
}

const Category = () => {
  return <CategoryPage />;
};

export default Category;
