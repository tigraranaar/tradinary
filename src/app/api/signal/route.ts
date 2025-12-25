import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { rateLimitMiddleware } from "@/lib/rate-limit";
import { SignalRequest } from "@/types/trading";
import { getSignals } from "@/lib/trading-signals-service-api";

/**
 * POST /api/signal
 * Get trading signals for a specific pair across all timeframes
 * Requires authentication
 */
export async function POST(request: NextRequest) {
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

    // 2. Check rate limit (10 signals per minute per user - more restrictive)
    const rateLimit = rateLimitMiddleware(`signal:${user.id}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10, // Lower limit for signal analysis
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

    // 3. Parse and validate request body
    let body: SignalRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    if (!body.symbol) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Missing required field: symbol",
        },
        { status: 400 }
      );
    }

    // 4. Fetch signals from Trading Signals Service API
    const signals = await getSignals(body);

    // 5. Return response with rate limit headers
    return NextResponse.json(signals, {
      status: 200,
      headers: rateLimit.headers,
    });
  } catch (error) {
    console.error("Error in /api/signal:", error);

    // Check if it's a Trading Signals Service API error
    if (error instanceof Error && error.message.includes("Trading Signals Service API error")) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          message: "Trading signals service is currently unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Failed to fetch trading signals",
      },
      { status: 500 }
    );
  }
}
