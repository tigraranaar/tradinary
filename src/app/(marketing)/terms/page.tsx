import { Metadata } from "next";
import PolicyPageContent from "../components/policy-page-content";
import { termsData } from "@/lib/data/terms";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Use | Tradinary",
  description:
    "Read Tradinary's Terms of Use. Understand the terms and conditions for using our AI trading assistant platform, subscription plans, and services.",
  openGraph: {
    title: "Terms of Use | Tradinary",
    description:
      "Read Tradinary's Terms of Use. Understand the terms and conditions for using our AI trading assistant platform, subscription plans, and services.",
    type: "website",
  },
};

export default function TermsOfUsePage() {
  return <PolicyPageContent data={termsData} />;
}
