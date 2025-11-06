import { NextRequest, NextResponse } from "next/server";
import { getCachedQuestions } from "@/lib/api/questionsService";
import { Difficulty } from "@/types/question";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || "frontend";
    const difficulty = searchParams.get("difficulty") as Difficulty | null;
    const limit = parseInt(searchParams.get("limit") || "20");
    const sources = searchParams.get("sources")?.split(",");

    const questions = await getCachedQuestions(category, {
      difficulty: difficulty || undefined,
      limit,
      sources,
    });

    return NextResponse.json({ questions, count: questions.length });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

