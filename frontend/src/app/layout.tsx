import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Tradinary - Trade with your AI assistant",
    description: "Trade with your AI assistant.",
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
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
