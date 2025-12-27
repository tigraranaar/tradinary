import { AuthError } from "@supabase/supabase-js";

export function handleGoogleSignInError(error: AuthError | null): string | null {
  if (!error) {
    return null;
  }

  // More user-friendly error message for disabled provider
  if (
    error.message.includes("provider is not enabled") ||
    error.message.includes("Unsupported provider")
  ) {
    return "Google sign in is not configured. Please contact support.";
  }

  return error.message;
}
