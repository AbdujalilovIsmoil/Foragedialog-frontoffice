import { Metadata } from "next";
import AboutPage from "./about";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Biz haqimizda",
    ru: "О нас",
    en: "About Us",
    ger: "Über uns",
  };

  return {
    title: titles[params.locale] || "Bosh sahifa",
  };
}

const About = () => {
  return <AboutPage />;
};

export default About;
