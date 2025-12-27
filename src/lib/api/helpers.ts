import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/server";
import { rateLimitMiddleware, type RateLimitConfig } from "@/lib/middleware/rate-limit";

export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
export const RATE_LIMIT_PAIRS = 30; // requests per minute
export const RATE_LIMIT_SIGNALS = 10; // requests per minute

export interface AuthenticatedUser {
  id: string;
}

export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  const { user, error: authError } = await getUserFromRequest(request);

  if (!user || authError || !user.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: authError || "Please log in to access this resource",
      },
      { status: 401 }
    );
  }

  return { id: user.id };
}

interface RateLimitResult {
  allowed: boolean;
  headers: Record<string, string>;
}

export function checkRateLimit(userId: string, config: RateLimitConfig): RateLimitResult {
  return rateLimitMiddleware(userId, config);
}

export function handleApiError(error: unknown, context: string): NextResponse {
  console.error(`Error in ${context}:`, error);

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
      message: error instanceof Error ? error.message : `Failed to ${context.toLowerCase()}`,
    },
    { status: 500 }
  );
}
