'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiePolicyPage() {
    return (
        <main className='px-4 md:px-16 lg:px-24 min-h-screen'>
                <div className='max-w-4xl mx-auto py-20'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold mb-4'>
                            Cookie Policy — Tradinary
                        </h1>
                        <p className='text-gray-400 mb-8'>
                            Last updated: December 10, 2025
                        </p>

                        <div className='glass p-8 md:p-12 rounded-lg space-y-8 text-gray-300'>
                            {/* Introduction */}
                            <section>
                                <p className='leading-relaxed'>
                                    This Cookie Policy explains how Tradinary uses cookies and similar technologies when you visit tradinary.ai or use our SaaS platform. By using our Service, you agree to our use of cookies as described in this policy.
                                </p>
                            </section>

                            {/* What Are Cookies */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>1. What Are Cookies</h2>
                                <p className='leading-relaxed mb-4'>
                                    Cookies are small text files stored on your device that help websites remember information about your visit. Cookies can improve your experience by:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4'>
                                    <li>Remembering your login and preferences</li>
                                    <li>Analyzing how you use the Service</li>
                                    <li>Helping us deliver targeted content and improve the platform</li>
                                </ul>
                            </section>

                            {/* Types of Cookies We Use */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>2. Types of Cookies We Use</h2>
                                
                                <h3 className='text-xl font-medium text-white mb-3 mt-6'>2.1 Essential Cookies</h3>
                                <p className='leading-relaxed mb-4'>
                                    These cookies are necessary for the Service to function properly. They help:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
                                    <li>Maintain user sessions</li>
                                    <li>Enable basic features like login</li>
                                </ul>

                                <h3 className='text-xl font-medium text-white mb-3 mt-6'>2.2 Analytics Cookies</h3>
                                <p className='leading-relaxed mb-4'>
                                    We use Google Analytics to understand user behavior and improve the Service. Analytics cookies collect information about:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
                                    <li>Pages visited</li>
                                    <li>Time spent on pages</li>
                                    <li>Device type and browser</li>
                                </ul>
                                <p className='leading-relaxed'>
                                    These cookies do not personally identify you.
                                </p>

                                <h3 className='text-xl font-medium text-white mb-3 mt-6'>2.3 Third-Party Cookies</h3>
                                <p className='leading-relaxed mb-4'>
                                    We may use cookies from third-party services such as:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4'>
                                    <li>Google Analytics</li>
                                    <li>Stripe (for payment processing)</li>
                                    <li>Google Authentication</li>
                                </ul>
                                <p className='leading-relaxed mt-4'>
                                    These third parties may collect and use data according to their own privacy policies.
                                </p>
                            </section>

                            {/* How to Manage Cookies */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>3. How to Manage Cookies</h2>
                                <p className='leading-relaxed mb-4'>
                                    You can control cookies through your browser settings. You can:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
                                    <li>Block or delete cookies</li>
                                    <li>Clear browsing history</li>
                                    <li>Set preferences for specific websites</li>
                                </ul>
                                <p className='leading-relaxed'>
                                    Please note that disabling some cookies may affect the functionality of Tradinary.
                                </p>
                            </section>

                            {/* Changes to This Cookie Policy */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>4. Changes to This Cookie Policy</h2>
                                <p className='leading-relaxed'>
                                    We may update this Cookie Policy from time to time. Any changes will be posted on this page.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>5. Contact</h2>
                                <p className='leading-relaxed'>
                                    If you have questions about our use of cookies, contact us at <Link href='/contact' className='text-white hover:underline'>tradinary.ai/contact</Link>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
    );
}
