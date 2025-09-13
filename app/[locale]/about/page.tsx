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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {translations.teamTitle[language]}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {translations.teamDesc[language]}
        </p>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 sm:p-12 border border-gray-100">
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
      </section>

      {/* CAROUSEL TEAM MEMBERS */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleMembers().map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform"
              >
                <Image
                  width={256}
                  height={256}
                  unoptimized
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <Button
                    type="button"
                    onClick={() => openModal(member)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {translations.moreInfo[language]}
                  </Button>
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                ‹
              </Button>
              <Button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                ›
              </Button>
            </>
          )}
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {translations.projectTitle[language]}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {translations.projectDesc[language]}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {translations.projectList[language].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {translations.modalTitle[language]}
              </h3>
              <Button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Image
                  height={256}
                  width={250}
                  unoptimized
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedMember.name}
                </h4>
                <p className="text-blue-600 font-medium mb-4">
                  {selectedMember.position}
                </p>
                <p className="text-gray-600 mb-4">{selectedMember.bio}</p>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {translations.experience[language]}:
                  </h5>
                  <p className="text-gray-600">{selectedMember.experience}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {translations.skills[language]}:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
