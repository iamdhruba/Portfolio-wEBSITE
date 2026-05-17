import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://iamdhruba.vercel.app'),
  title: 'Dhruba Raj Chaudhary — Full Stack Developer',
  description: 'Interactive macOS-style portfolio of Dhruba Raj Chaudhary — Full Stack Developer based in Kathmandu, Nepal.',
  icons: {
    icon: '/icons/applelogo.svg',
    apple: '/icons/applelogo.svg',
  },
  openGraph: {
    title: 'Dhruba Raj Chaudhary — Full Stack Developer',
    description: 'An interactive macOS-style portfolio. Explore projects, skills, and contact info inside a fully functional browser OS.',
    url: 'https://iamdhruba.vercel.app',
    siteName: 'Dhruba Portfolio OS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dhruba Raj Chaudhary — Portfolio OS',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruba Raj Chaudhary — Full Stack Developer',
    description: 'An interactive macOS-style portfolio. Explore projects, skills, and more.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,600;12..96,800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {/* Block browser-level Ctrl+wheel zoom — beforeInteractive ensures it runs before hydration */}
        <Script id="zoom-block" strategy="beforeInteractive">{`
          document.addEventListener('wheel', function(e) {
            if (e.ctrlKey) { e.preventDefault(); }
          }, { passive: false });
          document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
          document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
          document.addEventListener('gestureend', function(e) { e.preventDefault(); });
        `}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
