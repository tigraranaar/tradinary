'use client';

import { useState, useEffect, startTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'auth_failed') {
            startTransition(() => {
                setError('Authentication failed. Please try again.');
            });
        } else if (errorParam === 'callback_failed') {
            startTransition(() => {
                setError('Sign in process failed. Please try again.');
            });
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    const handleGoogleSignIn = async () => {
        if (!signInWithGoogle) {
            setError('Google sign in is not available');
            return;
        }
        setError(null);
        setGoogleLoading(true);
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                // More user-friendly error message for disabled provider
                if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
                    setError('Google sign in is not configured. Please contact support.');
                } else {
                    setError(error.message);
                }
                setGoogleLoading(false);
            }
        } catch (err) {
            console.error('Error signing in with Google:', err);
            setError('Failed to sign in with Google. Please try again.');
            setGoogleLoading(false);
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
                            Welcome Back
                        </motion.h1>
                        <motion.p
                            className="text-gray-300 text-center mb-8"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Sign in to your account to continue
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

                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="mb-6"
                        >
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading || loading}
                                className="btn glass w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                {googleLoading ? 'Signing in...' : 'Continue with Google'}
                            </button>
                        </motion.div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-400">Or continue with email</span>
                            </div>
                        </div>

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

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition"
                                    placeholder="••••••••"
                                />
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-between"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    Forgot password?
                                </Link>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="btn glass w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </motion.button>
                        </form>

                        <motion.div
                            className="mt-6 text-center text-sm text-gray-300"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/signup" className="text-white hover:underline font-medium">
                                Sign up
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <main className="flex min-h-screen items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="glass rounded-2xl p-8 border border-white/20">
                        <div className="text-center text-gray-300">Loading...</div>
                    </div>
                </div>
            </main>
        }>
            <LoginForm />
        </Suspense>
    );
}