import { Question, Difficulty } from "@/types/question";

const GEEKSFORGEEKS_API = "https://practiceapi.geeksforgeeks.org/api/v1";

export async function fetchGeeksForGeeksQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  try {
    // GeeksforGeeks doesn't have a public API, so we'll use a proxy approach
    // This would need to be implemented via a Next.js API route to avoid CORS
    const url = `/api/geeksforgeeks?topic=${encodeURIComponent(topic)}&limit=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("GeeksforGeeks API error");
    
    const data = await response.json();
    
    return data.map((item: any, index: number) => ({
      id: item.id || Date.now() + index,
      question: item.title || item.question,
      answer: item.answer || item.explanation || "",
      code: item.code || item.solution,
      difficulty: mapDifficulty(item.difficulty) || "Intermediate",
      category: topic,
      topic: item.topic || topic,
      tags: item.tags || [topic],
      source: "GeeksforGeeks",
      sourceUrl: item.url || `https://www.geeksforgeeks.org/${topic}`,
    }));
  } catch (error) {
    console.error("GeeksforGeeks API error:", error);
    return [];
  }
}

function mapDifficulty(difficulty?: string): Difficulty | null {
  if (!difficulty) return null;
  const lower = difficulty.toLowerCase();
  if (lower.includes("easy") || lower.includes("beginner")) return "Beginner";
  if (lower.includes("medium") || lower.includes("intermediate")) return "Intermediate";
  if (lower.includes("hard") || lower.includes("advanced")) return "Advanced";
  return null;
}

