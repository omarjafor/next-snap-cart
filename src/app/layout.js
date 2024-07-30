import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnapCart",
  description: "Snap Up Great Deals",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
              <CommonLayout >{children}</CommonLayout>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
