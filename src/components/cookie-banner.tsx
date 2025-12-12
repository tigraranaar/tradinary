"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaCookie } from "react-icons/fa6";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

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
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed right-0 bottom-0 left-0 z-50 p-4"
        >
          <div className="mx-auto max-w-7xl">
            <div className="glass rounded-2xl border border-white/20 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <FaCookie className="text-2xl text-blue-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">We value your privacy</h3>
                  <p className="text-xs leading-relaxed text-gray-300">
                    We use cookies to enhance your browsing experience, serve personalized content,
                    and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our
                    use of cookies. Read our{" "}
                    <Link
                      href="/cookies"
                      className="text-blue-400 underline transition-colors hover:text-blue-300"
                    >
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-400 underline transition-colors hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>{" "}
                    to learn more.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={declineCookies}
                    className="cursor-pointer rounded-lg border border-white/20 px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 hover:bg-white/10"
                  >
                    Decline
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={acceptCookies}
                    className="cursor-pointer rounded-lg px-6 py-3 font-medium whitespace-nowrap shadow-lg transition-all duration-300"
                    style={{ backgroundColor: "#42457c" }}
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
