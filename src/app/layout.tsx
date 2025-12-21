import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/lib/env/server";
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tradinary - Trade with your AI assistant",
  description:
    "Trade smarter with Tradinary's AI-powered trading signals. Get real-time market analysis, automated signals, and intelligent insights to enhance your trading strategy.",
  appleWebApp: {
    title: "Tradinary - Trade with your AI assistant",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable} suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <div className="pb-40">{children}</div>
          <Footer />
          <CookieBanner />
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
