import { Metadata } from "next";
import ResourcesPage from "./recources";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Resurslar",
    ru: "Ресурсы",
    en: "Resources",
    ger: "Ressourcen",
  };

  return {
    title: titles[params.locale],
  };
}

const Resources = () => {
  return <ResourcesPage />;
};

export default Resources;
