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
  title: "Shaik Riyaz Basha | Full-Stack Developer",
  description:
    "Portfolio of Shaik Riyaz Basha - Full-stack developer specializing in React, Node.js, microservices, and machine learning.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Microservices",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Shaik Riyaz Basha" }],
  openGraph: {
    title: "Shaik Riyaz Basha | Full-Stack Developer",
    description:
      "Interactive portfolio showcasing projects in React, Node.js, and AI",
    url: "https://riyazbasha.dev",
    siteName: "Shaik Riyaz Basha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaik Riyaz Basha | Full-Stack Developer",
    description: "Interactive CLI/GUI portfolio",
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
