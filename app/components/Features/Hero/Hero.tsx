"use client";

import Image from "next/image";
import { Button } from "@/app/components";
import { useState, useEffect } from "react";
import HeroImage from "@/public/images/png/hero-image.webp";
import HeroBackgroundImage from "@/public/images/png/background-image.avif";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `linear-gradient(135deg, rgba(13, 148, 136, 0.7), rgba(6, 182, 212, 0.7)), url('${HeroBackgroundImage.src}')`,
        }}
      />

      <div className="container">
        <div className="relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`text-white space-y-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                O‘zbekiston
                <span className="block text-cyan-200">
                  Iqlimga chidamli qishloq xo‘jaligi bo‘yicha
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-teal-100 leading-relaxed max-w-lg">
                Germaniya-O‘zbekiston muloqoti. Sut ishlab chiqarishni barqaror
                oshirish uchun yem-xashak yetishtirish va urug‘chilik sohasida
                texnik va institutsional tajribani rag‘batlantirish.
              </p>

              <Button
                type="button"
                className="group bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ko'proq o'qish
                <svg
                  className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

              <div className="relative mt-8">
                <div className="water-waves">
                  <div className="wave wave1"></div>
                  <div className="wave wave2"></div>
                  <div className="wave wave3"></div>
                </div>
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="animate-bounce-slow">
                  <Image
                    height={300}
                    width={300}
                    src={HeroImage.src}
                    unoptimized={true}
                    alt="Hero illustration"
                    className="w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-teal-300 rounded-full opacity-60 animate-pulse delay-1000"></div>

                <div className="absolute top-10 -left-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 animate-float">
                  <div className="w-8 h-8 bg-cyan-400 rounded-full mb-2"></div>
                  <div className="w-16 h-2 bg-white/60 rounded"></div>
                  <div className="w-12 h-2 bg-white/40 rounded mt-1"></div>
                </div>

                <div className="absolute bottom-16 -right-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 animate-float delay-500">
                  <div className="w-8 h-8 bg-teal-400 rounded-full mb-2"></div>
                  <div className="w-16 h-2 bg-white/60 rounded"></div>
                  <div className="w-12 h-2 bg-white/40 rounded mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
