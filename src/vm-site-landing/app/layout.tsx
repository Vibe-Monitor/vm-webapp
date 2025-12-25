import type { Metadata } from "next";
import { Source_Sans_3, Manrope } from "next/font/google";
import Script from 'next/script';
import '../types/global';

import Header from "@/vm-site-landing/components/Header";
import Footer from "@/vm-site-landing/components/Footer";
import { PostHogProvider } from "@/vm-site-landing/components/PostHogProvider";
import { siteDetails } from '@/vm-site-landing/data/siteDetails';

import "./globals.css";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl),
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  keywords: ['observability', 'AI', 'incident resolution', 'MTTR', 'monitoring', 'engineering tools', 'DevOps'],
  authors: [{ name: 'Ankesh Khemani' }],
  creator: 'Ankesh Khemani',
  publisher: 'VibeMonitor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/vibemonitor-logo-optimized.png',
    shortcut: '/images/vibemonitor-logo-optimized.png',
    apple: '/images/vibemonitor-logo-optimized.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteDetails.siteUrl,
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    siteName: siteDetails.siteName,
    images: [
      {
        url: '/images/vm-logo.png',
        width: 1200,
        height: 630,
        alt: `${siteDetails.siteName} - AI Assisted Observability`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    site: '@vibemonitor',
    creator: '@ankeshkhemani',
    images: [
      {
        url: '/images/vm-logo.png',
        alt: `${siteDetails.siteName} - AI Assisted Observability`,
      },
    ],
  },
  verification: {
    google: '', // Add Google Search Console verification code when ready
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        <PostHogProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </PostHogProvider>
        <Script 
          src="https://tally.so/widgets/embed.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
