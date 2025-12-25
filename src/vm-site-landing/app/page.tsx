import EnhancedHero from "@/vm-site-landing/components/EnhancedHero";
import OutcomeSection from "@/vm-site-landing/components/OutcomeSection";
import BenefitSection from "@/vm-site-landing/components/Benefits/BenefitSection";
import FounderNote from "@/vm-site-landing/components/FounderNote";
import FullScreenScroll from "@/vm-site-landing/components/FullScreenScroll";
import { benefits } from "@/vm-site-landing/data/benefits";
import { FinalCTAWithVideo } from "@/vm-site-landing/components/FinalCTAWithVideo";

const HomePage: React.FC = () => {
  const sections = [
    <EnhancedHero key="hero" />,
    <OutcomeSection key="outcome" />,
    ...benefits.map((benefit, index) => (
      <div key={`benefit-${index}`} className="w-full min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-0">
        <BenefitSection benefit={benefit} />
      </div>
    )),
    <FounderNote key="founder" />,
    <FinalCTAWithVideo key="cta" />
  ];

  const sectionIds = [
    'hero',
    'outcome',
    ...benefits.map((_, index) => `benefit-${index}`),
    'founder',
    'cta'
  ];

  return (
    <FullScreenScroll sectionIds={sectionIds}>
      {sections}
    </FullScreenScroll>
  );
};

export default HomePage;
