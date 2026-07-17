import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaik Riyaz Basha | Backend & Distributed Systems Engineer",
  description:
    "Portfolio of Shaik Riyaz Basha - AWS Certified Solutions Architect specializing in backend engineering, distributed systems, microservices, and system design (LLD/HLD).",
  keywords: [
    "Backend Engineer",
    "Distributed Systems",
    "Node.js",
    "Microservices",
    "AWS Certified Solutions Architect",
    "System Design",
    "Cloud Architecture",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Shaik Riyaz Basha" }],
  openGraph: {
    title: "Shaik Riyaz Basha | Backend & Distributed Systems Engineer",
    description:
      "AWS Certified Solutions Architect building scalable distributed systems and cloud-native applications.",
    url: "https://riyazbasha.dev",
    siteName: "Shaik Riyaz Basha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaik Riyaz Basha | Backend & Distributed Systems Engineer",
    description: "AWS Certified Solutions Architect | Distributed Systems | Node.js | Microservices",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
