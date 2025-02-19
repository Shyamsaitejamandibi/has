import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iitmhas.com"),
  title: "IIT Madras Hostel Automation System",
  description:
    "Official food ordering and canteen management system for IIT Madras hostels",
  keywords: [
    "IIT Madras",
    "hostel automation",
    "food ordering",
    "canteen management",
    "mess management",
    "student portal",
  ],
  authors: [
    {
      name: "IIT Madras Hostel Affairs",
      url: "https://iitmhas.com",
    },
  ],
  openGraph: {
    title: "IIT Madras Hostel Automation System",
    description:
      "Official food ordering and canteen management system for IIT Madras hostels",
    url: "https://iitmhas.com",
    siteName: "IIT Madras HAS",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
