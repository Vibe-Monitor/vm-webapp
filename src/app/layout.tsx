
import "./globals.css";
import StoreProvider from './StoreProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500"
        suppressHydrationWarning={true}
      >
        <StoreProvider>
       
            {children}
      
        </StoreProvider>
      </body>
    </html>
  );
}
