'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Handle OAuth callback from Supabase
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Auth error:', error);
                    router.push('/auth/login?error=auth_failed');
                    return;
                }

                // Check if there are hash parameters from OAuth redirect
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');
                const errorParam = hashParams.get('error');

                if (errorParam) {
                    console.error('OAuth error:', errorParam);
                    router.push(`/auth/login?error=${encodeURIComponent(errorParam)}`);
                    return;
                }

                if (data.session || accessToken) {
                    // Successful authentication
                    router.push('/');
                    router.refresh();
                } else {
                    // No session, redirect to login
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Callback error:', error);
                router.push('/auth/login?error=callback_failed');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="glass rounded-2xl p-8 border border-white/20">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Completing sign in...</p>
                    <p className="text-sm text-gray-300 mt-2">Please wait</p>
                </div>
            </motion.div>
        </div>
    );
}