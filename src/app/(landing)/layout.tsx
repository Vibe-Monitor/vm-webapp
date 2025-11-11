import { CleanFooter } from '@/components/vm-site-components/CleanFooter';
import { PostHogProvider } from '@/components/vm-site-components/PostHog/PostHogProvider';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider>
    {children}
    <CleanFooter />
  </PostHogProvider>;
}
