import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Masal Diyarı Kreş & Gündüz Bakımevi | Sevgiyle Büyüyen Minik Kalpler",
  description: "1 - 6 Yaş grubu sınıflar, organik beslenme, uzman pedagoglar, zengin etkinlikler ve veli bilgilendirme sistemi ile Masal Diyarı Kreş.",
  authors: [{ name: "Masal Diyarı Kreş ve Gündüz Bakımevi" }],
  creator: "Masal Diyarı Kreş",
  publisher: "Masal Diyarı Kreş",
  other: {
    copyright: "© 2026 Masal Diyarı Kreş ve Gündüz Bakımevi. Tüm Hakları Saklıdır. (5846 Sayılı FSEK)",
    "rights-protected": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#fffdf9] text-slate-800`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
