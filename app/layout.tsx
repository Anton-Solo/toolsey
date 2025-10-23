import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Link from "next/link";
import { ZohoDeskWidget } from "@/components/common/ZohoDeskWidget";
import { Toaster } from "sonner";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolsey.vercel.app'),
  openGraph: {
    siteName: 'Toolsey',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${jakarta.variable} antialiased`}
      >
        <SpeedInsights/>
        <ZohoDeskWidget />
        <Toaster position="top-right" richColors />
        <ErrorBoundary>
          <section className="flex items-center justify-center h-[40px] bg-foreground">
            <Link href="/pricing" className="flex group text-standart-white text-sm gap-1">
              <span className=" group-hover:no-underline underline">Get now</span>
              <span className="group-hover:block">
                7 day Premium trial.
              </span>
            </Link>
          </section>
          <Header />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
