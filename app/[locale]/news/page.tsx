"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/app/components";
import { useRouter } from "next/navigation";
import NewsImage1 from "@/public/images/png/news-image-1.png";
import NewsImage2 from "@/public/images/png/news-image-2.png";
import NewsImage3 from "@/public/images/png/news-image-3.png";

interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    image: NewsImage1.src,
    title: "Revolutionary AI Technology Transforms Industry Standards",
    description:
      "Discover how cutting-edge artificial intelligence is reshaping business operations and creating new opportunities across multiple sectors. This comprehensive analysis explores the latest developments in machine learning, automation, and their impact on various industries.",
    date: "December 15, 2024",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: NewsImage2.src,
    title: "Global Market Trends Show Unprecedented Growth",
    description:
      "Latest market analysis reveals significant growth patterns that are influencing investment strategies worldwide. Economic indicators suggest a robust recovery with emerging markets leading the charge in innovation and development.",
    date: "December 12, 2024",
    category: "Business",
    readTime: "4 min read",
  },
  {
    id: 3,
    image: NewsImage3.src,
    title: "Startup Innovation Drives Economic Recovery",
    description:
      "Young entrepreneurs are leading the charge in economic recovery with innovative solutions and disruptive technologies. From fintech to healthtech, startups are creating new paradigms for business success.",
    date: "December 10, 2024",
    category: "Innovation",
    readTime: "6 min read",
  },
  {
    id: 4,
    image: NewsImage1.src,
    title: "Digital Transformation Accelerates Across Industries",
    description:
      "Companies worldwide are embracing digital solutions to enhance efficiency and customer experience. Cloud computing, IoT, and data analytics are becoming essential tools for competitive advantage.",
    date: "December 8, 2024",
    category: "Digital",
    readTime: "7 min read",
  },
  {
    id: 5,
    image: NewsImage2.src,
    title: "Sustainable Business Practices Gain Momentum",
    description:
      "Environmental consciousness is driving new business models and sustainable practices across global markets. Companies are finding that green initiatives not only help the planet but also improve profitability.",
    date: "December 5, 2024",
    category: "Sustainability",
    readTime: "5 min read",
  },
  {
    id: 6,
    image: NewsImage3.src,
    title: "Cybersecurity Threats Evolve with New Technologies",
    description:
      "As digital transformation accelerates, cybersecurity challenges become more complex. Organizations must adapt their security strategies to protect against sophisticated threats and ensure data privacy.",
    date: "December 3, 2024",
    category: "Security",
    readTime: "8 min read",
  },
];

const categories = [
  "All",
  "Technology",
  "Business",
  "Innovation",
  "Digital",
  "Sustainability",
  "Security",
];

export default function NewsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = newsData.filter((news) => {
    const matchesCategory =
      selectedCategory === "All" || news.category === selectedCategory;
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsClick = (newsId: number) => {
    console.log(`Navigating to news article ${newsId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
                Latest News & Updates
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg lg:text-xl">
                Stay informed with our comprehensive coverage of industry
                trends, breaking news, and expert insights
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-teal-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredNews.map((news, index) => (
                  <article
                    key={news.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-100"
                    onClick={() => handleNewsClick(news.id)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        width={192}
                        height={192}
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                          {news.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                          {news.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <time className="text-gray-500 text-sm">
                          {news.date}
                        </time>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {news.readTime}
                        </div>
                      </div>

                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                        {news.title}
                      </h2>

                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {news.description}
                      </p>

                      <Button
                        className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                        onClick={() => router.push(`/news/${news.id}`)}
                      >
                        Read Full Article
                        <svg
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
