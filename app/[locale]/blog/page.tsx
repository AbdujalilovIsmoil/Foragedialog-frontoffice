import { Metadata } from "next";
import BlogPage from "./blog";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Maqolalar",
    ru: "Блог",
    en: "Blog",
    ger: "Blog",
  };

  return {
    title: titles[params.locale],
  };
}

const Blog = () => {
  return <BlogPage />;
};

export default Blog;
