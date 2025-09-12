"use client";

import { usePathname } from "next/navigation";

const MailIcon = () => (
  <svg
    className="w-7 h-7 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-7 h-7 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    className="w-7 h-7 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

interface contactContentInterface {
  [key: string]: {
    title: string;
    channel: string;
    information: string;
    description: string;
    medias: {
      call: string;
      email: string;
      visit: string;
    };
  };
}

const contactContent: contactContentInterface = {
  uz: {
    title: "Aloqa qiling",
    channel: "Ushbu kanallarning har biri orqali murojaat qiling",
    description: `
      Suhbat boshlashga tayyormisiz? Biz sizning g'oyalaringizni etkazishga yordam berish uchun shu yerdamiz
      shaxsiylashtirilgan echimlar va ajoyib xizmat bilan hayotga.
    `,
    medias: {
      email: "Bizga elektron pochta",
      call: "Bizga qo'ng'iroq qiling",
      visit: "Bizga tashrif buyuring",
    },
    information: "Bog'lanish uchun ma'lumot",
  },
  en: {
    title: "Get in Touch",
    information: "Contact information",
    channel: "Reach out through any of these channels",
    description: `
      Ready to start a conversation? We're here to help bring your ideas
      to life with personalized solutions and exceptional service.
    `,
    medias: {
      call: "Call Us",
      email: "Email Us",
      visit: "Visit Us",
    },
  },
  ru: {
    title: "Свяжитесь с нами",
    information: "Контактная информация",
    channel: "Свяжитесь по любому из этих каналов",
    description: `
      Готовы начать разговор? Мы поможем вам воплотить ваши идеи
      в жизнь, предлагая индивидуальные решения и исключительный сервис.
    `,
    medias: {
      call: "Call Us",
      email: "Email Us",
      visit: "Visit Us",
    },
  },
  ger: {
    title: "Nehmen Sie Kontakt auf",
    information: "Kontakt informationen",
    channel: "Klicken Sie hier, um die gewünschten Kanäle auszuwählen",
    description: `
      Sind Sie bereit für ein Gespräch? Wir helfen Ihnen, Ihre Ideen mit 
      individuellen Lösungen und außergewöhnlichem Service umzusetzen.
    `,
    medias: {
      call: "Rufen Sie uns an",
      visit: "Besuchen Sie uns",
      email: "Schicken Sie uns eine E-Mail",
    },
  },
};

const ContactPage = () => {
  const pathName = usePathname();
  const language = pathName.split("/")[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

        <div className="relative px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl sm:text-7xl font-bold text-foreground font-sans mb-8 tracking-tight leading-tight">
              {contactContent[`${language}`].title}
            </h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
              {contactContent[`${language}`].description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 h-[400px] md:h-full">
              <iframe
                src="https://www.google.com/maps?q=41.302801,69.305848&ll=41.302801,69.305848&z=16&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full border-0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-foreground font-sans mb-3">
                      {contactContent[`${language}`].information}
                    </h3>
                    <p className="text-muted-foreground font-serif text-lg">
                      {contactContent[`${language}`].channel}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-primary/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <MailIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          {contactContent[`${language}`].medias.email}
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          Forage-Info@gopa.eu
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all duration-300 border border-accent/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          {contactContent[`${language}`].medias.call}
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          +998-90-054-43-45
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-primary/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <MapPinIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          {contactContent[`${language}`].medias.visit}
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          33 Mahtumquli Street 2nd Driveway
                        </p>
                        <p className="text-muted-foreground font-serif text-base">
                          Tashkent, Uzbekistan, 100047
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END Contact Info */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
