import { Metadata, ResolvingMetadata } from "next";
import ResourcesPage from "./recources";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Resurslar",
    ru: "Ресурсы",
    en: "Resources",
    ger: "Ressourcen",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

const Resources = () => {
  return <ResourcesPage />;
};

export default Resources;
