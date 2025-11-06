import { Question, Difficulty } from "@/types/question";

const LEETCODE_API = "https://leetcode.com/api";

export async function fetchLeetCodeQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  try {
    // LeetCode GraphQL API endpoint
    const url = "https://leetcode.com/graphql";
    
    const query = `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          total: totalNum
          questions: data {
            acRate
            difficulty
            freqBar
            frontendQuestionId: questionFrontendId
            isFavor
            paidOnly: isPaidOnly
            status
            title
            titleSlug
            topicTags {
              name
              id
              slug
            }
            hasSolution
            hasVideoSolution
          }
        }
      }
    `;

    const variables = {
      categorySlug: "",
      skip: 0,
      limit: limit,
      filters: {
        tags: [topic.toLowerCase()],
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) throw new Error("LeetCode API error");

    const data = await response.json();
    const questions: Question[] = [];

    if (data.data?.problemsetQuestionList?.questions) {
      data.data.problemsetQuestionList.questions.forEach((item: any, index: number) => {
        // Fetch question details
        questions.push({
          id: parseInt(item.frontendQuestionId) || Date.now() + index,
          question: item.title || `LeetCode Problem ${item.frontendQuestionId}`,
          answer: `LeetCode problem: ${item.title}. Difficulty: ${item.difficulty}. Acceptance Rate: ${item.acRate?.toFixed(1)}%`,
          code: undefined, // Would need separate API call for code
          difficulty: mapLeetCodeDifficulty(item.difficulty),
          category: topic,
          topic: item.topicTags?.[0]?.name || topic,
          tags: item.topicTags?.map((tag: any) => tag.name) || [topic],
          source: "LeetCode",
          sourceUrl: `https://leetcode.com/problems/${item.titleSlug}`,
        });
      });
    }

    return questions;
  } catch (error) {
    console.error("LeetCode API error:", error);
    return [];
  }
}

function mapLeetCodeDifficulty(difficulty?: string): Difficulty {
  if (!difficulty) return "Intermediate";
  const lower = difficulty.toLowerCase();
  if (lower === "easy") return "Beginner";
  if (lower === "medium") return "Intermediate";
  if (lower === "hard") return "Advanced";
  return "Intermediate";
}

