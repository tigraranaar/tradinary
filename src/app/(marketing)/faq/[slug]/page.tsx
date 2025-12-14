import { faqData } from "@/data/faq";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return faqData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = faqData.find((item) => item.slug === slug);

  if (!faq) {
    notFound();
  }

  return {
    title: `${faq.question} | Tradinary FAQ`,
    description: faq.answer,
    openGraph: {
      title: `${faq.question} | Tradinary FAQ`,
      description: faq.answer,
    },
  };
}

export default async function FAQDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = faqData.findIndex((item) => item.slug === slug);
  const faq = currentIndex !== -1 ? faqData[currentIndex] : null;

  if (!faq) {
    notFound();
  }

  const prevFaq = currentIndex > 0 ? faqData[currentIndex - 1] : null;
  const nextFaq = currentIndex < faqData.length - 1 ? faqData[currentIndex + 1] : null;

  return (
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
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-between"
          aria-label="FAQ navigation"
        >
          {prevFaq ? (
            <Link
              href={`/faq/${prevFaq.slug}`}
              className="glass group flex w-full items-center gap-3 rounded-md p-4 transition-all hover:bg-white/10 sm:w-auto"
              aria-label={`Previous FAQ: ${prevFaq.question}`}
            >
              <FaArrowLeft
                className="size-4 shrink-0 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <div>
                <div className="text-muted-foreground text-xs">Previous</div>
                <div className="font-medium">{prevFaq.question}</div>
              </div>
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}

          {nextFaq ? (
            <Link
              href={`/faq/${nextFaq.slug}`}
              className="glass group ml-auto flex w-full items-center gap-3 rounded-md p-4 transition-all hover:bg-white/10 sm:ml-0 sm:w-auto"
              aria-label={`Next FAQ: ${nextFaq.question}`}
            >
              <div className="text-right">
                <div className="text-muted-foreground text-xs">Next</div>
                <div className="font-medium">{nextFaq.question}</div>
              </div>
              <FaArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </nav>
      </div>
    </main>
  );
}
