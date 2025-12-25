import ConditionalLayout from "@/vm-site-landing/components/ConditionalLayout";
import "./globals.css";
import StoreProvider from './StoreProvider';
import { AuthGuard } from '@/components/auth-guard';
import { PostHogProvider } from '@/components/vm-site-components/PostHog/PostHogProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
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
        className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500 flex flex-col"
        suppressHydrationWarning={true}
      >
        <PostHogProvider>
          <StoreProvider>
            <AuthGuard>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </AuthGuard>
          </StoreProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
