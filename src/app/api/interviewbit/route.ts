import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get("topic") || "programming";
    const limit = parseInt(searchParams.get("limit") || "10");

    // Note: InterviewBit doesn't have a public API
    // This is a placeholder that would need to be implemented with web scraping
    // For production, consider using a scraping service or their official API if available
    
    return NextResponse.json([]);
  } catch (error) {
    console.error("InterviewBit API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from InterviewBit" },
      { status: 500 }
    );
  }
}

