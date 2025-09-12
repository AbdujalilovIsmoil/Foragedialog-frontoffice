"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const pathName = usePathname();

  const language = pathName.split("/")[1];

  interface notFoundContentInterface {
    [key: string]: {
      title: string;
      home: string;
      description: string;
    };
  }

  const notFoundContent: notFoundContentInterface = {
    uz: {
      title: "Sahifa topilmadi",
      home: "Bosh sahifaga qaytish",
      description: `
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko‘chirilgan.
        Keling, sizni yo'lga qaytaraylik.
      `,
    },
    ru: {
      home: "Вернуться домой",
      title: "Страница не найдена",
      description: `
        Извините, страница, которую вы ищете, не существует или была перемещена.
        Давайте вернёмся к прежнему.
      `,
    },
    en: {
      home: "Go Back Home",
      title: "Page Not Found",
      description: `
        Sorry, the page you are looking for doesn't exist or has been moved.
        Let's get you back on track.
      `,
    },
    ger: {
      home: "Geh zurück nach Hause",
      title: "Seite nicht gefunden",
      description: `
        Die gesuchte Seite existiert leider nicht oder wurde verschoben.
        Wir helfen Ihnen, wieder auf den richtigen Weg zu kommen.
      `,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {notFoundContent[`${language}`].title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {notFoundContent[`${language}`].description}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium py-3 px-6 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            {notFoundContent[`${language}`].home}
          </Link>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-teal-300 rounded-full opacity-10 animate-bounce"></div>
      </div>
    </div>
  );
};

export default NotFound;
