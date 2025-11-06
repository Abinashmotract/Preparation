import Link from "next/link";

const categories = [
    {
        name: "MERN Stack",
        description: "MongoDB, Express, React, Node.js",
        icon: "⚛️",
        color: "from-blue-500 to-cyan-500",
        href: "/interview/mern"
    },
    {
        name: "MEAN Stack",
        description: "MongoDB, Express, Angular, Node.js",
        icon: "🅰️",
        color: "from-red-500 to-pink-500",
        href: "/interview/mean"
    },
    {
        name: "Vue.js",
        description: "Progressive JavaScript Framework",
        icon: "🟢",
        color: "from-green-500 to-emerald-500",
        href: "/interview/vuejs"
    },
    {
        name: "Next.js",
        description: "React Framework for Production",
        icon: "▲",
        color: "from-gray-800 to-gray-600",
        href: "/interview/nextjs"
    },
    {
        name: "Frontend",
        description: "React, JavaScript, Modern Frontend",
        icon: "💻",
        color: "from-indigo-500 to-purple-500",
        href: "/interview/frontend"
    },
    {
        name: "Backend",
        description: "Node.js, APIs, Databases",
        icon: "⚙️",
        color: "from-purple-500 to-pink-500",
        href: "/interview/backend"
    },
    {
        name: "HTML",
        description: "HyperText Markup Language",
        icon: "📄",
        color: "from-orange-500 to-red-500",
        href: "/interview/html"
    },
    {
        name: "CSS",
        description: "Styling and Layout",
        icon: "🎨",
        color: "from-blue-400 to-indigo-500",
        href: "/interview/css"
    },
    {
        name: "UI/UX",
        description: "Design Systems & Accessibility",
        icon: "✨",
        color: "from-emerald-500 to-teal-500",
        href: "/interview/ui-ux"
    },
];

export default function InterviewPage() {
    return (
        <div className="pt-20 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                    Interview Preparation Categories
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Select a category to explore interview questions tailored for specific roles and technologies.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {categories.map((category, index) => (
                    <Link
                        key={category.name}
                        href={category.href}
                        className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="flex items-center mb-4">
                            <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl text-white mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                {category.icon}
                            </div>
                            <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h2>
                        </div>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className="text-blue-600 font-medium flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Explore questions
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}