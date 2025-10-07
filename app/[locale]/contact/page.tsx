import { Metadata } from "next";
import ContactPage from "./contact";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    uz: "Biz bilan bog‘lanish",
    ru: "Связаться с нами",
    en: "Contact Us",
    ger: "Kontaktieren Sie uns",
  };

  return {
    title: titles[params.locale] || "Bosh sahifa",
  };
}

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
