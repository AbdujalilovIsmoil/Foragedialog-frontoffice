"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ApiTeamMember {
  id: number;
  name: { uz: string; ru?: string; en?: string; ger?: string };
  role: { uz: string; ru?: string; en?: string; ger?: string };
  about: { uz: string; ru?: string; en?: string; ger?: string };
  experience: { uz: string; ru?: string; en?: string; ger?: string };
  skills: { uz: string; ru?: string; en?: string; ger?: string }[];
  picturesId: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  experience: string;
  skills: string[];
  image: string;
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API dan jamoani olish
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("https://back.foragedialog.uz/OurTeam/GetAll");
        const data = await res.json();

        const members: TeamMember[] = data.content.map(
          (member: ApiTeamMember) => ({
            id: member.id,
            name: member.name.uz,
            position: member.role.uz,
            bio: member.about.uz,
            experience: member.experience.uz,
            skills: member.skills.map((s) => s.uz),
            image: `https://back.foragedialog.uz/File/DownloadFile/download?id=${member.picturesId}`,
          })
        );

        setTeamMembers(members);
      } catch (error) {
        console.error("Jamoa ma'lumotlarini olishda xatolik:", error);
      }
    }

    fetchTeam();
  }, []);

  // Carousel avtomatik
  useEffect(() => {
    if (!teamMembers.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [teamMembers]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );

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
    const count = Math.min(3, teamMembers.length); // maksimal 3 yoki mavjud elementlar
    for (let i = 0; i < count; i++) {
      const index = (currentSlide + i) % teamMembers.length;
      visible.push(teamMembers[index]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Jamoa bo'limi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Bizning Jamoa
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tajribali va ishtiyoqli mutaxassislardan iborat jamoamiz har doim eng
          yaxshi natijalarni berish uchun birga ishlaydi.
        </p>
      </section>

      {/* Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleMembers().map((member, visibleIdx) => (
              <div
                key={`${member.id}-${visibleIdx}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  width={256}
                  height={256}
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
                  <button
                    onClick={() => openModal(member)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Batafsil ma’lumot
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Qishloq xo’jaligi bo’limi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            O’zbekistonda Qishloq xo’jaligi
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Oʻzbekiston qishloq xoʻjaligiga mavjud yerlarning keskin tanqisligi,
            tuproq unumdorligining pastligi va suv resurslarining kamayishi
            jiddiy taʼsir koʻrsatmoqda. Dengizga chiqish imkoniga ega bo’lmagan
            mamlakat kelajakda yanada ekstremal ob-havo hodisalariga duch
            kelishi kutilmoqda. Bunday qiyinchiliklarga qaramay, O‘zbekiston
            chorvachilikka e’tibor qaratgan holda oziq-ovqat mahsulotlari ishlab
            chiqarishda o‘zini-o‘zi ta’minlash yo‘lida harakat qilmoqda. Sut
            mahsulotlari O’zbekistonda chorvachilik sanoatining eng muhim kichik
            tarmog’i hisoblanadi, biroq uning mahsuldorligi nisbatan pastligicha
            qolmoqda. Ayni paytda “Dehqon xo‘jaliklari” deb nomlanuvchi kichik
            xo’jaliklar milliy chorva mollarining 92 foizini, sutning 95 foizini
            yetishtirib, ekin maydonlarining 15 foizida dehqonchilik qilmoqda.
          </p>
        </div>
      </section>

      {/* Loyiha bo’limi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Loyiha
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Sut mahsulotlarining hosildorligi ko’p jihatdan to’g’ri
            ovqatlanishga bog’liq, bu esa ozuqa ekinlarini etishtirish va
            saqlash amaliyotining ahamiyatini oshiradi. Lekin ozuqa ekinlari
            urug‘larining asosiy qismi chetdan keltiriladi, chidamli, mahalliy
            navlarni yetishtirish, shuningdek, qoplama ekinlardan foydalanish
            cheklangan. Bundan tashqari, silos yoki pichan kabi yem-xashakni
            saqlash tajribasi keng qo’llanilmaydi. Shuni inobatga olgan holda,
            loyihaning maqsadi barqaror va tuproqni muhofaza qiluvchi yem-xashak
            yetishtirishni ta’minlashdan iborat.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Bunga kichik va o‘rta fermer xo‘jaliklari, shuningdek,
            ilmiy-tadqiqot institutlariga agroekologik tamoyillar asosida
            yem-xashak va g‘alla yetishtirish bo‘yicha maslahatlar berish,
            o‘qitish va amaliy sinovlar o‘tkazish orqali erishiladi. Bundan
            tashqari, barqaror yem-xashak va urug’chilik uchun siyosiy asos
            qaror qabul qiluvchilar bilan muloqot formatlari orqali
            takomillashtiriladi.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-6">
            Loyiha maqsadlari
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Texnik va institutsional tajribani rag’batlantirish</li>
            <li>
              Agroekologik tamoyillar asosida barqaror va iqlimga chidamli
              urug‘lik va yem-xashak yetishtirishni rivojlantirish
            </li>
            <li>Mahalliy sut ishlab chiqarishni ko’paytirish</li>
            <li>
              Germaniya va Oʻzbekistonning xususiy va davlat muassasalari
              oʻrtasida tajriba almashish
            </li>
          </ul>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Jamoa a'zosi haqida
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Image
                  height={256}
                  width={250}
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
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {selectedMember.bio}
                </p>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Tajriba:</h5>
                  <p className="text-gray-600">{selectedMember.experience}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Asosiy ko'nikmalar:
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
}
