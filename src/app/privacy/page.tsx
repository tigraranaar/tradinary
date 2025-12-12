"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-4 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Privacy Policy — Tradinary</h1>
          <p className="mb-8 text-gray-400">Last updated: December 10, 2025</p>

          <div className="glass space-y-8 rounded-lg p-8 text-gray-300 md:p-12">
            {/* Introduction */}
            <section>
              <p className="leading-relaxed">
                This Privacy Policy explains how Tradinary collects, uses, and protects your
                personal information when you use our website tradinary.ai and our SaaS platform. By
                using our Service, you agree to the practices described in this Privacy Policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">1. Information We Collect</h2>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">1.1 Personal Information</h3>
              <p className="mb-4 leading-relaxed">When you use Tradinary, we may collect:</p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Your email address</li>
                <li>Account information provided during sign-up</li>
              </ul>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">1.2 Cookies and Tracking</h3>
              <p className="mb-4 leading-relaxed">We use cookies and similar technologies to:</p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Maintain user sessions</li>
                <li>Improve platform performance</li>
                <li>Remember user preferences</li>
              </ul>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">1.3 Google Analytics</h3>
              <p className="mb-4 leading-relaxed">
                We use Google Analytics to understand how users interact with Tradinary. Google
                Analytics may collect:
              </p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Device information</li>
                <li>Browsing actions and interactions</li>
              </ul>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">1.4 Third-Party Services</h3>
              <p className="leading-relaxed">We integrate with third-party services including:</p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Stripe (for payments)</li>
                <li>Google Authentication (for login)</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                These services may collect and process data according to their own privacy policies.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                2. How We Use Your Information
              </h2>
              <p className="mb-4 leading-relaxed">We use your data to:</p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Provide and operate the Service</li>
                <li>Manage user accounts and subscriptions</li>
                <li>Improve platform features and user experience</li>
                <li>Communicate with users</li>
                <li>Ensure security and prevent abuse</li>
              </ul>
            </section>

            {/* Sharing and Disclosure */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">3. Sharing and Disclosure</h2>
              <p className="mb-4 leading-relaxed">
                We do not sell personal information. We may share data with:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Service providers like Stripe or Google for operation purposes</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">4. Data Retention</h2>
              <p className="leading-relaxed">
                We keep personal data only as long as necessary to provide the Service, comply with
                legal obligations, and resolve disputes.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">5. User Rights</h2>
              <p className="mb-4 leading-relaxed">
                You can contact us through{" "}
                <Link href="/contact" className="text-white hover:underline">
                  tradinary.ai/contact
                </Link>{" "}
                to:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Access your data</li>
                <li>Correct or update your information</li>
                <li>Delete your account and personal data</li>
              </ul>
            </section>

            {/* Security */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">6. Security</h2>
              <p className="leading-relaxed">
                We use reasonable measures to protect your data from unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">7. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy occasionally. Changes will be posted on this page.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">8. Contact</h2>
              <p className="leading-relaxed">
                If you have questions about your data, reach us at{" "}
                <Link href="/contact" className="text-white hover:underline">
                  tradinary.ai/contact
                </Link>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
