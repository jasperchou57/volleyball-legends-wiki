import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const analyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://volleyballlegends.wiki"),
  title: {
    default: "Volleyball Legends Wiki - Codes, Styles, Tier List & Updates",
    template: "%s | Volleyball Legends Wiki",
  },
  description:
    "Volleyball Legends Wiki tracks codes, styles, abilities, ranked notes, update guides, and lightweight tools for Roblox Volleyball Legends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="font-sans antialiased text-white min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 w-full mx-auto flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
