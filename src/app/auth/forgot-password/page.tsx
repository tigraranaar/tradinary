import { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | Tradinary",
  description:
    "Reset your Tradinary account password. Enter your email to receive a password reset link.",
  openGraph: {
    title: "Forgot Password | Tradinary",
    description:
      "Reset your Tradinary account password. Enter your email to receive a password reset link.",
    type: "website",
  },
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <ForgotPasswordForm />
    </main>
  );
}
