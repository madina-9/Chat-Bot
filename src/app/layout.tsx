import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix AI",
  description: "Your intelligent feline assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
