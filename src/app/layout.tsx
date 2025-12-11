import "./globals.css";
import StoreProvider from './StoreProvider';
import { AuthGuard } from '@/components/auth-guard';
import { PostHogProvider } from '@/components/vm-site-components/PostHog/PostHogProvider';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Vibe Monitor',
  description: 'Monitor and debug your applications',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500"
        suppressHydrationWarning={true}
      >
        <PostHogProvider>
          <StoreProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </StoreProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
