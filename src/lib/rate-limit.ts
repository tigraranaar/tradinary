interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetTime < now) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
}

export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = {
        windowMs: 60 * 1000,
        maxRequests: 30,
    }
): RateLimitResult {
    const now = Date.now();
    const key = identifier;

    let entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
        entry = {
            count: 1,
            resetTime: now + config.windowMs,
        };
        rateLimitStore.set(key, entry);

        return {
            success: true,
            limit: config.maxRequests,
            remaining: config.maxRequests - 1,
            reset: entry.resetTime,
        };
    }

    entry.count++;

    if (entry.count > config.maxRequests) {
        return {
            success: false,
            limit: config.maxRequests,
            remaining: 0,
            reset: entry.resetTime,
        };
    }

    return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - entry.count,
        reset: entry.resetTime,
    };
}

export function rateLimitMiddleware(
    identifier: string,
    config?: RateLimitConfig
): { allowed: boolean; headers: Record<string, string> } {
    const result = checkRateLimit(identifier, config);

    const headers: Record<string, string> = {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.reset.toString(),
    };

    if (!result.success) {
        headers['Retry-After'] = Math.ceil((result.reset - Date.now()) / 1000).toString();
    }

    return {
        allowed: result.success,
        headers,
    };
}
