import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Advice Generator",
  description: "FrontEnd Mentor Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} w-screen h-screen flex justify-center items-center`}
      >
        {children}
      </body>
    </html>
  );
}
