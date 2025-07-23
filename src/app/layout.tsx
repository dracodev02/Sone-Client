import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SideBar from "../views/shared/sideBar";
import AppContext from "@/contexts/AppContext";
import ComingSoon from "./comingSoon";

const modernWarfare = localFont({
  src: "./fonts/ModernWarfare.ttf",
  variable: "--font-modern-warfare",
  weight: "100 900",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SONE",
  icons: ["/images/logo.svg"],
  description:
    "Discover and play exciting games on Sone – an entertainment platform connected to the Somnia network, offering valuable rewards for gamers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${modernWarfare.variable} ${montserrat.variable} antialiased`}
      >
        {/* <AppContext> */}
        <ComingSoon />
        {/* <div className="flex">
            <SideBar />
            <div className="flex-1 p-4 overflow-hidden max-w-[1280px] mx-auto">
              {children}
            </div>
          </div> */}
        {/* </AppContext> */}
      </body>
    </html>
  );
}
