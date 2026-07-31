import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host ?? "localhost:3000"}`);
  const image = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: {
      default: "Gramax Property Management",
      template: "%s | Gramax Property Management",
    },
    description:
      "Residential and commercial property letting, management, compliance and tenant support in New Zealand.",
    icons: {
      icon: "/brand/gramax-logo-en.png",
      shortcut: "/brand/gramax-logo-en.png",
      apple: "/brand/gramax-logo-en.png",
    },
    openGraph: {
      title: "Gramax Property Management",
      description: "Professional property management. Clear, compliant, dependable.",
      type: "website",
      images: [{ url: image, width: 1729, height: 910, alt: "Gramax Property Management" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gramax Property Management",
      description: "Professional property management. Clear, compliant, dependable.",
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
