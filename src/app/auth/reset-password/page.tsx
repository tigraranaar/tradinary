import { Metadata } from "next";
import { Suspense } from "react";
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

function ResetPasswordFormFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-2xl border border-white/20 p-8">
        <div className="mb-4 text-center text-sm text-gray-300">Loading...</div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Suspense fallback={<ResetPasswordFormFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
