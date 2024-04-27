import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSidebar from "@/components/LeftSidebar/page";
import RightSidebar from "@/components/RightSidebar/page";
import Navbar from "@/components/Navbar/page";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={` ${inter.className} w-full bg-backgroundColor `}>
        <header className="relative">
          <Suspense fallback={<p>Loading feed...</p>}>
            <Navbar />
          </Suspense>
        </header>
        <main className="px-4 w-full flex items-start  ">
          <div className="w-1/4">
            <LeftSidebar />
          </div>
          <div className="w-2/4">{children}</div>
          <div className="w-1/4">
            <RightSidebar />
          </div>
        </main>
        <footer>
          <p>Copyright clam @ {Date()}</p>
        </footer>
      </body>
    </html>
  );
}
