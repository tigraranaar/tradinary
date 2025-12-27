import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/server";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit";
import { getPairs } from "@/lib/api/trading-signals-service";

/**
 * GET /api/pairs
 * Returns list of available trading pairs
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Verify authentication
    const { user, error: authError } = await getUserFromRequest(request);

    if (!user || authError) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: authError || "Please log in to access this resource",
        },
        { status: 401 }
      );
    }

    // 2. Check rate limit (30 requests per minute per user)
    const rateLimit = rateLimitMiddleware(user.id, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 30,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    // 3. Fetch data from Trading Signals Service API
    const data = await getPairs();

    // 4. Return response with rate limit headers
    return NextResponse.json(data, {
      status: 200,
      headers: rateLimit.headers,
    });
  } catch (error) {
    console.error("Error in /api/pairs:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Failed to fetch trading pairs",
      },
      { status: 500 }
    );
  }
}
