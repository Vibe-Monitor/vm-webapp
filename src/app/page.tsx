'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { tokenService } from '@/services/tokenService';

// Landing page components
import { PublicLayout } from '@/components/layouts';
import EnhancedHero from "@/vm-site-landing/components/EnhancedHero";
import FullScreenScroll from "@/vm-site-landing/components/FullScreenScroll";
import { benefits } from "@/vm-site-landing/data/benefits";
import { FinalCTAWithVideo } from "@/vm-site-landing/components/FinalCTAWithVideo";
import { VideoShowcaseSection } from "@/vm-site-landing/components/VideoShowcaseSection";
import { IntegrationsSection } from "@/vm-site-landing/components/IntegrationsSection";
import Loader from '@/components/ui/loader';

function LandingPage() {
  const sections = [
    <EnhancedHero key="hero" />,
    <VideoShowcaseSection key="video" />,
    <IntegrationsSection key="integrations" />,
    <FinalCTAWithVideo key="cta" />
  ];

  const sectionIds = [
    'hero',
    'outcome',
    ...benefits.map((_, index) => `benefit-${index}`),
    'video',
    'integrations',
    'cta'
  ];

  return (
    <PublicLayout>
      <FullScreenScroll sectionIds={sectionIds}>
        {sections}
      </FullScreenScroll>
    </PublicLayout>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasValidToken = tokenService.hasValidToken();
    setIsAuthenticated(hasValidToken);
  }, []);

  // Show loader while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader message="Loading..." />
      </div>
    );
  }

  // Redirect to /chat if authenticated (let (app) layout handle it)
  if (isAuthenticated) {
    redirect('/chat');
  }

  // Show landing page if not authenticated
  return <LandingPage />;
}
