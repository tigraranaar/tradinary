"use server";

import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/auth/server";
import { checkRateLimit } from "@/lib/middleware/rate-limit";
import { headers } from "next/headers";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email address").max(255),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
  };
};

/**
 * Server Action for handling contact form submissions
 *
 * @param _prevState - Previous form state (required by useActionState, but not used)
 * @param formData - Form data from the form submission
 * @returns Promise<ContactFormState>
 */
export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // 1. Rate limiting
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(`contact:${ip}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10,
    });

    if (!rateLimit.success) {
      return {
        success: false,
        message: "Too many requests. Please try again later.",
        errors: {
          _form: ["You've sent too many messages. Please try again later."],
        },
      };
    }

    // 2. Extract and validate form data
    const rawData = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      subject: formData.get("subject")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    // 3. Validate with Zod
    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      const fieldErrors: ContactFormState["errors"] = {};

      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof rawData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field]!.push(issue.message);
      });

      return {
        success: false,
        message: "Please fix the errors in the form.",
        errors: fieldErrors,
      };
    }

    const { name, email, subject, message } = validationResult.data;

    // 4. Insert into Supabase
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
      return {
        success: false,
        message: "Failed to save your message. Please try again later.",
        errors: {
          _form: ["Database error occurred. Please try again later."],
        },
      };
    }

    // 5. Success response
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: {
        _form: [error instanceof Error ? error.message : "An unexpected error occurred"],
      },
    };
  }
}
