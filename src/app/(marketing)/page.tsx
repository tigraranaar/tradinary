import CallToAction from "./components/call-to-action";
import FaqSection from "./components/faq-section";
import Features from "./components/features";
import HeroAction from "./components/hero-action";
import HeroSection from "./components/hero-section";
import PricingPlans from "./components/pricing-plans";
import WorkflowSteps from "./components/workflow-steps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tradinary — AI Trading Assistant | Smart Trading Made Simple",
  description:
    "Trade smarter with Tradinary's AI-powered trading assistant. Get real-time buy, sell, and hold signals with technical analysis and machine learning. Start free today.",
  openGraph: {
    title: "Tradinary — AI Trading Assistant | Smart Trading Made Simple",
    description:
      "Trade smarter with Tradinary's AI-powered trading assistant. Get real-time buy, sell, and hold signals with technical analysis and machine learning. Start free today.",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tradinary",
  description:
    "AI-powered trading assistant providing real-time buy, sell, and hold signals with technical analysis and machine learning.",
  url: "https://tradinary.ai",
  logo: "https://tradinary.ai/assets/logo.svg",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: "https://tradinary.ai/contact",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tradinary",
  url: "https://tradinary.ai",
  description:
    "AI-powered trading assistant providing real-time trading signals with technical analysis and machine learning.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://tradinary.ai/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tradinary",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "29",
    offerCount: "3",
  },
  description:
    "AI-powered trading assistant providing real-time buy, sell, and hold signals with technical analysis and machine learning.",
  url: "https://tradinary.ai",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <main className="px-4">
        <HeroSection />
        <HeroAction />
        <Features />
        <WorkflowSteps />
        <FaqSection />
        <PricingPlans />
        <CallToAction />
      </main>
    </>
  );
}
