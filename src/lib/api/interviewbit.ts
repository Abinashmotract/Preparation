import { Question, Difficulty } from "@/types/question";

export async function fetchInterviewBitQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  try {
    // InterviewBit proxy endpoint
    const url = `/api/interviewbit?topic=${encodeURIComponent(topic)}&limit=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("InterviewBit API error");
    
    const data = await response.json();
    
    return data.map((item: any, index: number) => ({
      id: item.id || Date.now() + index,
      question: item.title || item.problem,
      answer: item.answer || item.hint || item.explanation || "",
      code: item.code || item.solution,
      difficulty: mapInterviewBitDifficulty(item.difficulty) || "Intermediate",
      category: topic,
      topic: item.topic || topic,
      tags: item.tags || [topic],
      source: "InterviewBit",
      sourceUrl: item.url || `https://www.interviewbit.com/${topic}`,
    }));
  } catch (error) {
    console.error("InterviewBit API error:", error);
    return [];
  }
}

function mapInterviewBitDifficulty(difficulty?: string): Difficulty | null {
  if (!difficulty) return null;
  const lower = difficulty.toLowerCase();
  if (lower.includes("easy") || lower === "1") return "Beginner";
  if (lower.includes("medium") || lower === "2") return "Intermediate";
  if (lower.includes("hard") || lower === "3") return "Advanced";
  return null;
}

