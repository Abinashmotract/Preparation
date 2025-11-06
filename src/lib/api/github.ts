import { Question, Difficulty } from "@/types/question";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  try {
    // Search GitHub repositories for interview questions
    const query = `interview-questions ${topic} language:javascript OR language:typescript OR language:python`;
    const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("GitHub API error");
    
    const data = await response.json();
    
    // Fetch README content from top repositories
    const questions: Question[] = [];
    
    for (const repo of data.items.slice(0, Math.min(limit, 5))) {
      try {
        const readmeUrl = `${GITHUB_API}/repos/${repo.full_name}/readme`;
        const readmeResponse = await fetch(readmeUrl);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          // Decode base64 content
          let content = "";
          try {
            if (typeof window !== "undefined") {
              content = atob(readmeData.content.replace(/\n/g, ""));
            } else {
              // Node.js environment
              content = Buffer.from(readmeData.content.replace(/\n/g, ""), "base64").toString("utf-8");
            }
          } catch (e) {
            console.error("Error decoding README:", e);
            continue;
          }
          
          // Parse markdown to extract questions
          const parsed = parseMarkdownQuestions(content, topic);
          questions.push(...parsed);
        }
      } catch (err) {
        console.error(`Error fetching README for ${repo.full_name}:`, err);
      }
    }
    
    return questions.slice(0, limit);
  } catch (error) {
    console.error("GitHub API error:", error);
    return [];
  }
}

function parseMarkdownQuestions(content: string, topic: string): Question[] {
  const questions: Question[] = [];
  
  // Extract questions from markdown (## Q:, ### Q:, etc.)
  const questionRegex = /(?:^|\n)(?:#{1,3})\s*(?:Q\d*[:\-]?\s*)?(.+?)(?=\n(?:#{1,3})|$)/gi;
  const matches = content.matchAll(questionRegex);
  
  let id = Date.now();
  for (const match of matches) {
    const text = match[1]?.trim();
    if (text && text.length > 10) {
      questions.push({
        id: id++,
        question: text.substring(0, 200),
        answer: extractAnswer(text),
        code: extractCodeFromMarkdown(text),
        difficulty: "Intermediate",
        category: topic,
        topic: topic,
        tags: [topic],
        source: "GitHub",
      });
    }
  }
  
  return questions;
}

function extractAnswer(text: string): string {
  // Extract answer from markdown
  const answerMatch = text.match(/(?:Answer|Solution|Explanation)[:\-]?\s*(.+)/i);
  return answerMatch ? answerMatch[1].substring(0, 500) : text.substring(0, 300);
}

function extractCodeFromMarkdown(text: string): string | undefined {
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/;
  const match = text.match(codeBlockRegex);
  return match ? match[1].trim() : undefined;
}

