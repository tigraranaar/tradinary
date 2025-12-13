import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/auth-server";
import { rateLimitMiddleware } from "@/lib/rate-limit";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting (10 requests per minute per IP)
    const ip =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimit = rateLimitMiddleware(`contact:${ip}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "You've sent too many messages. Please try again later.",
        },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    // 2. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // 3. Validate with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        {
          error: "Validation Error",
          message: firstError.message,
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // 4. Insert into Supabase (using server client)
    const supabase = createServerSupabaseClient();
    const { error: insertError } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        subject,
        message,
      },
    ]);

    if (insertError) {
      console.error("Error inserting contact message:", insertError);
      return NextResponse.json(
        {
          error: "Database Error",
          message: "Failed to save your message. Please try again later.",
        },
        { status: 500 }
      );
    }

    // 5. Success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      },
      {
        status: 200,
        headers: rateLimit.headers,
      }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
