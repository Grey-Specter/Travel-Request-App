import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font

export const metadata: Metadata = {
  title: "Travel Request App",
  description: "Submit, Review, and Approve Travel Requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add font to className, also add antialiased and dark mode
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
