"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AboutImage1 from "@/public/images/png/about-image-1.png";
import AboutImage2 from "@/public/images/png/about-image-2.png";
import AboutImage3 from "@/public/images/png/about-image-3.png";

const About = () => {
  const [currentImageSet, setCurrentImageSet] = useState(0);

  const allImages = [
    AboutImage1.src,
    AboutImage2.src,
    AboutImage3.src,
    AboutImage3.src,
    AboutImage2.src,
    AboutImage1.src,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 3) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const getCurrentImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      images.push(allImages[(currentImageSet + i) % allImages.length]);
    }
    return images;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O‘zbekistonda{" "}
            <span className="text-teal-600">Qishloq Xo‘jaligi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O‘zbekiston qishloq xo‘jaligida barqaror yem-xashak va sut
            mahsulotlarini yetishtirish orqali oziq-ovqat xavfsizligini
            ta’minlashga qaratilgan loyihamiz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Loyihaning Maqsadi
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Barqaror va tuproqni muhofaza qiluvchi yem-xashak yetishtirishni
                rivojlantirish, kichik va o‘rta fermer xo‘jaliklariga
                agroekologik maslahatlar berish va amaliy sinovlar o‘tkazish.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Loyihaning asosiy yo‘nalishlari: texnik va institutsional
                tajriba almashish, mahalliy sut ishlab chiqarishni ko‘paytirish
                va Germaniya-O‘zbekiston hamkorligini kuchaytirish.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-4">
              {getCurrentImages().map((image, index) => (
                <div
                  key={`${currentImageSet}-${index}`}
                  className="relative h-48 rounded-2xl overflow-hidden shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Image
                    width={300}
                    src={image}
                    unoptimized={true}
                    height={300}
                    alt={`Loyiha tasviri ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
