import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Tradinary",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="glass max-w-2xl rounded-2xl p-8 text-center backdrop-blur-lg md:p-12">
        {/* 404 Error */}
        <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">Page Not Found</h2>
        <p className="mb-8 text-base text-gray-100 md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="btn glass inline-flex items-center gap-2 px-6 py-3 transition-all hover:scale-105"
        >
          <FaHome className="size-4" />
          Go Home
        </Link>
      </div>
    </main>
  );
}
