"use client";

import React from "react";
import { get } from "lodash";
import Image from "next/image";
import { useGet } from "@/app/hooks";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

interface PartnerItem {
  id: number;
  name: string;
  link: string;
  about: string;
  image: string;
}

const partnersContent: Record<string, { title: string; description: string }> =
  {
    uz: {
      title: "Bizning Hamkorlar",
      description: `Raqamli dunyodagi mavjudligingizni oshiradigan xizmatlarimizni kashf eting`,
    },
    ru: {
      title: "Наши партнеры",
      description: `Откройте для себя наши услуги, которые укрепят ваше присутствие в цифровом мире.`,
    },
    en: {
      title: "Our Partners",
      description: `Discover our services that will enhance your presence in the digital world`,
    },
    ger: {
      title: "Unsere Partner",
      description: `Entdecken Sie unsere Dienstleistungen, die Ihre Präsenz in der digitalen Welt verbessern`,
    },
  };

export default function PartnersCarousel() {
  const pathname = usePathname();
  const language = (pathname?.split("/")[1] || "uz") as string;

  const { data } = useGet({
    queryKey: "our-partners",
    path: "/OurPartners/GetAll",
  });

  const mapped: PartnerItem[] = (get(data, "content", []) || []).map(
    (item: any) => {
      const rawName = item.name || {};
      const rawAbout = item.about || {};
      return {
        id: item.id,
        name: String(
          rawName[language] || rawName["uz"] || rawName || "No name"
        ),
        about: String(rawAbout[language] || rawAbout["uz"] || rawAbout || ""),
        link: item.link || "#",
        image: `${process.env.NEXT_PUBLIC_API_URL}/File/DownloadFile/download/${item.picturesId}`,
      };
    }
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {partnersContent[language]?.title || partnersContent.uz.title}
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto rounded-full mb-5"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {partnersContent[language]?.description ||
              partnersContent.uz.description}
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={28}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {mapped.length === 0 && (
            <SwiperSlide>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <p className="text-gray-500">No partners found</p>
              </div>
            </SwiperSlide>
          )}

          {mapped.map((partner) => (
            <SwiperSlide key={partner.id}>
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article className="h-full bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                  <div className="w-[140px] rounded-xl py-1 bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center overflow-hidden shadow-inner">
                    <Image
                      width={140}
                      height={140}
                      unoptimized
                      alt={partner.name}
                      src={partner.image}
                      className="object-contain w-full h-[140px] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </article>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
