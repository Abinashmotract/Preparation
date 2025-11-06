import { Question, Difficulty } from "@/types/question";

// Categories - no longer using static data, just for reference
export const CATEGORIES = [
  "mern",
  "mean",
  "vuejs",
  "nextjs",
  "frontend",
  "backend",
  "html",
  "css",
  "ui-ux",
  "fullstack",
];

// Async function to fetch questions from APIs ONLY
export async function fetchQuestionsFromAPI(
  category: string,
  options?: {
    topic?: string;
    difficulty?: Difficulty;
    search?: string;
    limit?: number;
  }
): Promise<Question[]> {
  try {
    const params = new URLSearchParams({
      category: category.toLowerCase(),
      limit: String(options?.limit || 50), // Increased default to get more from APIs
    });

    if (options?.difficulty) {
      params.append("difficulty", options.difficulty);
    }

    const response = await fetch(`/api/questions?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch from API");
    }

    const result = await response.json();
    let questions = result.questions || [];

    // Apply client-side filters
    if (options?.topic) {
      questions = questions.filter((q: Question) => q.topic === options.topic);
    }

    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      questions = questions.filter(
        (q: Question) =>
          q.question.toLowerCase().includes(searchLower) ||
          q.answer.toLowerCase().includes(searchLower) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    return questions;
  } catch (error) {
    console.error("API fetch error:", error);
    // No fallback - return empty array if APIs fail
    return [];
  }
}

// Main function - API only, no static fallback
export async function getQuestions(
  category: string,
  options?: {
    topic?: string;
    difficulty?: Difficulty;
    search?: string;
    limit?: number;
  }
): Promise<Question[]> {
  // Always fetch from APIs
  return fetchQuestionsFromAPI(category, options);
}

export function getAllCategories(): string[] {
  return CATEGORIES;
}

export async function getCategoriesWithCounts(): Promise<Array<{ name: string; count: number }>> {
  // Fetch counts from APIs for each category
  const counts = await Promise.all(
    CATEGORIES.map(async (category) => {
      try {
        const questions = await fetchQuestionsFromAPI(category, { limit: 1 });
        // Make a full request to get actual count
        const fullQuestions = await fetchQuestionsFromAPI(category, { limit: 100 });
        return { name: category, count: fullQuestions.length };
      } catch {
        return { name: category, count: 0 };
      }
    })
  );
  return counts;
}
