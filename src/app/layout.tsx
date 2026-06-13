import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://physio-mauricie.vercel.app"),
  title: "Clinique Physio Mauricie | Cap-de-la-Madeleine",
  description:
    "Clinique de physiothérapie à Cap-de-la-Madeleine. Physiothérapie générale, réhabilitation, thérapie sportive, massothérapie. Prise de rendez-vous en ligne 24/7.",
  keywords: [
    "physiothérapie Cap-de-la-Madeleine",
    "clinique physio Mauricie",
    "rendez-vous physiothérapie",
    "massothérapie Québec",
  ],
  openGraph: {
    title: "Clinique Physio Mauricie",
    description: "Physiothérapie professionnelle à Cap-de-la-Madeleine, Québec.",
    locale: "fr_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
