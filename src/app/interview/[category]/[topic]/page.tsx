"use client";
import { fetchQuestionsFromAPI } from "@/lib/getQuestions";
import QuestionCard from "@/components/QuestionCard";
import { useEffect, useState } from "react";
import { Question } from "@/types/question";

interface Props {
  params: { category: string; topic: string };
}

export default function TopicPage({ params }: Props) {
  const { category, topic } = params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const apiQuestions = await fetchQuestionsFromAPI(category, {
          topic,
          limit: 50,
        });
        setQuestions(apiQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [category, topic]);

  return (
    <div className="animate-fade-in pt-20">
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {category} - {topic} Questions
        </h1>
        <p className="text-gray-600">
          {loading ? "Loading..." : `${questions.length} question${questions.length !== 1 ? 's' : ''} available`}
        </p>
      </div>
      
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions from APIs...</p>
        </div>
      ) : questions.length > 0 ? (
        questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            question={q.question}
            answer={q.answer}
            code={q.code}
            difficulty={q.difficulty}
            category={q.category}
            topic={q.topic}
            tags={q.tags}
            source={q.source}
            sourceUrl={q.sourceUrl}
          />
        ))
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center animate-pulse-slow">
          <div className="text-5xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No questions available yet</h3>
          <p className="text-gray-600">No questions found from API sources for this topic. Please try again later.</p>
        </div>
      )}
    </div>
  );
}