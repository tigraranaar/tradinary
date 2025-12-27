import { NextRequest } from "next/server";
import { SignalRequest } from "@/types/trading";
import { getSignals } from "@/lib/api/trading-signals-service";
import {
  requireAuth,
  checkRateLimit,
  handleApiError,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_SIGNALS,
} from "@/lib/api/helpers";

/**
 * POST /api/signal
 * Get trading signals for a specific pair across all timeframes
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    // 2. Check rate limit
    const rateLimit = checkRateLimit(`signal:${authResult.id}`, {
      windowMs: RATE_LIMIT_WINDOW_MS,
      maxRequests: RATE_LIMIT_SIGNALS,
    });

    if (!rateLimit.allowed) {
      return Response.json(
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
      return Response.json({ error: "Bad Request", message: "Invalid JSON body" }, { status: 400 });
    }

    if (!body.symbol) {
      return Response.json(
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
    return Response.json(signals, {
      status: 200,
      headers: rateLimit.headers,
    });
  } catch (error) {
    return handleApiError(error, "/api/signal");
  }
}
