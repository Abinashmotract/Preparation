"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { name: "MERN Stack", href: "/interview/mern", color: "from-blue-500 to-cyan-500", icon: "⚛️", description: "MongoDB, Express, React, Node.js" },
    { name: "MEAN Stack", href: "/interview/mean", color: "from-red-500 to-pink-500", icon: "🅰️", description: "MongoDB, Express, Angular, Node.js" },
    { name: "Vue.js", href: "/interview/vuejs", color: "from-green-500 to-emerald-500", icon: "🟢", description: "Progressive JavaScript Framework" },
    { name: "Next.js", href: "/interview/nextjs", color: "from-gray-800 to-gray-600", icon: "▲", description: "React Framework for Production" },
    { name: "Frontend", href: "/interview/frontend", color: "from-indigo-500 to-purple-500", icon: "💻", description: "React, JavaScript, Modern Frontend" },
    { name: "Backend", href: "/interview/backend", color: "from-purple-500 to-pink-500", icon: "⚙️", description: "Node.js, APIs, Databases" },
    { name: "HTML", href: "/interview/html", color: "from-orange-500 to-red-500", icon: "📄", description: "HyperText Markup Language" },
    { name: "CSS", href: "/interview/css", color: "from-blue-400 to-indigo-500", icon: "🎨", description: "Styling and Layout" },
    { name: "UI/UX", href: "/interview/ui-ux", color: "from-emerald-500 to-teal-500", icon: "✨", description: "Design Systems & Accessibility" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute top-60 -left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float-slower"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Ace Your Technical Interviews
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Prepare for your dream job with curated questions, detailed answers, and interactive code examples.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/interview"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-pulse"
            >
              Start Preparing
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-full font-semibold shadow transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Explore by Category
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select a category to explore interview questions tailored for specific roles and technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center text-center group relative overflow-hidden`}
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease'
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              <div className={`h-20 w-20 rounded-2xl bg-gradient-to-r ${category.color} mb-5 flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
              <div className="mt-4 text-blue-600 font-medium flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 mb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "500+", label: "Questions" },
            { number: "10+", label: "Categories" },
            { number: "100%", label: "Free" },
            { number: "24/7", label: "Access" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 bg-white/80 rounded-xl shadow transform hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}