import { Metadata } from "next";
import ResetPasswordForm from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | Tradinary",
  description: "Set a new password for your Tradinary account.",
  openGraph: {
    title: "Reset Password | Tradinary",
    description: "Set a new password for your Tradinary account.",
    type: "website",
  },
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <ResetPasswordForm />
    </main>
  );
}
