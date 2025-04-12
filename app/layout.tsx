import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ReactLenis } from "@/components/providers/lenis-provider";

const dmSans = DM_Sans({
  
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OneSystem",
  description: "Biznesingiz kelajagiga bo'lgan ilk qadamni biz bilan boshlang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${dmSans.className} antialiased bg-slate-50/70`}>
            {children}
        </body>
      </ReactLenis>
    </html>
  );
}
