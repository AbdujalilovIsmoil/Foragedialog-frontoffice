import { Metadata, ResolvingMetadata } from "next";
import { Blog, Hero, News, Partners, Categories } from "@/app/components";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }, // ✅ params endi Promise
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params; // ✅ Promise dan destructure qilamiz

  const titles: Record<string, string> = {
    uz: "Iqlimga chidamli qishloq xo‘jaligi bo‘yicha Germaniya-O‘zbekiston ekspertlar muloqot dasturi",
    ru: "Программа германо-узбекского экспертного диалога по климатически устойчивому сельскому хозяйству",
    en: "German-Uzbek expert dialogue programme on climate-resilient agriculture",
    ger: "Deutsch-usbekisches Fachdialogprogramm zu klimaresilienter Landwirtschaft",
  };

  const descriptions: Record<string, string> = {
    uz: "Forage Dialog — Germaniya va O‘zbekiston mutaxassislari o‘rtasidagi iqlimga chidamli qishloq xo‘jaligi bo‘yicha hamkorlik platformasi.",
    ru: "Forage Dialog — платформа сотрудничества между экспертами Германии и Узбекистана по климатически устойчивому сельскому хозяйству.",
    en: "Forage Dialog — a German-Uzbek collaboration platform on climate-resilient agriculture.",
    ger: "Forage Dialog — eine deutsch-usbekische Kooperationsplattform für klimaresiliente Landwirtschaft.",
  };

  const lang = (locale || "uz") as "uz" | "ru" | "en" | "ger";

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `https://foragedialog.uz/${lang}`,
      siteName: "Forage Dialog",
      images: [
        {
          url: "https://foragedialog.uz/og-image.jpg",
          width: 1200,
          height: 630,
          alt: titles[lang],
        },
      ],
      locale: lang === "ger" ? "de" : lang, // ✅ SEO uchun to‘g‘ri locale
      type: "website",
    },
    alternates: {
      canonical: `https://foragedialog.uz/${lang}`,
      languages: {
        uz: "https://foragedialog.uz/uz",
        ru: "https://foragedialog.uz/ru",
        en: "https://foragedialog.uz/en",
        de: "https://foragedialog.uz/ger", // ✅ ger → de (Google SEO uchun)
      },
    },
  };
}

const App = () => {
  return (
    <>
      <Hero />
      <Categories />
      <News />
      <Blog />
      <Partners />
    </>
  );
};

export default App;
