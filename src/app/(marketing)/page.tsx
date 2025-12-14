import CallToAction from "@/sections/call-to-action";
import FaqSection from "@/sections/faq-section";
import Features from "@/sections/features";
import HeroSection from "@/sections/hero-section";
import PricingPlans from "@/sections/pricing-plans";
import WorkflowSteps from "@/sections/workflow-steps";
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

export default function Page() {
  return (
    <main className="px-4">
      <HeroSection />
      <Features />
      <WorkflowSteps />
      <FaqSection />
      <PricingPlans />
      <CallToAction />
    </main>
  );
}
