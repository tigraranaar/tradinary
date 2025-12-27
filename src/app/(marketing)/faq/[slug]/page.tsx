import { faqData, type FAQItem } from "@/lib/data/faq";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface FAQWithNeighbors {
  faq: FAQItem;
  prevFaq: FAQItem | null;
  nextFaq: FAQItem | null;
}

function getFaqWithNeighbors(slug: string): FAQWithNeighbors | null {
  const currentIndex = faqData.findIndex((item) => item.slug === slug);

  if (currentIndex === -1) {
    return null;
  }

  return {
    faq: faqData[currentIndex],
    prevFaq: currentIndex > 0 ? faqData[currentIndex - 1] : null,
    nextFaq: currentIndex < faqData.length - 1 ? faqData[currentIndex + 1] : null,
  };
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return faqData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getFaqWithNeighbors(slug);

  if (!result) {
    notFound();
  }

  const { faq } = result;
  const url = `https://tradinary.ai/faq/${slug}`;

  return {
    title: `${faq.question} | Tradinary FAQ`,
    description: faq.answer,
    openGraph: {
      title: `${faq.question} | Tradinary FAQ`,
      description: faq.answer,
      type: "website",
      url,
    },
  };
}

export default async function FAQDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getFaqWithNeighbors(slug);

  if (!result) {
    notFound();
  }

  const { faq, prevFaq, nextFaq } = result;
  const url = `https://tradinary.ai/faq/${slug}`;

  const questionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
    url,
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tradinary.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://tradinary.ai/faq",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: faq.question,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(questionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <main className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/faq"
            className="text-muted-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
            aria-label="Back to all frequently asked questions"
          >
            <FaArrowLeft className="size-4" aria-hidden="true" />
            Back to all FAQs
          </Link>

          <article className="glass rounded-xl p-8 md:min-h-[300px]">
            <h1 className="text-3xl font-bold md:text-4xl">{faq.question}</h1>
            <div className="text-muted-foreground mt-6 space-y-4 text-base/7">
              <p>{faq.answer}</p>
            </div>
          </article>

          <nav
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6"
            aria-label="FAQ navigation"
          >
            {prevFaq ? (
              <Link
                href={`/faq/${prevFaq.slug}`}
                className="glass group flex w-full items-center gap-3 rounded-md p-4 transition-all hover:bg-white/10 sm:flex-1"
                aria-label={`Previous FAQ: ${prevFaq.question}`}
              >
                <FaArrowLeft
                  className="size-4 shrink-0 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground text-xs">Previous</div>
                  <div className="truncate font-medium">{prevFaq.question}</div>
                </div>
              </Link>
            ) : (
              <div className="sm:flex-1" aria-hidden="true" />
            )}

            {nextFaq ? (
              <Link
                href={`/faq/${nextFaq.slug}`}
                className="glass group flex w-full items-center gap-3 rounded-md p-4 transition-all hover:bg-white/10 sm:flex-1 sm:flex-row-reverse"
                aria-label={`Next FAQ: ${nextFaq.question}`}
              >
                <FaArrowRight
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1 text-right">
                  <div className="text-muted-foreground text-xs">Next</div>
                  <div className="truncate font-medium">{nextFaq.question}</div>
                </div>
              </Link>
            ) : (
              <div className="sm:flex-1" aria-hidden="true" />
            )}
          </nav>
        </div>
      </main>
    </>
  );
}
