import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Poppins } from "next/font/google";
import Providers from "./provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

const inter = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie") ?? "";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
