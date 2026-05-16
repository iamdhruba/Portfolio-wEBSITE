import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dhruba Raj Chaudhary — Full Stack Developer',
  description: 'Interactive macOS portfolio of Dhruba Raj Chaudhary.',
  icons: {
    icon: '/icons/applelogo.svg',
    apple: '/icons/applelogo.svg',
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
        {/* Block browser-level Ctrl+wheel zoom — must be inline so it runs before React hydration */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('wheel', function(e) {
            if (e.ctrlKey) { e.preventDefault(); }
          }, { passive: false });
          document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
          document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
          document.addEventListener('gestureend', function(e) { e.preventDefault(); });
        `}} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
