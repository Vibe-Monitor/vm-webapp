'use client';

import { HeroOption1 } from '@/components/vm-site-components/HeroOption1';
import { InteractiveProofOption3 } from '@/components/vm-site-components/InteractiveProofOption3';
import { IntegrationsV2Option1 } from '@/components/vm-site-components/IntegrationsV2Option1';
import { FinalCTAOption4 } from '@/components/vm-site-components/FinalCTAOption4';
import { VideoShowcase } from '@/components/vm-site-components/VideoShowcase';

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#0F1828' }}>
      <HeroOption1 />
      <InteractiveProofOption3 />
      <IntegrationsV2Option1 />
      <VideoShowcase />
      <FinalCTAOption4 />
    </div>
  );
}
