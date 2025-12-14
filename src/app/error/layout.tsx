import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | Tradinary",
  description: "An unexpected error occurred. Please try again or contact support.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
