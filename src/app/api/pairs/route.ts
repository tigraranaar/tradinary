import { NextRequest } from "next/server";
import { getPairs } from "@/lib/api/trading-signals-service";
import {
  requireAuth,
  checkRateLimit,
  handleApiError,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_PAIRS,
} from "@/lib/api/helpers";

/**
 * GET /api/pairs
 * Returns list of available trading pairs
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    // 2. Check rate limit
    const rateLimit = checkRateLimit(authResult.id, {
      windowMs: RATE_LIMIT_WINDOW_MS,
      maxRequests: RATE_LIMIT_PAIRS,
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

    // 3. Fetch data from Trading Signals Service API
    const data = await getPairs();

    // 4. Return response with rate limit headers
    return Response.json(data, {
      status: 200,
      headers: rateLimit.headers,
    });
  } catch (error) {
    return handleApiError(error, "/api/pairs");
  }
}
