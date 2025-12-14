"use client";

import { FaArrowRight, FaChartLine } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function CallToAction() {
  const { user, loading } = useAuth();

  const isAuthenticated = !loading && user;

  const content = isAuthenticated
    ? {
        title: `Welcome back, ${user.email?.split("@")[0]}!`,
        description:
          "Access your trading signals and analytics. Get AI-powered insights to make smarter trading decisions.",
        buttonText: "Go to Dashboard",
        buttonIcon: FaChartLine,
        href: "/dashboard",
        ariaLabel: "Navigate to dashboard",
      }
    : {
        title: "Ready to start trading smarter?",
        description:
          "Get AI-powered trading signals and make informed decisions. Start with our free plan, no credit card required.",
        buttonText: "Get Started Free",
        buttonIcon: FaArrowRight,
        href: "/auth/signup",
        ariaLabel: "Sign up to get started",
      };

  const ButtonIcon = content.buttonIcon;

  return (
    <motion.div
      className="glass mx-auto mt-40 flex max-w-5xl flex-col items-center justify-center rounded-xl px-4 py-16 text-center"
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
    >
      <motion.h2
        className="mt-2 text-2xl font-medium md:text-4xl"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        {content.title}
      </motion.h2>
      <motion.p
        className="mt-4 max-w-md text-sm/7"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
      >
        {content.description}
      </motion.p>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <Link
          href={content.href}
          aria-label={content.ariaLabel}
          className="btn glass mt-8 flex items-center gap-2 transition-none"
        >
          {content.buttonText}
          <ButtonIcon className="size-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
