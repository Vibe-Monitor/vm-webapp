import "./globals.css";
import StoreProvider from './StoreProvider';
import { AuthGuard } from '@/components/auth-guard';

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
        <StoreProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
