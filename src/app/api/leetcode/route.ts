import { NextRequest, NextResponse } from "next/server";
import { fetchLeetCodeQuestions } from "@/lib/api/leetcode";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get("topic") || "programming";
    const limit = parseInt(searchParams.get("limit") || "10");

    const questions = await fetchLeetCodeQuestions(topic, limit);

    return NextResponse.json({ questions, count: questions.length });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from LeetCode", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

