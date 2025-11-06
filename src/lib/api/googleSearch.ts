import { Question, Difficulty } from "@/types/question";

const GOOGLE_CUSTOM_SEARCH_API = "https://www.googleapis.com/customsearch/v1";

export async function fetchGoogleSearchQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      console.warn("Google Custom Search API keys not configured");
      return [];
    }

    // Search for interview questions
    const query = `interview questions ${topic} programming with answers`;
    const url = `${GOOGLE_CUSTOM_SEARCH_API}?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=${Math.min(limit, 10)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Google Search API error");

    const data = await response.json();
    const questions: Question[] = [];

    if (data.items) {
      data.items.forEach((item: any, index: number) => {
        // Extract question from title or snippet
        const questionText = item.title || item.snippet?.substring(0, 200) || "";
        const answerText = item.snippet || item.htmlSnippet?.replace(/<[^>]*>/g, " ") || "";

        if (questionText.length > 10) {
          questions.push({
            id: Date.now() + index,
            question: questionText,
            answer: extractAnswer(answerText, item.htmlSnippet),
            code: extractCodeFromHtml(item.htmlSnippet),
            difficulty: determineDifficulty(item.title, item.snippet),
            category: topic,
            topic: topic,
            tags: [topic, "interview"],
            source: "Google Search",
            sourceUrl: item.link,
          });
        }
      });
    }

    return questions;
  } catch (error) {
    console.error("Google Search API error:", error);
    return [];
  }
}

function extractAnswer(snippet: string, htmlSnippet?: string): string {
  // Clean up HTML and extract meaningful answer
  let answer = snippet || "";
  if (htmlSnippet) {
    answer = htmlSnippet.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  return answer.substring(0, 500) + (answer.length > 500 ? "..." : "");
}

function extractCodeFromHtml(htmlSnippet?: string): string | undefined {
  if (!htmlSnippet) return undefined;

  // Extract code blocks from HTML
  const codeMatch = htmlSnippet.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
  if (codeMatch) {
    return codeMatch[1]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/<[^>]*>/g, "")
      .trim();
  }
  return undefined;
}

function determineDifficulty(title: string, snippet: string): Difficulty {
  const text = (title + " " + snippet).toLowerCase();
  if (text.includes("advanced") || text.includes("senior") || text.includes("expert")) {
    return "Advanced";
  }
  if (text.includes("intermediate") || text.includes("mid-level")) {
    return "Intermediate";
  }
  return "Beginner";
}

