'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        const { error } = await resetPassword(email);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 70 }}
                >
                    <div className="glass rounded-2xl p-8 border border-white/20">
                        <motion.h1
                            className="text-3xl font-semibold text-center mb-2"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            Reset Password
                        </motion.h1>
                        <motion.p
                            className="text-gray-300 text-center mb-8"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Enter your email address and we&apos;ll send you a link to reset your password
                        </motion.p>

                        {error && (
                            <motion.div
                                className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                Check your email for a password reset link!
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition"
                                    placeholder="you@example.com"
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={loading || success}
                                className="btn glass w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {loading ? 'Sending...' : success ? 'Email Sent!' : 'Send Reset Link'}
                            </motion.button>
                        </form>

                        <motion.div
                            className="mt-6 text-center text-sm text-gray-300"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Remember your password?{' '}
                            <Link href="/auth/login" className="text-white hover:underline font-medium">
                                Sign in
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
    );
}