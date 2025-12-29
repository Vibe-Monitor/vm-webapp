import "./globals.css";
import StoreProvider from './StoreProvider';
import { AuthGuard } from '@/components/auth-guard';
import { PostHogProvider } from '@/components/vm-site-components/PostHog/PostHogProvider';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibe Monitor - Observability Platform',
  description: 'Debug faster, sleep better with Vibe Monitor',
  icons: {
    icon: '/images/Vibe1.svg',
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
        className="min-h-screen max-w-full overflow-x-hidden bg-background text-foreground transition-colors duration-500"
        suppressHydrationWarning={true}
      >
        <PostHogProvider>
          <StoreProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </StoreProvider>
        </PostHogProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
