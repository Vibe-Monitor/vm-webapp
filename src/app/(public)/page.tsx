'use client';

import EnhancedHero from "@/vm-site-landing/components/EnhancedHero";
import FullScreenScroll from "@/vm-site-landing/components/FullScreenScroll";
import { benefits } from "@/vm-site-landing/data/benefits";
import { FinalCTAWithVideo } from "@/vm-site-landing/components/FinalCTAWithVideo";
import { VideoShowcaseSection } from "@/vm-site-landing/components/VideoShowcaseSection";
import { IntegrationsSection } from "@/vm-site-landing/components/IntegrationsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";

export default function Home() {
  const sections = [
    <EnhancedHero key="hero" />,
    // <OutcomeSection key="outcome" />,
    // ...benefits.map((benefit, index) => (
    //   <div key={`benefit-${index}`} className="w-full min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-0">
    //     <BenefitSection benefit={benefit} />
    //   </div>
    // )),

    <VideoShowcaseSection key="video" />,
    <IntegrationsSection key="integrations" />,
    <TestimonialsSection key="testimonials" />,
    <PricingSection key="pricing" />,
    <FinalCTAWithVideo key="cta" />
  ];

  const sectionIds = [
    'hero',
    'outcome',
    ...benefits.map((_, index) => `benefit-${index}`),
    'video',
    'integrations',
    'testimonials',
    'pricing',
    'cta'
  ];

  return (
    <FullScreenScroll sectionIds={sectionIds}>
      {sections}
    </FullScreenScroll>
  );
}
