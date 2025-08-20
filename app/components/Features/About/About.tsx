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
            About <span className="text-teal-600">Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a passionate team dedicated to delivering innovative
            solutions that drive business success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Who We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are a dynamic team of innovators, designers, and developers
                committed to transforming businesses through cutting-edge
                technology solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our expertise spans across web development, mobile applications,
                and digital transformation, helping companies achieve their
                goals with precision and creativity.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What We Do
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From concept to deployment, we deliver comprehensive digital
                solutions that enhance user experiences, streamline operations,
                and drive measurable growth for our clients worldwide.
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
                    height={300}
                    alt={`Company image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "1000+", label: "Projects" },
            { number: "50+", label: "Team Members" },
            { number: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
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
