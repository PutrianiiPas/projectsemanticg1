
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import {
  inclusiveSans,
  jetBrainsMono,
  libertinusSerif,
} from "./fonts";

export const metadata: Metadata = {
  title: "BPMN Impact Analyzer",
  description:
    "BPMN Change Impact Mapping with Semantic Retrieval",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inclusiveSans.variable} ${libertinusSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}