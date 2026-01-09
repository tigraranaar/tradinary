"use client";

import { FaCirclePlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function HeroAction() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex max-w-xl flex-col items-center justify-center gap-4 max-md:w-full md:flex-row md:gap-3"
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
        {/* <button className="btn glass flex items-center justify-center gap-2 py-3 max-md:w-full">
          <FaCirclePlay className="size-4.5" />
          Watch Demo
        </button> */}
      </motion.div>
    </>
  );
}
