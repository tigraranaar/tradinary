import { Metadata } from "next";
import PolicyPageContent from "../components/policy-page-content";
import { privacyData } from "@/lib/data/privacy";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy | Tradinary",
  description:
    "Read Tradinary's Privacy Policy. Learn how we collect, use, and protect your personal information when you use our AI trading assistant platform.",
  openGraph: {
    title: "Privacy Policy | Tradinary",
    description:
      "Read Tradinary's Privacy Policy. Learn how we collect, use, and protect your personal information when you use our AI trading assistant platform.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PolicyPageContent data={privacyData} />;
}
