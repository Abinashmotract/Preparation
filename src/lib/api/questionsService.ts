import { Question, Difficulty } from "@/types/question";
import { fetchStackOverflowQuestions } from "./stackoverflow";
import { fetchGeeksForGeeksQuestions } from "./geeksforgeeks";
import { fetchInterviewBitQuestions } from "./interviewbit";
import { fetchGitHubQuestions } from "./github";
import { fetchGoogleSearchQuestions } from "./googleSearch";
import { fetchLeetCodeQuestions } from "./leetcode";

export interface QuestionSource {
  name: string;
  fetch: (category: string, options?: { difficulty?: Difficulty; limit?: number }) => Promise<Question[]>;
  priority: number; // Lower number = higher priority
}

const sources: QuestionSource[] = [
  {
    name: "Stack Overflow",
    fetch: async (category, options) => {
      const tags = mapCategoryToTags(category);
      return fetchStackOverflowQuestions(tags, options?.limit || 15);
    },
    priority: 1,
  },
  {
    name: "Google Search",
    fetch: async (category, options) => {
      return fetchGoogleSearchQuestions(category, options?.limit || 10);
    },
    priority: 2,
  },
  {
    name: "LeetCode",
    fetch: async (category, options) => {
      return fetchLeetCodeQuestions(category, options?.limit || 10);
    },
    priority: 3,
  },
  {
    name: "GitHub",
    fetch: async (category, options) => {
      return fetchGitHubQuestions(category, options?.limit || 8);
    },
    priority: 4,
  },
  {
    name: "GeeksforGeeks",
    fetch: async (category, options) => {
      return fetchGeeksForGeeksQuestions(category, options?.limit || 10);
    },
    priority: 5,
  },
  {
    name: "InterviewBit",
    fetch: async (category, options) => {
      return fetchInterviewBitQuestions(category, options?.limit || 10);
    },
    priority: 6,
  },
];

export async function fetchQuestionsFromAllSources(
  category: string,
  options?: {
    difficulty?: Difficulty;
    limit?: number;
    sources?: string[];
  }
): Promise<Question[]> {
  const enabledSources = sources
    .filter((s) => !options?.sources || options.sources.includes(s.name))
    .sort((a, b) => a.priority - b.priority);

  const allQuestions: Question[] = [];
  const questionsPerSource = Math.ceil((options?.limit || 20) / enabledSources.length);

  // Fetch from all sources in parallel
  const promises = enabledSources.map((source) =>
    source
      .fetch(category, { difficulty: options?.difficulty, limit: questionsPerSource })
      .catch((error) => {
        console.error(`Error fetching from ${source.name}:`, error);
        return [];
      })
  );

  const results = await Promise.allSettled(promises);
  
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      allQuestions.push(...result.value);
    }
  });

  // Remove duplicates and limit results
  const uniqueQuestions = removeDuplicates(allQuestions);
  return uniqueQuestions.slice(0, options?.limit || 20);
}

function mapCategoryToTags(category: string): string[] {
  const tagMap: Record<string, string[]> = {
    mern: ["mongodb", "express", "reactjs", "node.js"],
    mean: ["mongodb", "express", "angular", "node.js"],
    vuejs: ["vue.js", "vuejs"],
    nextjs: ["next.js", "nextjs"],
    frontend: ["javascript", "reactjs", "html", "css"],
    backend: ["node.js", "express", "api"],
    html: ["html", "html5"],
    css: ["css", "css3"],
    "ui-ux": ["ui", "ux", "design"],
  };

  return tagMap[category.toLowerCase()] || [category.toLowerCase()];
}

function removeDuplicates(questions: Question[]): Question[] {
  const seen = new Set<string>();
  return questions.filter((q) => {
    const key = q.question.toLowerCase().substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Cache management
const cache = new Map<string, { data: Question[]; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function getCachedQuestions(
  category: string,
  options?: {
    difficulty?: Difficulty;
    limit?: number;
    sources?: string[];
  }
): Promise<Question[]> {
  const cacheKey = `${category}-${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const questions = await fetchQuestionsFromAllSources(category, options);
  cache.set(cacheKey, { data: questions, timestamp: Date.now() });
  
  return questions;
}

export function clearCache() {
  cache.clear();
}

