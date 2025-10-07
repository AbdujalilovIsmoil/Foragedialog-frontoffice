import { Metadata, ResolvingMetadata } from "next";
import PicturesViewPage from "./picturesView";

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

const PicturesView = () => {
  return <PicturesViewPage />;
};

export default PicturesView;
