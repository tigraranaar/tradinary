"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen px-4 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Cookie Policy — Tradinary</h1>
          <p className="mb-8 text-gray-400">Last updated: December 10, 2025</p>

          <div className="glass space-y-8 rounded-lg p-8 text-gray-300 md:p-12">
            {/* Introduction */}
            <section>
              <p className="leading-relaxed">
                This Cookie Policy explains how Tradinary uses cookies and similar technologies when
                you visit tradinary.ai or use our SaaS platform. By using our Service, you agree to
                our use of cookies as described in this policy.
              </p>
            </section>

            {/* What Are Cookies */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">1. What Are Cookies</h2>
              <p className="mb-4 leading-relaxed">
                Cookies are small text files stored on your device that help websites remember
                information about your visit. Cookies can improve your experience by:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Remembering your login and preferences</li>
                <li>Analyzing how you use the Service</li>
                <li>Helping us deliver targeted content and improve the platform</li>
              </ul>
            </section>

            {/* Types of Cookies We Use */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">2. Types of Cookies We Use</h2>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">2.1 Essential Cookies</h3>
              <p className="mb-4 leading-relaxed">
                These cookies are necessary for the Service to function properly. They help:
              </p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Maintain user sessions</li>
                <li>Enable basic features like login</li>
              </ul>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">2.2 Analytics Cookies</h3>
              <p className="mb-4 leading-relaxed">
                We use Google Analytics to understand user behavior and improve the Service.
                Analytics cookies collect information about:
              </p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Device type and browser</li>
              </ul>
              <p className="leading-relaxed">These cookies do not personally identify you.</p>

              <h3 className="mt-6 mb-3 text-xl font-medium text-white">2.3 Third-Party Cookies</h3>
              <p className="mb-4 leading-relaxed">
                We may use cookies from third-party services such as:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Google Analytics</li>
                <li>Stripe (for payment processing)</li>
                <li>Google Authentication</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                These third parties may collect and use data according to their own privacy
                policies.
              </p>
            </section>

            {/* How to Manage Cookies */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">3. How to Manage Cookies</h2>
              <p className="mb-4 leading-relaxed">
                You can control cookies through your browser settings. You can:
              </p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                <li>Block or delete cookies</li>
                <li>Clear browsing history</li>
                <li>Set preferences for specific websites</li>
              </ul>
              <p className="leading-relaxed">
                Please note that disabling some cookies may affect the functionality of Tradinary.
              </p>
            </section>

            {/* Changes to This Cookie Policy */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                4. Changes to This Cookie Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on
                this page.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">5. Contact</h2>
              <p className="leading-relaxed">
                If you have questions about our use of cookies, contact us at{" "}
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
