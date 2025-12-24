'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Show header and footer on homepage, contact, terms, and policy pages
  const showHeaderFooter = pathname === '/' ||
                          pathname === '/contact' ||
                          pathname === '/terms' ||
                          pathname === '/privacy' ||
                          pathname === '/policy';

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
