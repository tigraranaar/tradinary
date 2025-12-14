import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tradinary",
  description:
    "Get in touch with Tradinary. Have a question or want to work together? We'd love to hear from you. Contact our support team.",
  openGraph: {
    title: "Contact Us | Tradinary",
    description:
      "Get in touch with Tradinary. Have a question or want to work together? We'd love to hear from you. Contact our support team.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
