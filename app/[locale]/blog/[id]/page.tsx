"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/app/components";
import { useParams, useRouter } from "next/navigation";

interface NewsArticle {
  id: number;
  image: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
  replies: Reply[];
}

interface Reply {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image: "/ai-modern-tech.png",
    title: "Revolutionary AI Technology Transforms Industry Standards",
    description:
      "Discover how cutting-edge artificial intelligence is reshaping business operations and creating new opportunities across multiple sectors.",
    content: `
      <h2>The Dawn of a New Era</h2>
      <p>Artificial Intelligence has reached a pivotal moment in its evolution, fundamentally transforming how businesses operate across various industries. From healthcare to finance, manufacturing to retail, AI technologies are creating unprecedented opportunities for innovation and growth.</p>
      
      <h3>Key Industry Transformations</h3>
      <ul>
        <li><strong>Healthcare:</strong> AI-powered diagnostic tools are improving accuracy and reducing diagnosis time by up to 40%</li>
        <li><strong>Finance:</strong> Machine learning algorithms are detecting fraud with 95% accuracy, saving billions annually</li>
        <li><strong>Manufacturing:</strong> Predictive maintenance systems are reducing downtime by 30-50%</li>
        <li><strong>Retail:</strong> Personalized recommendation engines are increasing sales conversion by 25%</li>
      </ul>
      
      <blockquote>
        <p>"AI is not just a technology trend; it's a fundamental shift in how we approach problem-solving and decision-making in business." - Dr. Sarah Chen, AI Research Director</p>
      </blockquote>
      
      <h3>The Road Ahead</h3>
      <p>As we look toward the future, the integration of AI technologies will continue to accelerate. Companies that embrace these changes early will gain significant competitive advantages, while those that resist may find themselves left behind in an increasingly digital world.</p>
      
      <p>The next five years will be crucial for businesses to adapt their strategies, invest in AI capabilities, and prepare their workforce for this technological revolution.</p>
    `,
    date: "December 15, 2024",
    category: "Technology",
    readTime: "5 min read",
    author: "John Smith",
    tags: ["AI", "Technology", "Innovation", "Business"],
  },
  {
    id: 2,
    image: "/global-market-trends.png",
    title: "Global Market Trends Show Unprecedented Growth",
    description:
      "Latest market analysis reveals significant growth patterns that are influencing investment strategies worldwide.",
    content: `
      <h2>Market Analysis Overview</h2>
      <p>The global economy is experiencing a remarkable period of growth, with emerging markets leading the charge in innovation and development. Recent data shows unprecedented expansion across multiple sectors.</p>
      
      <h3>Growth Indicators</h3>
      <p>Key performance indicators demonstrate robust economic health:</p>
      <ul>
        <li>GDP growth rates exceeding expectations in 75% of monitored markets</li>
        <li>Technology sector showing 40% year-over-year growth</li>
        <li>Sustainable energy investments up 60% globally</li>
      </ul>
      
      <h3>Investment Opportunities</h3>
      <p>Smart investors are positioning themselves in high-growth sectors including renewable energy, biotechnology, and digital infrastructure. These sectors are expected to continue their upward trajectory through 2025.</p>
    `,
    date: "December 12, 2024",
    category: "Business",
    readTime: "4 min read",
    author: "Maria Rodriguez",
    tags: ["Business", "Markets", "Investment", "Growth"],
  },
  {
    id: 3,
    image: "/startup-innovation-office.png",
    title: "Startup Innovation Drives Economic Recovery",
    description:
      "Young entrepreneurs are leading the charge in economic recovery with innovative solutions and disruptive technologies.",
    content: `
      <h2>The Startup Revolution</h2>
      <p>In the wake of global economic challenges, startups have emerged as the driving force behind recovery and innovation. These agile companies are creating solutions that address real-world problems while generating significant economic value.</p>
      
      <h3>Success Stories</h3>
      <p>Several startups have achieved remarkable success:</p>
      <ul>
        <li><strong>FinTech:</strong> Digital payment solutions processing $2B+ monthly</li>
        <li><strong>HealthTech:</strong> Telemedicine platforms serving 10M+ patients</li>
        <li><strong>EdTech:</strong> Online learning platforms with 50M+ active users</li>
      </ul>
      
      <p>These companies demonstrate the power of innovation in creating both social impact and economic value.</p>
    `,
    date: "December 10, 2024",
    category: "Innovation",
    readTime: "6 min read",
    author: "David Kim",
    tags: ["Startups", "Innovation", "Economy", "Technology"],
  },
];

const sampleComments: Comment[] = [
  {
    id: 1,
    user: "Ahmad Karimov",
    avatar: "AK",
    message:
      "Bu maqola juda foydali bo'ldi. AI texnologiyalari haqida yangi ma'lumotlar oldim.",
    timestamp: "2 soat oldin",
    isAdmin: false,
    replies: [
      {
        id: 1,
        user: "Admin",
        avatar: "AD",
        message: "Rahmat! Bunday maqolalarni davom ettiramiz.",
        timestamp: "1 soat oldin",
        isAdmin: true,
      },
    ],
  },
  {
    id: 2,
    user: "Malika Tosheva",
    avatar: "MT",
    message:
      "Startup kompaniyalar haqidagi qism juda qiziq edi. Boshqa maqolalar ham bormi?",
    timestamp: "4 soat oldin",
    isAdmin: false,
    replies: [],
  },
];

export default function NewsView() {
  const params = useParams();
  const router = useRouter();
  const newsId = Number.parseInt(params.id as string);

  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [currentUser] = useState({
    name: "Foydalanuvchi",
    avatar: "FO",
    isAdmin: false,
  });

  const article = newsArticles.find((article) => article.id === newsId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: currentUser.name,
        avatar: currentUser.avatar,
        message: newComment,
        timestamp: "Hozir",
        isAdmin: currentUser.isAdmin,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId: number) => {
    if (replyText.trim()) {
      const reply: Reply = {
        id: Date.now(),
        user: currentUser.name,
        avatar: currentUser.avatar,
        message: replyText,
        timestamp: "Hozir",
        isAdmin: currentUser.isAdmin,
      };

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );
      setReplyText("");
      setReplyingTo(null);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Button
              type="button"
              onClick={() => router.push("/news")}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300"
            >
              Back to News
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="relative">
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image
              width={500}
              height={256}
              unoptimized={true}
              alt={article.title}
              src={article.image || ""}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-teal-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-white/90 text-sm">{article.date}</span>
                  <span className="text-white/90 text-sm">
                    {article.readTime}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-white/90 text-lg lg:text-xl max-w-3xl">
                  {article.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-600 font-semibold text-lg">
                    {article.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {article.author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Published on {article.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-teal-50 hover:text-teal-600 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-700 prose-li:mb-2 prose-strong:text-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:text-teal-800 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Izohlar ({comments.length})
              </h3>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-semibold text-sm">
                      {currentUser.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Izoh yozing..."
                      className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <Button
                        type="button"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Izoh qo'shish
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            comment.isAdmin ? "bg-red-100" : "bg-blue-100"
                          }`}
                        >
                          <span
                            className={`font-semibold text-sm ${
                              comment.isAdmin ? "text-red-600" : "text-blue-600"
                            }`}
                          >
                            {comment.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">
                              {comment.user}
                            </h4>
                            {comment.isAdmin && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">
                            {comment.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {comment.message}
                    </p>

                    <div className="flex items-center space-x-4 text-sm">
                      <Button
                        type="button"
                        className="text-teal-600 hover:text-teal-700 font-medium"
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment.id ? null : comment.id
                          )
                        }
                      >
                        Javob berish
                      </Button>
                    </div>

                    {replyingTo === comment.id && (
                      <div className="mt-4 ml-8 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-600 font-semibold text-xs">
                              {currentUser.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Javob yozing..."
                              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              rows={2}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                              <Button
                                type="button"
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                              >
                                Bekor qilish
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyText.trim()}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Javob berish
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {comment.replies.length > 0 && (
                      <div className="mt-6 ml-8 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  reply.isAdmin ? "bg-red-100" : "bg-blue-100"
                                }`}
                              >
                                <span
                                  className={`font-semibold text-xs ${
                                    reply.isAdmin
                                      ? "text-red-600"
                                      : "text-blue-600"
                                  }`}
                                >
                                  {reply.avatar}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h5 className="font-semibold text-gray-900 text-sm">
                                    {reply.user}
                                  </h5>
                                  {reply.isAdmin && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                      Admin
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 text-xs">
                                  {reply.timestamp}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {reply.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => router.push("/news")}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="mr-2 w-4 h-4"
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
                Back to All News
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
