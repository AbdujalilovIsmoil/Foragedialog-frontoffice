"use client";

import Link from "next/link";
import { Button } from "@/app/components";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

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
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium py-3 px-6 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            Go Back Home
          </Link>

          <Button
            type="button"
            onClick={() => router.back()}
            className="inline-block w-full bg-white text-teal-600 font-medium py-3 px-6 rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300"
          >
            Go Back
          </Button>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-teal-300 rounded-full opacity-10 animate-bounce"></div>
      </div>
    </div>
  );
};

export default NotFound;
