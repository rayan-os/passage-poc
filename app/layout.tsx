import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BigFooter from "@/components/BigFooter";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Using Inter as display font (can be swapped for a premium display font later)
const display = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Passage | Infrastructure for Regulated Application Processing",
  description: "Infrastructure that supports regulated, high stakes application processing workflows, where compliance, auditability, fraud controls, and speed matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceMono.variable} ${display.variable} font-sans min-h-screen`}
      >
        <Navigation />
        <main>{children}</main>
        <BigFooter />
      </body>
    </html>
  );
}
