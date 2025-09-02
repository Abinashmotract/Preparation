import Link from "next/link";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  const { category } = params;
  const topics = [
    { name: "basics", label: "Basics", icon: "📚" },
    { name: "advanced", label: "Advanced", icon: "🚀" },
    { name: "coding", label: "Coding Examples", icon: "💻" },
  ];

  return (
    <div className="pt-20 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24 animate-fade-in">
        <h2 className="font-bold text-xl mb-6 capitalize text-gray-800 flex items-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mr-2">{category}</span>
          Topics
        </h2>
        <ul className="space-y-2">
          {topics?.map((topic, index) => (
            <li key={topic.name}>
              <Link 
                href={`/interview/${category}/${topic.name}`}
                className="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:pl-5 border-l-4 border-transparent hover:border-blue-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-3 text-lg">{topic.icon}</span>
                <span className="text-black">{topic.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      
      <main className="lg:col-span-3">
        {children}
      </main>
    </div>
  );
}