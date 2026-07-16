import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { getHomeMetadata } from "@/lib/seo";

export const metadata: Metadata = getHomeMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ background: '#fdf8f0', color: '#1a1008' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
