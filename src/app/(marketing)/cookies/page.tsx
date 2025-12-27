import { Metadata } from "next";
import PolicyPageContent from "../components/policy-page-content";
import { cookiesData } from "@/lib/data/cookies";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy | Tradinary",
  description:
    "Learn how Tradinary uses cookies and similar technologies. Understand our cookie policy, types of cookies we use, and how to manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Tradinary",
    description:
      "Learn how Tradinary uses cookies and similar technologies. Understand our cookie policy, types of cookies we use, and how to manage your cookie preferences.",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return <PolicyPageContent data={cookiesData} />;
}
