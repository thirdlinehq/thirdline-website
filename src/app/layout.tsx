import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thirdline — Advice when you need it",
  description:
    "You have a problem. Someone has solved it. Get practical advice from people who have overcome the challenge you’re dealing with. Waitlist open.",
  openGraph: {
    title: "Thirdline — Advice when you need it",
    description:
      "Find the right experience for the decision in front of you, and move forward with greater clarity.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
