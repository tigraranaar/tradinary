import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign In | Tradinary",
  description:
    "Sign in to your Tradinary account to access AI-powered trading signals and analysis.",
  openGraph: {
    title: "Sign In | Tradinary",
    description:
      "Sign in to your Tradinary account to access AI-powered trading signals and analysis.",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-md">
            <div className="glass rounded-2xl border border-white/20 p-8">
              <div className="text-center text-gray-300">Loading...</div>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
