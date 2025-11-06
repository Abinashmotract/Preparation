import { Question, Difficulty } from "@/types/question";

const STACK_OVERFLOW_API = "https://api.stackexchange.com/2.3";

export interface StackOverflowQuestion {
  question_id: number;
  title: string;
  body: string;
  tags: string[];
  answer_count: number;
  score: number;
  view_count: number;
  accepted_answer_id?: number;
  answers?: Array<{
    answer_id: number;
    body: string;
    score: number;
    is_accepted: boolean;
  }>;
}

export async function fetchStackOverflowQuestions(
  tags: string[],
  limit: number = 10
): Promise<Question[]> {
  try {
    const tagParam = tags.join(";");
    const url = `${STACK_OVERFLOW_API}/questions?order=desc&sort=votes&tagged=${tagParam}&site=stackoverflow&pagesize=${limit}&filter=withbody`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Stack Overflow API error");
    
    const data = await response.json();
    
    return data.items.map((item: StackOverflowQuestion, index: number) => ({
      id: item.question_id,
      question: item.title,
      answer: extractAnswer(item.body),
      code: extractCodeBlocks(item.body),
      difficulty: determineDifficulty(item.score, item.view_count),
      category: tags[0] || "general",
      topic: tags[0],
      tags: item.tags,
      source: "Stack Overflow",
      sourceUrl: `https://stackoverflow.com/questions/${item.question_id}`,
    }));
  } catch (error) {
    console.error("Stack Overflow API error:", error);
    return [];
  }
}

function extractAnswer(body: string): string {
  // Remove HTML tags and clean up
  const text = body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.substring(0, 500) + (text.length > 500 ? "..." : "");
}

function extractCodeBlocks(body: string): string | undefined {
  const codeMatch = body.match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  if (codeMatch) {
    return codeMatch[1]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .trim();
  }
  return undefined;
}

function determineDifficulty(score: number, views: number): Difficulty {
  if (score > 50 || views > 10000) return "Advanced";
  if (score > 10 || views > 1000) return "Intermediate";
  return "Beginner";
}

