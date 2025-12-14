"use client";

import { useEffect } from "react";
import { FaExclamationTriangle, FaHome, FaRedoAlt } from "react-icons/fa";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry, etc)
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="glass max-w-2xl rounded-2xl p-8 text-center backdrop-blur-lg md:p-12">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20">
            <FaExclamationTriangle className="text-4xl text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Something went wrong!
        </h1>

        <p className="mb-2 text-lg text-white">We encountered an unexpected error.</p>
        <p className="mb-8 text-sm text-gray-300">
          {error.message || "Please try again or contact support if the problem persists."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <button
            onClick={reset}
            className="btn glass flex items-center gap-2 px-6 py-3 transition-all hover:scale-105"
          >
            <FaRedoAlt className="size-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn glass flex items-center gap-2 px-6 py-3 transition-all hover:scale-105"
          >
            <FaHome className="size-4" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
