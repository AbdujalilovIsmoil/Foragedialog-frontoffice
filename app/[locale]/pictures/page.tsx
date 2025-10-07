import { Metadata, ResolvingMetadata } from "next";
import PicturesPage from "./pictures";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Rasmlar",
    ru: "Изображения",
    en: "Pictures",
    ger: "Bilder",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

const Pictures = () => {
  return <PicturesPage />;
};

export default Pictures;
