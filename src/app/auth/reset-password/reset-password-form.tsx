"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { validatePasswordAndMatch } from "@/lib/auth/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateUser, session, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if no valid session (no reset token)
  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/auth/login");
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validation = validatePasswordAndMatch(password, confirmPassword);
    if (!validation.isValid) {
      setError(validation.error || "Invalid password");
      return;
    }

    setLoading(true);

    const { error } = await updateUser(password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      router.push("/auth/login");
    }
  };

  if (authLoading) {
    return (
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 70 }}
      >
        <div className="glass rounded-2xl border border-white/20 p-8">
          <div className="mb-4 text-center text-sm text-gray-300">Loading...</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 70 }}
    >
      <div className="glass rounded-2xl border border-white/20 p-8">
        <motion.h1
          className="mb-2 text-center text-3xl font-semibold"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Reset Password
        </motion.h1>
        <motion.p
          className="mb-8 text-center text-gray-300"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter your new password
        </motion.p>

        {error && (
          <motion.div
            className="mb-4 rounded-lg border border-red-500/50 bg-red-500/20 p-3 text-sm text-red-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="mb-4 rounded-lg border border-green-500/50 bg-green-500/20 p-3 text-sm text-green-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Password updated successfully! Redirecting to login...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button type="submit" variant="glass" disabled={loading || success} className="w-full">
              {loading ? "Updating..." : success ? "Password Updated!" : "Update Password"}
            </Button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center text-sm text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/auth/login" className="font-medium text-white hover:underline">
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
