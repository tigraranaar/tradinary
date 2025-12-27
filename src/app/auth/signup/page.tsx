import { Metadata } from "next";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up | Tradinary",
  description:
    "Create your Tradinary account to get started with AI-powered trading signals and analysis.",
  openGraph: {
    title: "Sign Up | Tradinary",
    description:
      "Create your Tradinary account to get started with AI-powered trading signals and analysis.",
    type: "website",
  },
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <SignupForm />
    </main>
  );
}
