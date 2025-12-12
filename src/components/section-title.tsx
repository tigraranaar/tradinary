"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  description: string;
}

export default function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="text-center">
      <motion.h2
        className="mx-auto mt-4 max-w-lg text-3xl font-semibold text-white"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mx-auto mt-4 max-w-md text-center text-sm/7 text-gray-100"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
