'use client';

import { useEffect } from 'react';
import Script from 'next/script';


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override body background for landing page
  useEffect(() => {
    document.body.style.background = '#ffffff';
    document.body.style.color = '#171717';

    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#171717' }}>
    
      <main>
        {children}
      </main>
      
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
