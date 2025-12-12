'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaCookie } from 'react-icons/fa6';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

export default function CookieBanner() {
    const { consent, acceptCookies, declineCookies } = useCookieConsent();

    // Don't show banner if user already made a choice
    if (consent !== false) {
        return null;
    }

    return (
        <AnimatePresence>
            {consent === false && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="glass border border-white/20 rounded-2xl p-4  shadow-2xl backdrop-blur-xl">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                        <FaCookie className="text-2xl text-blue-400" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                                        We value your privacy
                                    </h3>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                                        By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{' '}
                                        <Link href="/cookies" className="text-blue-400 hover:text-blue-300 underline transition-colors">
                                            Cookie Policy
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline transition-colors">
                                            Privacy Policy
                                        </Link>{' '}
                                        to learn more.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={declineCookies}
                                        className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300 whitespace-nowrap font-medium cursor-pointer"
                                    >
                                        Decline
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={acceptCookies}
                                        className="px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap font-medium shadow-lg cursor-pointer"
                                        style={{ backgroundColor: '#42457c' }}
                                    >
                                        Accept All
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
