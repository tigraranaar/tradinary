"use client";

import { FaCirclePlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import VideoBackground from "@/components/video-background";

export default function HeroSection() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <>
      <VideoBackground />

      <motion.section className="flex flex-col items-center">
        <motion.div
          className="mt-32 flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 320,
            damping: 70,
            mass: 1,
          }}
        >
          <p>AI-Powered Trading Signals</p>
          <button className="btn glass px-3 py-1 text-xs">Free Plan</button>
        </motion.div>
        <motion.h1
          className="mt-4 max-w-3xl text-center text-4xl/13 font-semibold tracking-tight md:text-6xl/19"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          Make Smarter Trading Decisions with AI
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-center text-base/7 text-gray-100"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 320,
            damping: 70,
            mass: 1,
          }}
        >
          Get instant buy, sell, and hold signals powered by technical analysis and machine
          learning. Trade with confidence.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col items-center gap-4 max-md:w-full md:flex-row md:gap-3"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <button
            onClick={() => {
              if (!loading) {
                if (user) {
                  router.push("/dashboard");
                } else {
                  router.push("/auth/signup");
                }
              }
            }}
            className="btn glass py-3 max-md:w-full"
          >
            {!loading && user ? "Go to Dashboard" : "Get Started Free"}
          </button>
          <button className="btn glass flex items-center justify-center gap-2 py-3 max-md:w-full">
            <FaCirclePlay className="size-4.5" />
            Watch Demo
          </button>
        </motion.div>
      </motion.section>
    </>
  );
}
