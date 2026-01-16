"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { validatePasswordAndMatch } from "@/lib/auth/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const { updateUser, signOut, session, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle recovery token from email link
  useEffect(() => {
    const handleRecoveryToken = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      if (token && type === "recovery") {
        try {
          setVerifying(true);

          // Try to verify the recovery token
          // Supabase recovery tokens can be verified using verifyOtp
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "recovery",
          });

          if (error) {
            console.error("Token verification error:", error);
            setError("Invalid or expired reset link. Please request a new one.");
            setVerifying(false);
            setTimeout(() => {
              router.push("/auth/forgot-password");
            }, 3000);
            return;
          }

          if (data.session) {
            // Session created successfully, refresh to update auth context
            window.location.reload();
          } else {
            setError("Failed to verify reset link. Please try again.");
            setVerifying(false);
            setTimeout(() => {
              router.push("/auth/forgot-password");
            }, 3000);
          }
        } catch (err) {
          console.error("Recovery token error:", err);
          setError("Failed to verify reset link. Please try again.");
          setVerifying(false);
          setTimeout(() => {
            router.push("/auth/forgot-password");
          }, 3000);
        }
      } else if (!session && !authLoading) {
        // No token and no session - redirect to login
        setVerifying(false);
        router.push("/auth/login");
      } else if (session) {
        // Already have a session
        setVerifying(false);
      } else {
        setVerifying(false);
      }
    };

    handleRecoveryToken();
  }, [searchParams, session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully! Please sign in with your new password.");
      await signOut();
      router.push("/auth/login");
    }
  };

  if (authLoading || verifying) {
    return (
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 70 }}
      >
        <div className="glass rounded-2xl border border-white/20 p-8">
          <div className="mb-4 text-center text-sm text-gray-300">
            {verifying ? "Verifying reset link..." : "Loading..."}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!session && !verifying) {
    return null; // Will redirect
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
            <Button type="submit" variant="glass" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Password"}
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
