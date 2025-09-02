export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">About Interview Prep Portal</h1>
      
      <div className="prose prose-indigo max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Interview Prep Portal is designed to help developers prepare for technical interviews 
          with comprehensive questions, detailed answers, and practical code examples.
        </p>
        
        <div className="bg-indigo-50 p-6 rounded-lg mb-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold text-indigo-800 mb-3">Our Mission</h2>
          <p>
            To provide a structured, comprehensive resource for interview preparation that covers
            all aspects of modern web development, from fundamental concepts to advanced techniques.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Features</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-2 mr-3">✓</span>
            <span>Category-wise question organization</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-2 mr-3">✓</span>
            <span>Interactive code examples with syntax highlighting</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-2 mr-3">✓</span>
            <span>Topic-based filtering for focused preparation</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-2 mr-3">✓</span>
            <span>Clean, responsive design for all devices</span>
          </li>
        </ul>
      </div>
    </div>
  );
}