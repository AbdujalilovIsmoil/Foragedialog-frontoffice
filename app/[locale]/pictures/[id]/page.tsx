import { Metadata } from "next";
import PicturesViewPage from "./picturesView";

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

const PicturesView = () => {
  return <PicturesViewPage />;
};

export default PicturesView;
