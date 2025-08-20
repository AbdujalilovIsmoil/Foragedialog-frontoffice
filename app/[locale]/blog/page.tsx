"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import NewsImage1 from "@/public/images/png/news-image-1.png";
import NewsImage2 from "@/public/images/png/news-image-2.png";
import NewsImage3 from "@/public/images/png/news-image-3.png";
import ProfileImage from "@/public/images/png/profile-image.png";
import Image from "next/image";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readingTime: number;
  isPublished: boolean;
}

const blogCategories = [
  "Technology",
  "Design",
  "Development",
  "Business",
  "Lifestyle",
  "Tutorial",
] as const;

const blogTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX",
  "Web Development",
  "JavaScript",
  "CSS",
  "HTML",
  "Frontend",
  "Backend",
  "Full Stack",
] as const;

// Sample blog data
const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Beautiful User Interfaces with Modern CSS",
    slug: "building-beautiful-user-interfaces-modern-css",
    excerpt:
      "Discover the latest CSS techniques and best practices for creating stunning, responsive user interfaces that captivate your audience.",
    content: `
      <h2>Introduction to Modern CSS</h2>
      <p>CSS has evolved tremendously over the years, offering developers powerful tools to create beautiful and responsive designs. In this comprehensive guide, we'll explore the latest techniques and best practices.</p>
      
      <h3>Grid and Flexbox</h3>
      <p>Modern layout systems like CSS Grid and Flexbox have revolutionized how we approach web design. These tools provide unprecedented control over element positioning and alignment.</p>
      
      <blockquote>
        "The best designs are not just beautiful, they're functional and accessible to everyone."
      </blockquote>
      
      <h3>Custom Properties and Variables</h3>
      <p>CSS custom properties allow for dynamic theming and maintainable stylesheets. They're essential for modern design systems.</p>
    `,
    featuredImage: NewsImage1.src,
    author: {
      name: "Sarah Johnson",
      avatar: ProfileImage.src,
      bio: "Frontend developer and UI/UX designer with 8+ years of experience",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    tags: ["CSS", "UI/UX", "Web Development", "Frontend"],
    category: "Design",
    readingTime: 8,
    isPublished: true,
  },
  {
    id: "2",
    title: "Next.js 14: The Complete Guide to App Router",
    slug: "nextjs-14-complete-guide-app-router",
    excerpt:
      "Master the new App Router in Next.js 14 with this comprehensive guide covering routing, layouts, and advanced patterns.",
    content: `
      <h2>What's New in Next.js 14</h2>
      <p>Next.js 14 introduces significant improvements to the App Router, making it more powerful and developer-friendly than ever before.</p>
      
      <h3>File-based Routing</h3>
      <p>The App Router uses a file-based routing system that's intuitive and powerful. Learn how to structure your application for optimal performance.</p>
      
      <h3>Server Components</h3>
      <p>Server Components are a game-changer for React applications, offering better performance and SEO capabilities.</p>
    `,
    featuredImage: NewsImage2.src,
    author: {
      name: "Michael Chen",
      avatar: ProfileImage.src,
      bio: "Full-stack developer specializing in React and Next.js",
    },
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    tags: ["Next.js", "React", "TypeScript", "Full Stack"],
    category: "Development",
    readingTime: 12,
    isPublished: true,
  },
  {
    id: "3",
    title: "The Art of Responsive Design in 2024",
    slug: "art-of-responsive-design-2024",
    excerpt:
      "Explore the latest trends and techniques in responsive web design, from mobile-first approaches to advanced CSS Grid layouts.",
    content: `
      <h2>Responsive Design Evolution</h2>
      <p>Responsive design has come a long way since its inception. Today's approaches are more sophisticated and user-centric.</p>
      
      <h3>Mobile-First Strategy</h3>
      <p>Starting with mobile designs ensures better performance and user experience across all devices.</p>
      
      <h3>Container Queries</h3>
      <p>The new container queries feature allows for truly component-based responsive design.</p>
    `,
    featuredImage: NewsImage3.src,
    author: {
      name: "Emily Rodriguez",
      avatar: ProfileImage.src,
      bio: "UX/UI designer focused on responsive and accessible design",
    },
    publishedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    tags: ["CSS", "Responsive Design", "Mobile", "UI/UX"],
    category: "Design",
    readingTime: 6,
    isPublished: true,
  },
  {
    id: "4",
    title: "TypeScript Best Practices for Large Applications",
    slug: "typescript-best-practices-large-applications",
    excerpt:
      "Learn essential TypeScript patterns and practices for building maintainable, scalable applications with strong type safety.",
    content: `
      <h2>TypeScript in Enterprise</h2>
      <p>TypeScript has become the standard for large-scale JavaScript applications. Here are the best practices for success.</p>
      
      <h3>Type Safety Strategies</h3>
      <p>Implementing strict type checking and proper error handling patterns.</p>
      
      <h3>Code Organization</h3>
      <p>Structuring your TypeScript codebase for maximum maintainability and team collaboration.</p>
    `,
    featuredImage: NewsImage1.src,
    author: {
      name: "David Kim",
      avatar: ProfileImage.src,
      bio: "Senior TypeScript developer and technical lead",
    },
    publishedAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    tags: ["TypeScript", "JavaScript", "Development", "Best Practices"],
    category: "Development",
    readingTime: 10,
    isPublished: true,
  },
];

function getBlogPosts(): BlogPost[] {
  return sampleBlogPosts.filter((post) => post.isPublished);
}

const FilterIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
    />
  </svg>
);

const CalendarIcon = () => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ClockIcon = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ArrowRightIcon = () => (
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
      d="M9 5l7 7-7 7"
    />
  </svg>
);

type SortOption = "newest" | "oldest" | "title" | "reading-time";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const blogPosts = getBlogPosts();

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== "all") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "reading-time":
          return a.readingTime - b.readingTime;
        default:
          return 0;
      }
    });

    return sorted;
  }, [blogPosts, searchQuery, selectedCategory, selectedTag, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-primary mb-4">
            Discover Amazing Content
          </h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Explore our collection of carefully crafted articles on web
            development, design, and technology
          </p>
        </section>

        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FilterIcon />
              <span className="font-serif">Filters</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-serif">
                {filteredAndSortedPosts.length} posts found
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-serif"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="reading-time">Reading Time</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium font-sans text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-serif"
                  >
                    <option value="all">All Categories</option>
                    {blogCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans text-foreground mb-2">
                    Tag
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-serif"
                  >
                    <option value="all">All Tags</option>
                    {blogTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedTag("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-serif"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  alt={post.title}
                  src={post.featuredImage || "/placeholder.svg"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full font-serif">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarIcon />
                    <span className="font-serif">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-sans text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground font-serif mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground font-serif">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ClockIcon />
                    <span className="font-serif">{post.readingTime} min</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded font-serif"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded font-serif">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-serif font-medium"
                >
                  Read More
                  <ArrowRightIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold font-sans text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground font-serif mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-serif"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination Placeholder */}
        {filteredAndSortedPosts.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors font-serif">
                Previous
              </button>
              <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-serif">
                1
              </span>
              <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors font-serif">
                2
              </button>
              <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors font-serif">
                3
              </button>
              <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors font-serif">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
