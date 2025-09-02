import { getQuestions } from "@/lib/getQuestions";
import QuestionCard from "@/components/QuestionCard";

interface Props {
  params: { category: string; topic: string };
}

export default function TopicPage({ params }: Props) {
  const { category, topic } = params;
  const questions = getQuestions(category, topic);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {category} - {topic} Questions
        </h1>
        <p className="text-gray-600">
          {questions.length} question{questions.length !== 1 ? 's' : ''} available
        </p>
      </div>
      
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q.question}
            answer={q.answer}
            code={q.code}
          />
        ))
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center animate-pulse-slow">
          <div className="text-5xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No questions available yet</h3>
          <p className="text-gray-600">We're working on adding questions for this topic. Check back soon!</p>
        </div>
      )}
    </div>
  );
}