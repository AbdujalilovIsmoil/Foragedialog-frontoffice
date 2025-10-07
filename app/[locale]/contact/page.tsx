import { Metadata, ResolvingMetadata } from "next";
import ContactPage from "./contact";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    uz: "Biz bilan bog‘lanish",
    ru: "Связаться с нами",
    en: "Contact Us",
    ger: "Kontaktieren Sie uns",
  };

  return {
    title: titles[locale] || titles["uz"],
  };
}

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
