"use client";

import type React from "react";
import { useState } from "react";

const MailIcon = () => (
  <svg
    className="w-7 h-7 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-7 h-7 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    className="w-7 h-7 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    className="w-5 h-5 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6 text-accent fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

        <div className="relative px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
              <HeartIcon />
              <span className="text-sm font-medium text-foreground font-serif">
                We'd love to hear from you
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-bold text-foreground font-sans mb-8 tracking-tight leading-tight">
              Get in{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
              Ready to start a conversation? We're here to help bring your ideas
              to life with personalized solutions and exceptional service.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground font-sans mb-3">
                      Send us a message
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border-2 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/20 font-serif h-14 text-base transition-all duration-300 rounded-xl px-4 outline-none placeholder:text-muted-foreground"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border-2 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/20 font-serif h-14 text-base transition-all duration-300 rounded-xl px-4 outline-none placeholder:text-muted-foreground"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <textarea
                        name="message"
                        placeholder="Tell us about your project, questions, or how we can help you..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white border-2 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/20 min-h-[140px] font-serif text-base transition-all duration-300 resize-none rounded-xl p-4 outline-none placeholder:text-muted-foreground"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-sans h-14 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] rounded-xl flex items-center justify-center gap-3 group"
                    >
                      <SendIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-foreground font-sans mb-3">
                      Contact Information
                    </h3>
                    <p className="text-muted-foreground font-serif text-lg">
                      Reach out through any of these channels
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-primary/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <MailIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          Email Us
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          hello@company.com
                        </p>
                        <p className="text-sm text-muted-foreground font-serif mt-1">
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all duration-300 border border-accent/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          Call Us
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-muted-foreground font-serif mt-1">
                          Mon-Fri, 9AM-6PM EST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-primary/10">
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <MapPinIcon />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-sans mb-2 text-lg">
                          Visit Us
                        </h4>
                        <p className="text-muted-foreground font-serif text-base">
                          123 Business Street
                        </p>
                        <p className="text-muted-foreground font-serif text-base">
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground font-sans mb-3">
                      Follow Our Journey
                    </h3>
                    <p className="text-muted-foreground font-serif text-lg">
                      Stay connected with us on social media
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 font-serif bg-transparent rounded-xl text-foreground font-medium">
                      Twitter
                    </button>
                    <button className="px-6 py-3 border-2 border-border hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 font-serif bg-transparent rounded-xl text-foreground font-medium">
                      LinkedIn
                    </button>
                    <button className="px-6 py-3 border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 font-serif bg-transparent rounded-xl text-foreground font-medium">
                      Instagram
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-10 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <blockquote className="text-xl text-foreground font-serif italic mb-6 leading-relaxed">
                    "Exceptional service and attention to detail. They truly
                    understand what their clients need."
                  </blockquote>
                  <cite className="text-muted-foreground font-sans font-medium text-lg">
                    — Sarah Johnson, CEO
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
