import { Metadata, ResolvingMetadata } from "next";
import CategoryPage from "./category";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Kategoriya",
    ru: "Категория",
    en: "Category",
    ger: "Kategorie",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

const Category = () => {
  return <CategoryPage />;
};

export default Category;
