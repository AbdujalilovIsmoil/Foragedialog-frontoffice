import { Metadata } from "next";
import PicturesPage from "./pictures";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Rasmlar",
    ru: "Изображения",
    en: "Pictures",
    ger: "Bilder",
  };

  return {
    title: titles[params.locale] || "Bosh sahifa",
  };
}

const Pictures = () => {
  return <PicturesPage />;
};

export default Pictures;