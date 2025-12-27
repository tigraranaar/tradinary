"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "@/contexts/auth-context";
import { validatePasswordAndMatch } from "@/lib/auth/validation";
import { handleGoogleSignInError } from "@/lib/auth/google-signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

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

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      router.push("/auth/login");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signInWithGoogle) {
      setError("Google sign in is not available");
      return;
    }
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      const errorMessage = handleGoogleSignInError(error);
      if (errorMessage) {
        setError(errorMessage);
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  };

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
          Create Account
        </motion.h1>
        <motion.p
          className="mb-8 text-center text-gray-300"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign up to get started with Tradinary
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
            Account created successfully! Redirecting to login...
          </motion.div>
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <Button
            type="button"
            variant="glass"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading || success}
            className="w-full"
          >
            <FaGoogle className="size-5" />
            {googleLoading ? "Signing up..." : "Continue with Google"}
          </Button>
        </motion.div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-transparent px-2 text-gray-400">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
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
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
              Confirm Password
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
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              variant="glass"
              disabled={loading || success || googleLoading}
              className="w-full"
            >
              {loading ? "Creating account..." : success ? "Account Created!" : "Sign Up"}
            </Button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center text-sm text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-white hover:underline">
            Sign in
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
