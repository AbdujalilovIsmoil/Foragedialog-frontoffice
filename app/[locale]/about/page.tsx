"use client";

import { get } from "lodash";
import Image from "next/image";
import { useGet } from "@/app/hooks";
import { Button } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface ApiTeamMember {
  id: number;
  picturesId: string;
  name: { uz: string; ru?: string; en?: string; ger?: string };
  role: { uz: string; ru?: string; en?: string; ger?: string };
  about: { uz: string; ru?: string; en?: string; ger?: string };
  skills: { uz: string; ru?: string; en?: string; ger?: string }[];
  experience: { uz: string; ru?: string; en?: string; ger?: string };
}

interface TeamMember {
  id: number;
  bio: string;
  name: string;
  image: string;
  skills: string[];
  position: string;
  experience: string;
}

const translations = {
  teamTitle: {
    uz: "Bizning Jamoa",
    ru: "Наша команда",
    en: "Our Team",
    ger: "Unser Team",
  },
  teamDesc: {
    uz: "Tajribali va ishtiyoqli mutaxassislardan iborat jamoamiz har doim eng yaxshi natijalarni berish uchun birga ishlaydi.",
    ru: "Наша команда состоит из опытных и целеустремленных специалистов, которые всегда работают вместе для достижения наилучших результатов.",
    en: "Our team of experienced and passionate professionals always works together to achieve the best results.",
    ger: "Unser Team aus erfahrenen und leidenschaftlichen Fachleuten arbeitet stets zusammen, um die besten Ergebnisse zu erzielen.",
  },
  moreInfo: {
    uz: "Batafsil ma’lumot",
    ru: "Подробнее",
    en: "More Info",
    ger: "Mehr Informationen",
  },
  modalTitle: {
    uz: "Jamoa a'zosi haqida",
    ru: "О члене команды",
    en: "About Team Member",
    ger: "Über das Teammitglied",
  },
  experience: {
    uz: "Tajriba",
    ru: "Опыт",
    en: "Experience",
    ger: "Erfahrung",
  },
  skills: {
    uz: "Asosiy ko'nikmalar",
    ru: "Основные навыки",
    en: "Key Skills",
    ger: "Kernkompetenzen",
  },
  agricultureTitle: {
    uz: "O’zbekistonda Qishloq xo’jaligi",
    ru: "Сельское хозяйство в Узбекистане",
    en: "Agriculture in Uzbekistan",
    ger: "Landwirtschaft in Usbekistan",
  },
  agricultureDesc: {
    uz: "Oʻzbekiston qishloq xoʻjaligiga yer tanqisligi, tuproq unumdorligining pastligi va suv resurslarining kamayishi jiddiy taʼsir ko‘rsatmoqda.",
    ru: "На сельское хозяйство Узбекистана серьёзно влияют дефицит земель, низкое плодородие почвы и сокращение водных ресурсов.",
    en: "Uzbekistan's agriculture is affected by land shortages, low soil fertility, and declining water resources.",
    ger: "Die Landwirtschaft Usbekistans wird durch Landknappheit, geringe Bodenfruchtbarkeit und abnehmende Wasserressourcen beeinflusst.",
  },
  projectTitle: {
    uz: "Loyiha",
    ru: "Проект",
    en: "Project",
    ger: "Projekt",
  },
  projectDesc: {
    uz: "Sut mahsulotlarining hosildorligi to‘g‘ri ovqatlantirish va agrotexnik yondashuvlarga bog‘liq.",
    ru: "Продуктивность молочных продуктов во многом зависит от правильного питания и агротехнических подходов.",
    en: "The productivity of dairy products largely depends on proper feeding and agro-technical approaches.",
    ger: "Die Produktivität von Milchprodukten hängt weitgehend von der richtigen Fütterung und agrartechnischen Ansätzen ab.",
  },
  projectList: {
    uz: [
      "Texnik va institutsional tajribani rivojlantirish",
      "Agroekologik tamoyillarga asoslangan barqaror yem-xashak ishlab chiqarish",
      "Mahalliy sut ishlab chiqarishni oshirish",
      "Germaniya va Oʻzbekiston o‘rtasida tajriba almashish",
    ],
    ru: [
      "Развитие технического и институционального опыта",
      "Устойчивое производство кормов на основе агроэкологических принципов",
      "Увеличение местного производства молочных продуктов",
      "Обмен опытом между Германией и Узбекистаном",
    ],
    en: [
      "Develop technical and institutional expertise",
      "Sustainable feed production based on agroecological principles",
      "Increase local dairy production",
      "Knowledge exchange between Germany and Uzbekistan",
    ],
    ger: [
      "Entwicklung technischer und institutioneller Expertise",
      "Nachhaltige Futterproduktion auf agroökologischer Basis",
      "Erhöhung der lokalen Milchproduktion",
      "Erfahrungsaustausch zwischen Deutschland und Usbekistan",
    ],
  },
};

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  const language = (pathName.split("/")[1] || "uz") as
    | "uz"
    | "ru"
    | "en"
    | "ger";

  const { data } = useGet({
    queryKey: "our-team",
    path: "/OurTeam/GetAll",
  });

  const members: TeamMember[] = get(data, "content", []).map(
    (member: ApiTeamMember) => ({
      id: member.id,
      name: member.name[language] ?? "",
      position: member.role[language] ?? "",
      bio: member.about[language] ?? "",
      experience: member.experience[language] ?? "",
      skills: member.skills.map((s) => s[language] ?? ""),
      image: `${process.env.NEXT_PUBLIC_API_URL}/File/DownloadFile/download/${member.picturesId}`,
    })
  );

  useEffect(() => {
    if (!members.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % members.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [members]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % members.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + members.length) % members.length);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const getVisibleMembers = () => {
    const visible: TeamMember[] = [];
    const count = Math.min(3, members.length);
    for (let i = 0; i < count; i++) {
      const index = (currentSlide + i) % members.length;
      visible.push(members[index]);
    }
    return visible;
  };

  const translationsContent = {
    title: {
      uz: "O’zbekistonda Qishloq xo’jaligi",
      ru: "Сельское хозяйство в Узбекистане",
      en: "Agriculture in Uzbekistan",
      ger: "Landwirtschaft in Usbekistan",
    },
    desc1: {
      uz: "Oʻzbekiston qishloq xoʻjaligiga mavjud yerlarning keskin tanqisligi, tuproq unumdorligining pastligi va suv resurslarining kamayishi jiddiy taʼsir koʻrsatmoqda. Dengizga chiqish imkoniga ega bo’lmagan mamlakat kelajakda yanada ekstremal ob-havo hodisalariga duch kelishi kutilmoqda. Bunday qiyinchiliklarga qaramay, O‘zbekiston chorvachilikka e’tibor qaratgan holda oziq-ovqat mahsulotlari ishlab chiqarishda o‘zini-o‘zi ta’minlash yo‘lida harakat qilmoqda.",
      ru: "На сельское хозяйство Узбекистана серьёзно влияют дефицит земель, низкое плодородие почвы и сокращение водных ресурсов. Страна, не имеющая выхода к морю, в будущем, как ожидается, столкнется с ещё более экстремальными погодными явлениями. Несмотря на такие трудности, Узбекистан уделяет внимание животноводству и стремится к самообеспечению продуктами питания.",
      en: "Uzbekistan's agriculture is seriously affected by land shortages, low soil fertility, and declining water resources. As a landlocked country, it is expected to face even more extreme weather events in the future. Despite these challenges, Uzbekistan is focusing on livestock farming and striving for self-sufficiency in food production.",
      ger: "Die Landwirtschaft Usbekistans wird stark durch Landknappheit, geringe Bodenfruchtbarkeit und abnehmende Wasserressourcen beeinträchtigt. Als Binnenstaat wird das Land in Zukunft voraussichtlich mit noch extremeren Wetterereignissen konfrontiert sein. Trotz dieser Herausforderungen konzentriert sich Usbekistan auf die Viehzucht und strebt nach Selbstversorgung mit Nahrungsmitteln.",
    },
    desc2: {
      uz: "Sut mahsulotlari O’zbekistonda chorvachilik sanoatining eng muhim kichik tarmog’i hisoblanadi, biroq uning mahsuldorligi nisbatan pastligicha qolmoqda. Ayni paytda “Dehqon xo‘jaliklari” deb nomlanuvchi kichik xo’jaliklar milliy chorva mollarining 92 foizini, sutning 95 foizini yetishtirib, ekin maydonlarining 15 foizida dehqonchilik qilmoqda.",
      ru: "Молочные продукты считаются важнейшей отраслью животноводства в Узбекистане, однако их производительность остаётся относительно низкой. В настоящее время так называемые «декханские хозяйства» обеспечивают 92% национального поголовья скота, производят 95% молока и обрабатывают 15% посевных площадей.",
      en: "Dairy products are the most important sub-sector of livestock farming in Uzbekistan, but their productivity remains relatively low. Currently, so-called 'dehkan farms' account for 92% of national livestock, produce 95% of milk, and cultivate 15% of crop areas.",
      ger: "Milchprodukte sind der wichtigste Teilsektor der Viehzucht in Usbekistan, aber ihre Produktivität bleibt relativ niedrig. Derzeit stellen die sogenannten „Dehkan-Höfe“ 92% des nationalen Viehbestands, produzieren 95% der Milch und bewirtschaften 15% der Ackerflächen.",
    },
  };

  interface projectContentInterface {
    [key: string]: {
      title: string;
      description: string;
    };
  }

  const projectContent: projectContentInterface = {
    uz: {
      title: "Dastur",
      description: `
        Dastur Sut mahsulotlarining hosildorligi ko’p jihatdan to’g’ri ovqatlanishga bog’liq, bu 
        esa ozuqa ekinlarini etishtirish va saqlash amaliyotining ahamiyatini oshiradi. Lekin ozuqa 
        ekinlari urug‘larining asosiy qismi chetdan keltiriladi, chidamli, mahalliy nav- larni 
        yetishtirish, shuningdek, qoplama ekinlardan foydalanish cheklangan. Bundan tashqari, 
        silos yoki pichan kabi yem-xashakni saqlash tajribaari keng qo’llanilmaydi. Shuni inobatga 
        olgan holda, loyihaning maqsadi barqaror va tuproqni muhofaza qiluvchi yem-xashak 
        yetishtirishni ta’minlashdan iborat. Bunga kichik va o‘rta fermer xo‘jaliklari, shuningdek,
        ilmiy-tadqiqot institutlariga agroekologik tamoyillar asosida yem-xashak va g‘alla 
        yetishtirish bo‘yicha maslahatlar berish, o‘qitish va amaliy sinovlar o‘tkazish orqali 
        erishiladi. Bundan tashqari, barqaror yem-xashak va urug’chilik uchun siyosiy asos qaror 
        qabul qiluvchilar bilan muloqot formatlari orqali takomillashtiriladi.
      `,
    },
    ru: {
      title: "Программа",
      description: `
        Продуктивность молочного скота в значительной степени зависит от правильного питания, 
        что повышает важность методов выращивания и хранения кормовых культур. Однако большинство 
        семян кормовых культур импортируется, а выращивание устойчивых местных сортов, а также 
        использование покровных культур ограничены. Кроме того, методы хранения кормов, такие 
        как силос или сено, не получили широкого распространения. Учитывая это, проект направлен 
        на обеспечение устойчивого и почвосберегающего производства кормов. Это будет достигнуто 
        путем предоставления консультаций, обучения и практических испытаний малым и средним 
        фермерским хозяйствам, а также научно-исследовательским институтам по производству кормов 
        и зерна на основе агроэкологических принципов. Кроме того, политическая основа для 
        устойчивого производства кормов и семян будет улучшена посредством диалога с лицами, 
        принимающими решения.
      `,
    },
    en: {
      title: "Program",
      description: `
        Dairy cattle productivity is highly dependent on proper nutrition, 
        making the management of forage crops important. However, most forage 
        seeds are imported, and the cultivation of resistant local varieties and the use of cover crops 
        are limited. In addition, feed storage methods such as silage or hay are not widely used. 
        With this in mind, the project aims to ensure sustainable and soil-saving feed production.
        This will be achieved by providing advice, training and practical trials to small and medium-sized farms and research institutes for the production of feed and grain based on agro-ecological principles.
        In addition, the policy framework for sustainable feed and seed production will be improved through dialogue with decision makers.
      `,
    },
    ger: {
      title: "Programm",
      description: `
        Die Produktivität von Milchvieh hängt stark von der richtigen Ernährung ab, weshalb der Anbau von Futterpflanzen wichtig ist. Allerdings wird das meiste Futtersaatgut importiert, und der Anbau resistenter lokaler Sorten sowie der Einsatz von Deckfrüchten sind begrenzt. Darüber hinaus sind Futtermittellagerungsmethoden wie Silage oder Heu kaum verbreitet. Vor diesem Hintergrund zielt das Projekt darauf ab, eine nachhaltige und bodenschonende Futtermittelproduktion zu gewährleisten.
        Dies wird durch Beratung, Schulungen und Praxisversuche für kleine und mittlere landwirtschaftliche Betriebe sowie Forschungsinstitute zur agrarökologischen Futter- und Getreideproduktion erreicht. Darüber hinaus werden die politischen Rahmenbedingungen für eine nachhaltige Futter- und Saatgutproduktion durch den Dialog mit Entscheidungsträgern verbessert.
      `,
    },
  };

  const projectResultsContent = {
    uz: {
      title: "Natijalar va erishilgan yutuqlar",
      achievements: [
        "Hamkor institutlarning iqlimga chidamli em-xashak ekinlari sohasidagi tajribasi mustahkamlandi.",
        "Sut tovar xo‘jaliklari o‘z yerlarini iqlimga chidamli texnologiyalar bo‘yicha maslahatlar yordamida boshqarishga o‘tdi.",
        "Resurslarni tejaydigan oziqlantirish tizimlari joriy etildi.",
        "Ekspertiza muassasalarga muloqot platformalari orqali yetkazildi.",
      ],
      quote: {
        text: "Ozuqa turlarini tahlil qilishning samarali tizimini yaratish, almashlab ekishga chidamli yem-xashak ekinlarini tatbiq etish va yem-xashakni tejash mahalliy sut ishlab chiqarishni oshirishning kalitidir.",
        author: "Anton van Engelen, Jamoa rahbari",
      },
      partnersTitle: "Loyiha hamkorlari va hamkorlik",
      partners: [
        "Germaniya tomoni: Federal oziq-ovqat va qishloq xo‘jaligi vazirligi (BMEL)",
        "O‘zbekiston tomoni: Qishloq xo‘jaligi vazirligi (QXV)",
      ],
      collaboratorsTitle: "Loyihaning faoliyat hamkori",
      collaborators: [
        "AKIS (Qishloq xo‘jaligida bilim va innovatsiyalar milliy markazi) tegishli institutlar bilan: Andijon Don, makkajo‘xori va dukkakli ekinlar instituti, Toshkent viloyati ilmiy-tadqiqot stansiyasi, Qashqadaryo viloyati Janubiy qishloq xo‘jaligi instituti.",
        "Veterinariya qo‘mitasi: Toshkent viloyati chorvachilik va parrandachilik instituti, Samarqand davlat veterinariya, chorvachilik va biotexnologiya universiteti.",
      ],
      executorsTitle: "Amalga oshiruvchi tashkilotlar",
      executors: [
        "GOPA AFC GmbH ishchi guruhi",
        "IAK Agrar Consulting GmbH bilan hamkorlikda",
      ],
    },
    ru: {
      title: "Результаты и достижения",
      achievements: [
        "Опыт партнерских институтов в области устойчивых к климату кормовых культур был укреплён.",
        "Молочные хозяйства начали управлять своими землями с помощью консультаций по климатически устойчивым технологиям.",
        "Внедрены ресурсосберегающие системы кормления.",
        "Экспертиза предоставлена учреждениям через коммуникационные платформы.",
      ],
      quote: {
        text: "Создание эффективной системы анализа видов кормов, внедрение устойчивых к севообороту кормовых культур и экономия кормов — это ключ к увеличению местного производства молока.",
        author: "Антон ван Энгелен, Руководитель команды",
      },
      partnersTitle: "Партнеры проекта и сотрудничество",
      partners: [
        "Со стороны Германии: Федеральное министерство продовольствия и сельского хозяйства (BMEL)",
        "Со стороны Узбекистана: Министерство сельского хозяйства (QXV)",
      ],
      collaboratorsTitle: "Рабочие партнеры проекта",
      collaborators: [
        "АКИС (Национальный центр знаний и инноваций в сельском хозяйстве) совместно с соответствующими институтами: Институт зерновых, кукурузы и бобовых культур в Андижане, Научно-исследовательская станция Ташкентской области, Южный сельскохозяйственный институт Кашкадарьинской области.",
        "Ветеринарный комитет: Институт животноводства и птицеводства Ташкентской области, Самаркандский государственный университет ветеринарии, животноводства и биотехнологии.",
      ],
      executorsTitle: "Исполняющие организации",
      executors: [
        "Рабочая группа GOPA AFC GmbH в сотрудничестве с",
        "IAK Agrar Consulting GmbH",
      ],
    },

    en: {
      title: "Results and Achievements",
      achievements: [
        "The experience of partner institutions in the field of climate-resilient forage crops has been strengthened.",
        "Dairy farms began managing their land with the help of advice on climate-resilient technologies.",
        "Resource-saving feeding systems have been introduced.",
        "Expertise has been provided to institutions through communication platforms.",
      ],
      quote: {
        text: "Creating an effective system for analyzing feed types, introducing forage crops resistant to crop rotation, and saving feed is the key to increasing local milk production.",
        author: "Anton van Engelen, Team Leader",
      },
      partnersTitle: "Project Partners and Cooperation",
      partners: [
        "German side: Federal Ministry of Food and Agriculture (BMEL)",
        "Uzbek side: Ministry of Agriculture (QXV)",
      ],
      collaboratorsTitle: "Project Implementing Partners",
      collaborators: [
        "AKIS (National Center for Knowledge and Innovation in Agriculture) together with relevant institutes: Andijan Institute of Grain, Maize and Legumes, Tashkent Region Research Station, Kashkadarya Region Southern Agricultural Institute.",
        "Veterinary Committee: Tashkent Region Institute of Animal Husbandry and Poultry Farming, Samarkand State University of Veterinary Medicine, Animal Husbandry and Biotechnology.",
      ],
      executorsTitle: "Implementing Organizations",
      executors: [
        "GOPA AFC GmbH working group in cooperation with",
        "IAK Agrar Consulting GmbH",
      ],
    },

    ger: {
      title: "Ergebnisse und Erreichte Fortschritte",
      achievements: [
        "Die Erfahrung der Partnerinstitutionen im Bereich klimaresistenter Futterpflanzen wurde gestärkt.",
        "Milchviehbetriebe begannen, ihre Flächen mithilfe von Beratung zu klimaresistenten Technologien zu bewirtschaften.",
        "Ressourcensparende Fütterungssysteme wurden eingeführt.",
        "Expertise wurde über Kommunikationsplattformen an Institutionen vermittelt.",
      ],
      quote: {
        text: "Die Schaffung eines effektiven Systems zur Analyse von Futtermitteln, die Einführung von Fruchtwechsel-resistenten Futterpflanzen und die Einsparung von Futter sind der Schlüssel zur Steigerung der lokalen Milchproduktion.",
        author: "Anton van Engelen, Teamleiter",
      },
      partnersTitle: "Projektpartner und Zusammenarbeit",
      partners: [
        "Deutsche Seite: Bundesministerium für Ernährung und Landwirtschaft (BMEL)",
        "Usbekische Seite: Ministerium für Landwirtschaft (QXV)",
      ],
      collaboratorsTitle: "Projektumsetzende Partner",
      collaborators: [
        "AKIS (Nationales Zentrum für Wissen und Innovation in der Landwirtschaft) gemeinsam mit relevanten Instituten: Andijan Institut für Getreide, Mais und Hülsenfrüchte, Forschungsstation der Region Taschkent, Landwirtschaftsinstitut der Region Qashqadarya.",
        "Veterinärausschuss: Institut für Viehzucht und Geflügelzucht der Region Taschkent, Staatliche Universität Samarkand für Veterinärmedizin, Tierhaltung und Biotechnologie.",
      ],
      executorsTitle: "Durchführende Organisationen",
      executors: [
        "Arbeitsgruppe von GOPA AFC GmbH in Zusammenarbeit mit",
        "IAK Agrar Consulting GmbH",
      ],
    },
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {translations.teamTitle[language]}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {translations.teamDesc[language]}
        </p>
      </section>

      <section className="pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 sm:p-12 border border-gray-100 mb-[50px]">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 text-center">
            {translationsContent.title[language]}
          </h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-lg space-y-4">
            {translationsContent.desc1[language]}
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            {translationsContent.desc2[language]}
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 sm:p-12 border border-gray-100">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 text-center">
            {projectContent[`${language}`].title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-lg space-y-4">
            {projectContent[`${language}`].description}
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 sm:p-12 border border-gray-100 mt-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 text-center">
            {projectResultsContent[language].title}
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            {projectResultsContent[language].achievements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <blockquote className="italic text-gray-600 mb-6">
            “{projectResultsContent[language].quote.text}”
            <br />
            <span className="font-semibold">
              — {projectResultsContent[language].quote.author}
            </span>
          </blockquote>

          <h3 className="text-2xl font-bold text-green-700 mb-4">
            {projectResultsContent[language].partnersTitle}
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            {projectResultsContent[language].partners.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-green-700 mb-4">
            {projectResultsContent[language].collaboratorsTitle}
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            {projectResultsContent[language].collaborators.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-green-700 mb-4">
            {projectResultsContent[language].executorsTitle}
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {projectResultsContent[language].executors.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="max-w-4xl mx-auto shadow-xl rounded-2xl py-16 px-4 sm:px-6 lg:px-8 bg-white border border-gray-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 text-center">
          {translations.projectTitle[language]}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-[15px]">
          {translations.projectDesc[language]}
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {translations.projectList[language].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* CAROUSEL TEAM MEMBERS */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {getVisibleMembers().map((member) => (
              <div
                key={member.id}
                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform h-full"
              >
                <Image
                  width={256}
                  height={256}
                  unoptimized
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="flex flex-col flex-1 p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="mt-auto">
                    <Button
                      type="button"
                      onClick={() => openModal(member)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {translations.moreInfo[language]}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SLIDE CONTROLS */}
          {members.length > 3 && (
            <>
              <Button
                type="button"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 text-3xl"
              >
                ‹
              </Button>
              <Button
                type="button"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 text-3xl"
              >
                ›
              </Button>
            </>
          )}
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {translations.modalTitle[language]}
              </h3>
              <Button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ✕
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Image */}
              <div className="md:w-1/2">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-xl border bg-gray-100">
                  <Image
                    height={500}
                    width={400}
                    unoptimized
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: Info */}
              <div className="md:w-1/2 flex flex-col">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedMember.name}
                </h4>
                <p className="font-medium text-teal-600 mb-4">
                  {selectedMember.position}
                </p>
                <p className="text-gray-600 mb-4">{selectedMember.bio}</p>

                {/* Experience */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {translations.experience[language]}:
                  </h5>
                  <p className="text-gray-600">{selectedMember.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
