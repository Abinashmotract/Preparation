export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Question = {
  id: number;
  question: string;
  answer: string;
  code?: string;
  difficulty: Difficulty;
  topic?: string;
  category: string;
  tags?: string[];
  source?: string; // e.g., "Stack Overflow", "GeeksforGeeks"
  sourceUrl?: string; // URL to original question
};
