"use client";

import { FaArrowRight, FaChartLine } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // For authenticated users
  if (!loading && user) {
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
          Welcome back, {user.email?.split("@")[0]}!
        </motion.h2>
        <motion.p
          className="mt-4 max-w-md text-sm/7"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
        >
          Access your trading signals and analytics. Get AI-powered insights to make smarter trading
          decisions.
        </motion.p>
        <motion.button
          onClick={() => router.push("/dashboard")}
          className="btn glass mt-8 flex items-center gap-2 transition-none"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          Go to Dashboard
          <FaChartLine className="size-4" />
        </motion.button>
      </motion.div>
    );
  }

  // For non-authenticated users
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
        Ready to start trading smarter?
      </motion.h2>
      <motion.p
        className="mt-4 max-w-md text-sm/7"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
      >
        Get AI-powered trading signals and make informed decisions. Start with our free plan, no
        credit card required.
      </motion.p>
      <motion.button
        onClick={() => router.push("/auth/signup")}
        className="btn glass mt-8 flex items-center gap-2 transition-none"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        Get Started Free
        <FaArrowRight className="size-4" />
      </motion.button>
    </motion.div>
  );
}
