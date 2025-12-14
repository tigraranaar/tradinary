import { Metadata } from "next";
import PolicyPageContent from "@/components/policy-page-content";
import { cookiesData } from "@/data/cookies";

export const metadata: Metadata = {
  title: "Cookie Policy | Tradinary",
  description:
    "Learn how Tradinary uses cookies and similar technologies. Understand our cookie policy, types of cookies we use, and how to manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Tradinary",
    description:
      "Learn how Tradinary uses cookies and similar technologies. Understand our cookie policy, types of cookies we use, and how to manage your cookie preferences.",
  },
};

export default function CookiePolicyPage() {
  return <PolicyPageContent data={cookiesData} />;
}
