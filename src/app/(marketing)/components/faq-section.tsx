"use client";

import SectionTitle from "./section-title";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { faqData } from "@/lib/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FaqSection() {
  const displayedFaqs = faqData.slice(0, 3);

  return (
    <section className="mt-32">
      <SectionTitle
        title="FAQ's"
        description="Have questions about Tradinary? Find answers to common questions about our AI trading assistant and subscription plans."
      />
      <div className="mx-auto mt-12 w-full max-w-xl">
        <Accordion type="single" collapsible>
          {displayedFaqs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="glass">
          <Link href="/faq">
            See More FAQs
            <FaArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
