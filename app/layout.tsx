import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Noto_Sans } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Merienda } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "cyrillic"],
});

const merienda = Merienda({
  variable: "--font-merienda",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "harmoniq",
  description: "Find your harmony in community",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${dmSans.variable} ${notoSans.variable} ${merienda.variable}`}
    >
      <body>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
