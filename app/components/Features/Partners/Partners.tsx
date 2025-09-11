"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components";
import Image from "next/image";

interface PartnerItem {
  id: number;
  name: string;
  about: string;
  link: string;
  image: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [_, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(
          "https://back.foragedialog.uz/OurPartners/GetAll"
        );
        const data = await res.json();

        if (data.code === 200 && data.content) {
          const mapped: PartnerItem[] = data.content.map((item: any) => {
            console.log(item);
            return {
              id: item.id,
              name: item.name.uz || "No name",
              about: item.about.uz || "No description",
              link: item.link || "#",
              image: `https://back.foragedialog.uz/File/DownloadFile/download?id=${item.picturesId}`,
            };
          });
          setPartners(mapped);
        }
      } catch (error) {
        console.error("Partnerlarni olishda xato:", error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-sky-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bizning Hamkorlar
          </h2>
          <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Raqamli dunyodagi mavjudligingizni oshiradigan xizmatlarimizni kashf
            eting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => {
            return (
              <a
                target="_blank"
                key={partner.id}
                href={partner.link}
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={() => setHoveredId(partner.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 transform hover:scale-105 hover:-translate-y-2 h-full group-hover:bg-white/90 partner-card-animate">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-500 partner-logo-animate">
                      <Image
                        width={80}
                        height={80}
                        unoptimized={true}
                        src={`${partner.image}`}
                        alt={`${partner.name} logo`}
                        className="w-12 h-12 object-contain transform group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                      {partner.about}
                    </p>

                    <div className="inline-flex items-center space-x-2 text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      <span className="text-sm font-medium">Saytga O‘tish</span>
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 transform group-hover:translate-x-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-sky-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-sky-400/5 group-hover:to-blue-400/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium">
            <span>Batafsil</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
