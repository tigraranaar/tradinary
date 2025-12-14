import { faqData } from "@/data/faq";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Metadata } from "next";
import PageTitle from "@/components/page-title";

const PREVIEW_LENGTH = 150;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Tradinary",
  description:
    "Find answers to common questions about Tradinary's AI trading assistant, subscription plans, features, and how to get started with smart trading.",
  openGraph: {
    title: "Frequently Asked Questions | Tradinary",
    description:
      "Find answers to common questions about Tradinary's AI trading assistant, subscription plans, features, and how to get started with smart trading.",
  },
};

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength).trim()}...`;
}

export default function FAQPage() {
  return (
    <main className="min-h-screen px-4 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl py-20">
        <PageTitle
          title="FAQ — Tradinary"
          subtitle="Everything you need to know about Tradinary. Can't find what you're looking for? Contact our support team."
        />

        <section className="mt-12 space-y-4" aria-label="Frequently asked questions">
          {faqData.map((item) => (
            <Link
              key={item.slug}
              href={`/faq/${item.slug}`}
              className="glass group flex items-center justify-between gap-4 rounded-md p-6 transition-all hover:bg-white/15"
              aria-label={`Read answer to: ${item.question}`}
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.question}</h3>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm/6">
                  {truncateText(item.answer, PREVIEW_LENGTH)}
                </p>
              </div>
              <FaArrowRight
                className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
