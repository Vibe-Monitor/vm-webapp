"use client";
import { useState, useEffect, Suspense } from "react";
import { LandingPage } from "@/components/setup/setup";
import { OnboardingPage } from "@/components/setup/OnboardingPage";
import { Toaster } from "sonner";
import Loader from "@/components/ui/loader";

type SetupState = "onboarding" | "landing";

export default function Page() {
  const [currentState, setCurrentState] = useState<SetupState>("onboarding");
  const [userName] = useState("User");

  // Apply dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentState("landing");
  };

  const handleLaunchClick = async () => {
    // Keep user on the same page - no redirect
    // User remains on the landing page component
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case "onboarding":
        return (
          <Suspense fallback={<Loader message="Loading..." />}>
            <OnboardingPage onComplete={handleOnboardingComplete} userName={userName} />
          </Suspense>
        );
      case "landing":
        return <LandingPage onLaunchClick={handleLaunchClick} />;
      default:
        return (
          <Suspense fallback={<Loader message="Loading..." />}>
            <OnboardingPage onComplete={handleOnboardingComplete} userName={userName} />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main>
        {renderCurrentState()}
      </main>

      <Toaster
        position="top-right"
        richColors
        theme="dark"
      />
    </div>
  );
}