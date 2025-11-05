import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decision Maker - Compare Options Intelligently",
  description: "AI-powered decision comparison tool with personalized priority weighting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
