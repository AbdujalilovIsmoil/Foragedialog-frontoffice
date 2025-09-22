"use client";

import Image from "next/image";
import { Button } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeroImage from "@/public/images/png/hero-image.webp";
import HeroBackgroundImage from "@/public/images/png/background-image.avif";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  const language = pathName.split("/")[1];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  interface heroContentInterface {
    [key: string]: {
      more: string;
      title: string;
      description: string;
    };
  }

  const heroContents: heroContentInterface = {
    uz: {
      title:
        "Iqlimga chidamli qishloq xo‘jaligi bo‘yicha Germaniya-O‘zbekiston ekspertlar muloqot dasturi",
      description: `
          Germaniya-O‘zbekiston ekspertlar muloqoti dasturi iqlimga chidamli
          qishloq xo‘jaligini rivojlantirishga qaratilgan. Dasturda asosan
          sutchilik sohasining samaradorligini oshirish uchun yem-xashak va
          urug‘ yetishtirishga alohida e’tibor qaratiladi. Biz kichik va
          o‘rta fermer xo‘jaliklari hamda ilmiy-tadqiqot institutlarini
          maslahatlar berish, treninglar tashkil etish va amaliy sinovlar
          o‘tkazish orqali qo‘llab-quvvatlaymiz. Bundan tashqari, manfaatdor
          tomonlar bilan muloqot orqali barqaror rivojlanish uchun qulay
          siyosiy sharoitlar yaratishga yordam beramiz. 
      `,
      more: "Ko'proq o‘qish",
    },
    ru: {
      title:
        "Программа германо-узбекского экспертного диалога по климатически устойчивому сельскому хозяйству",
      description: `
        Программа германо-узбекского экспертного диалога по
        климатоустойчивому сельскому хозяйству направлена на развитие
        устойчивого и адаптированного к климату сельского хозяйства.
        Основное внимание уделяется производству кормов и семян для
        повышения продуктивности молочного сектора. Мы поддерживаем малые
        и средние фермы, а также научно-исследовательские институты,
        предоставляя консультации, организуя тренинги и проводя
        практические испытания. Кроме того, через диалог с
        заинтересованными сторонами мы способствуем созданию благоприятных
        политических рамок для устойчивого развития.
      `,
      more: "Читать далее",
    },
    en: {
      title:
        "German-Uzbek expert dialogue programme on climate-resilient agriculture",
      description: `
        German-Uzbek expert dialogue programme on climate-resilient
        agriculture focuses on developing sustainable and
        climate-resilient agriculture. The key emphasis is on fodder and
        seed production to enhance the productivity of the dairy sector.
        We support small and medium-sized farms as well as research
        institutes by providing consultancy, organizing training sessions,
        and conducting practical trials. Additionally, through dialogue
        with stakeholders, we help establish favorable policy frameworks
        for sustainable development.
      `,
      more: "Read more",
    },
    ger: {
      title:
        "Deutsch-usbekisches Fachdialogprogramm zu klimaresilienter Landwirtschaft",
      description: `
        Das deutsch-usbekische Expertendialogprogramm für klimaresiliente
        Landwirtschaft konzentriert sich auf die Entwicklung einer
        nachhaltigen und klimaresilienten Landwirtschaft. Ein besonderer
        Schwerpunkt liegt auf der Futter- und Saatgutproduktion, um die
        Produktivität des Milchsektors zu steigern. Wir unterstützen
        kleine und mittlere landwirtschaftliche Betriebe sowie
        Forschungsinstitute durch Beratung, die Organisation von
        Schulungen und die Durchführung praktischer Versuche. Darüber
        hinaus helfen wir durch den Dialog mit Interessengruppen, günstige
        politische Rahmenbedingungen für eine nachhaltige Entwicklung zu
        schaffen.
        `,
      more: "Mehr lesen",
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden py-[75px] md:py-0">
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,148,136,0.7), rgba(6,182,212,0.7)), url('${HeroBackgroundImage.src}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl text-center font-extrabold leading-tight text-white mb-16">
          {heroContents[`${language}`]?.title}
        </h1>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div
            className={`text-white space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <p className="text-lg lg:text-xl text-white leading-relaxed max-w-[800px] mx-auto lg:mx-0">
              {heroContents[`${language}`]?.description}
            </p>

            <Button
              type="button"
              className="group bg-white text-teal-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {heroContents[`${language}`]?.more}
              <svg
                className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>

          {/* Right Side - Image */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 flex justify-center ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative max-w-sm sm:max-w-md md:max-w-lg">
              <div className="animate-bounce-slow">
                <Image
                  width={500}
                  height={500}
                  unoptimized
                  src={HeroImage.src}
                  alt="Hero illustration"
                  className="w-full h-auto max-h-[500px] rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Waves + Floating Particles */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <div className="relative">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute w-full h-20 fill-white/20 animate-wave-1"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>

          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute w-full h-18 fill-white/40 animate-wave-2"
          >
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"></path>
          </svg>

          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute w-full h-16 fill-white/60 animate-wave-3"
          >
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>

          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative w-full h-16 fill-white animate-wave-main"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-particle-1"></div>
            <div className="absolute top-8 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full animate-float-particle-2"></div>
            <div className="absolute top-6 right-1/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-float-particle-3"></div>
            <div className="absolute top-10 right-1/4 w-1 h-1 bg-white/50 rounded-full animate-float-particle-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
