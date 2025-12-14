"use client";

import SectionTitle from "@/components/section-title";
import { FaChevronDown, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqData } from "@/data/faq";

export default function FaqSection() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const displayedFaqs = faqData.slice(0, 3);

  return (
    <section className="mt-32">
      <SectionTitle
        title="FAQ's"
        description="Have questions about Tradinary? Find answers to common questions about our AI trading assistant and subscription plans."
      />
      <div className="mx-auto mt-12 w-full max-w-xl space-y-4">
        {displayedFaqs.map((item, index) => (
          <motion.div
            key={index}
            className="glass flex flex-col rounded-md"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <h3
              className="flex cursor-pointer items-start justify-between gap-4 p-4 font-medium transition hover:bg-white/10"
              onClick={() => setIsOpen(isOpen === index ? null : index)}
            >
              {item.question}
              <FaChevronDown
                className={`size-5 shrink-0 transition-all duration-400 ${isOpen === index ? "rotate-180" : ""}`}
              />
            </h3>
            <p
              className={`overflow-hidden px-4 text-sm/6 transition-all duration-400 ${isOpen === index ? "max-h-80 pt-2 pb-4" : "max-h-0"}`}
            >
              {item.answer}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/faq" className="btn glass flex items-center gap-2 transition-none">
          See More FAQs
          <FaArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
