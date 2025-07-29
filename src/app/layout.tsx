import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "James Swinehart",
  description: "James Swinehart's Portfolio",
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
