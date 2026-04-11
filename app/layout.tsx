import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Maga Shop",
  description: "Promo header and deal banner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f3f3f3]">{children}</body>
    </html>
  );
}
