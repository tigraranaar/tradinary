'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfUsePage() {
    return (
        <main className='px-4 md:px-16 lg:px-24 min-h-screen'>
                <div className='max-w-4xl mx-auto py-20'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold mb-4'>
                            Terms of Use — Tradinary
                        </h1>
                        <p className='text-gray-400 mb-8'>
                            Last updated: December 10, 2025
                        </p>

                        <div className='glass p-8 md:p-12 rounded-lg space-y-8 text-gray-300'>
                            {/* Introduction */}
                            <section>
                                <p className='leading-relaxed'>
                                    These Terms of Use govern your access to and use of Tradinary and its website tradinary.ai. By using Tradinary, you agree to these Terms.
                                </p>
                            </section>

                            {/* Acceptance of Terms */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>1. Acceptance of Terms</h2>
                                <p className='leading-relaxed'>
                                    By using Tradinary, you confirm you agree to these Terms. There are no age restrictions for our Service.
                                </p>
                            </section>

                            {/* Service Description */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>2. Service Description</h2>
                                <p className='leading-relaxed'>
                                    Tradinary is a software-as-a-service platform offering free and paid subscription plans: Free, Pro, and Enterprise. The Service may be updated or modified at any time.
                                </p>
                            </section>

                            {/* User Accounts */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>3. User Accounts</h2>
                                <p className='leading-relaxed mb-4'>
                                    You are responsible for:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
                                    <li>Providing accurate information</li>
                                    <li>Maintaining the security of your login credentials</li>
                                    <li>All actions taken under your account</li>
                                </ul>
                                <p className='leading-relaxed'>
                                    Accounts may be suspended for suspicious or abusive behavior.
                                </p>
                            </section>

                            {/* Subscription and Payments */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>4. Subscription and Payments</h2>
                                <ul className='list-disc list-inside space-y-2 ml-4'>
                                    <li>Paid plans are processed through Stripe.</li>
                                    <li>Subscriptions renew automatically unless canceled.</li>
                                    <li>You can cancel or request account deletion through our support.</li>
                                </ul>
                            </section>

                            {/* Acceptable Use */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>5. Acceptable Use</h2>
                                <p className='leading-relaxed mb-4'>
                                    You agree not to:
                                </p>
                                <ul className='list-disc list-inside space-y-2 ml-4'>
                                    <li>Use the Service for illegal activities</li>
                                    <li>Interfere with the Service&apos;s operation</li>
                                    <li>Attempt unauthorized access to systems</li>
                                    <li>Upload harmful or malicious content</li>
                                </ul>
                            </section>

                            {/* Intellectual Property */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>6. Intellectual Property</h2>
                                <p className='leading-relaxed'>
                                    All content, software, and materials are property of Tradinary or its licensors. You may not copy, modify, or distribute them without permission.
                                </p>
                            </section>

                            {/* Termination */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>7. Termination</h2>
                                <p className='leading-relaxed'>
                                    We may suspend or terminate your account if you violate these Terms. You may stop using the Service at any time.
                                </p>
                            </section>

                            {/* Disclaimer of Warranties */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>8. Disclaimer of Warranties</h2>
                                <p className='leading-relaxed'>
                                    Tradinary is provided &ldquo;as is&rdquo; without warranties. We do not guarantee uninterrupted or error-free service.
                                </p>
                            </section>

                            {/* Limitation of Liability */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>9. Limitation of Liability</h2>
                                <p className='leading-relaxed'>
                                    Tradinary is not liable for indirect damages, data loss, or service interruptions. Your sole remedy is to stop using the Service.
                                </p>
                            </section>

                            {/* Governing Law */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>10. Governing Law</h2>
                                <p className='leading-relaxed'>
                                    These Terms are governed by the laws of the Republic of Armenia.
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>11. Changes to Terms</h2>
                                <p className='leading-relaxed'>
                                    We may update these Terms. Continued use of Tradinary after updates means you accept the revised Terms.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className='text-2xl font-semibold text-white mb-4'>12. Contact</h2>
                                <p className='leading-relaxed'>
                                    For questions about these Terms, reach us at <Link href='/contact' className='text-white hover:underline'>tradinary.ai/contact</Link>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
    );
}
