import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charis Belle | Nails & Makeup Artist",
  description:
    "Premium nail art, makeup artistry, and beauty services in Harare. Acrylic nails, gel manicures, bridal makeup, and more. Book your appointment today!",
  keywords: ["nails", "makeup", "nail art", "bridal makeup", "beauty", "salon", "Harare", "Charis Belle"],
  icons: {
    icon: "/CharisBelleLogo.webp",
    shortcut: "/CharisBelleLogo.webp",
    apple: "/CharisBelleLogo.webp",
  },
  openGraph: {
    title: "Charis Belle | Nails & Makeup Artist",
    description: "Premium nail art and makeup services in Harare. Book your appointment today!",
    type: "website",
    images: ["/CharisBelleLogo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
