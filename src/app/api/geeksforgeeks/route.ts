import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get("topic") || "programming";
    const limit = parseInt(searchParams.get("limit") || "10");

    // Note: GeeksforGeeks doesn't have a public API
    // This is a placeholder that would need to be implemented with web scraping
    // or use their practice API if available
    
    // For now, return empty array - you would implement actual scraping here
    // or use a service like ScraperAPI, Bright Data, etc.
    
    return NextResponse.json([]);
  } catch (error) {
    console.error("GeeksforGeeks API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GeeksforGeeks" },
      { status: 500 }
    );
  }
}

