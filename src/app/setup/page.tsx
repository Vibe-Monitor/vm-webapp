"use client";
import { useState, useEffect } from "react";
import { LandingPage } from "@/components/setup/setup";
import { OnboardingPage } from "@/components/setup/OnboardingPage";
import { Toaster } from "sonner";

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
        return <OnboardingPage onComplete={handleOnboardingComplete} userName={userName} />;
      case "landing":
        return <LandingPage onLaunchClick={handleLaunchClick} />;
      default:
        return <OnboardingPage onComplete={handleOnboardingComplete} userName={userName} />;
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