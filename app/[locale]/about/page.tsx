"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AboutTeamImage1 from "@/public/images/png/team-image-1.png";
import AboutTeamImage2 from "@/public/images/png/team-image-2.png";
import AboutTeamImage3 from "@/public/images/png/team-image-3.png";
import AboutImageTeam from "@/public/images/png/about-image-team.png";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  experience: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alisher Karimov",
    position: "Bosh direktor",
    image: AboutTeamImage2.src,
    bio: "10 yildan ortiq tajribaga ega bo'lgan texnologiya sohasidagi yetakchi mutaxassis. Kompaniyani muvaffaqiyatli rivojlantirishda katta hissa qo'shgan.",
    experience: "10+ yil",
    skills: [
      "Strategik rejalashtirish",
      "Biznes rivojlantirish",
      "Jamoa boshqaruvi",
    ],
  },
  {
    id: 2,
    name: "Malika Toshmatova",
    position: "Texnik direktor",
    image: AboutTeamImage1.src,
    bio: "Dasturiy ta'minot ishlab chiqish va texnik yechimlar bo'yicha ekspert. Zamonaviy texnologiyalarni qo'llashda katta tajribaga ega.",
    experience: "8+ yil",
    skills: ["Full-stack dasturlash", "Arxitektura dizayni", "DevOps"],
  },
  {
    id: 3,
    name: "Bobur Rahimov",
    position: "Dizayn rahbari",
    image: AboutTeamImage2.src,
    bio: "Kreativ dizayn va foydalanuvchi tajribasi bo'yicha mutaxassis. Zamonaviy va foydalanuvchi-do'st interfeyslari yaratishda mohir.",
    experience: "6+ yil",
    skills: ["UI/UX Dizayn", "Brending", "Grafik dizayn"],
  },
  {
    id: 4,
    name: "Nilufar Abdullayeva",
    position: "Marketing rahbari",
    image: AboutTeamImage3.src,
    bio: "Raqamli marketing va brendni rivojlantirish bo'yicha ekspert. Muvaffaqiyatli marketing kampaniyalarini boshqargan.",
    experience: "7+ yil",
    skills: ["Raqamli marketing", "SMM", "Kontent strategiya"],
  },
  {
    id: 5,
    name: "Sardor Yusupov",
    position: "Mahsulot menejeri",
    image: AboutTeamImage2.src,
    bio: "Mahsulot rivojlantirish va loyiha boshqaruvi bo'yicha tajribali mutaxassis. Mijozlar ehtiyojlarini chuqur tushunadi.",
    experience: "5+ yil",
    skills: [
      "Mahsulot strategiyasi",
      "Agile metodologiya",
      "Mijozlar bilan ishlash",
    ],
  },
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const getVisibleMembers = () => {
    const members = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % teamMembers.length;
      members.push(teamMembers[index]);
    }
    return members;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Biz Haqimizda
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bizning kompaniya 2015-yilda tashkil etilgan bo'lib, zamonaviy
            texnologiyalar va innovatsion yechimlar orqali mijozlarimizga eng
            yaxshi xizmatlarni taqdim etishga ixtisoslashgan. Biz har doim sifat
            va mijozlar ehtiyojlarini birinchi o'ringa qo'yamiz.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Bizning Missiyamiz
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Biz texnologiya orqali odamlarning hayotini yaxshilashga va
                bizneslarni raqamli transformatsiya yo'lida qo'llab-quvvatlashga
                intilamiz. Har bir loyihada innovatsiya va sifatni birlashtirib,
                mijozlarimizga eng yaxshi natijalarni taqdim etamiz.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">150+</div>
                  <div className="text-gray-600">Muvaffaqiyatli loyihalar</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-600">Xursand mijozlar</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={AboutImageTeam}
                alt="Bizning jamoa"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning Jamoa
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tajribali va ishtiyoqli mutaxassislardan iborat jamoamiz har doim
              eng yaxshi natijalarni berish uchun birga ishlaydi.
            </p>
          </div>

          {/* Team Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {getVisibleMembers().map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <Image
                        width={256}
                        height={256}
                        src={member.image || "/placeholder.svg"}
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
                          Batafsil ma'lumot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
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

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning Qadriyatlarimiz
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Sifat
              </h4>
              <p className="text-gray-600">
                Har bir loyihada eng yuqori sifat standartlarini qo'llaymiz
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Innovatsiya
              </h4>
              <p className="text-gray-600">
                Zamonaviy texnologiyalar va kreativ yechimlarni qo'llaymiz
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Hamkorlik
              </h4>
              <p className="text-gray-600">
                Mijozlarimiz bilan uzoq muddatli hamkorlik o'rnatamiz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
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
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    className="w-[100%] md:w-[300px] h-[100%] object-cover rounded-lg"
                  />
                </div>
                <div className="w-2/3">
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
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Tajriba:
                    </h5>
                    <p className="text-gray-600">{selectedMember.experience}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Asosiy ko'nikmalar:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <span
                          key={index}
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
        </div>
      )}
    </div>
  );
}
