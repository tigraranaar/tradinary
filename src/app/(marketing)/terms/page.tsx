import { Metadata } from "next";
import PolicyPageContent from "@/components/policy-page-content";
import { termsData } from "@/data/terms";

export const metadata: Metadata = {
  title: "Terms of Use | Tradinary",
  description:
    "Read Tradinary's Terms of Use. Understand the terms and conditions for using our AI trading assistant platform, subscription plans, and services.",
  openGraph: {
    title: "Terms of Use | Tradinary",
    description:
      "Read Tradinary's Terms of Use. Understand the terms and conditions for using our AI trading assistant platform, subscription plans, and services.",
  },
};

export default function TermsOfUsePage() {
  return <PolicyPageContent data={termsData} />;
}
