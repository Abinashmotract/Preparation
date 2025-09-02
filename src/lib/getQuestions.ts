import frontend from "@/data/frontend.json";
import backend from "@/data/backend.json";

type Question = {
  id: number;
  question: string;
  answer: string;
  code?: string;
  topic?: string; // 👈 added for filtering
};

const data: Record<string, Question[]> = {
  frontend,
  backend,
};

export function getQuestions(category: string, topic?: string): Question[] {
  const questions = data[category] || [];
  if (topic) {
    return questions.filter((q) => q.topic === topic);
  }
  return questions;
}
