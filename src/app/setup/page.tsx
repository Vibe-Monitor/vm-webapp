"use client";
import { useState, useEffect } from "react";
import { LandingPage } from "@/components/setup/setup";
import { OnboardingPage } from "@/components/setup/OnboardingPage";
import { SetupCompletePage } from "@/components/setup/SetupCompletepage";
import { Toaster } from "sonner";

type SetupState = "onboarding" | "landing" | "setup-complete";

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

  const handleLaunchClick = () => {
    setCurrentState("setup-complete");
  };

  const handleSetupComplete = async () => {
    // Redirect to dashboard page after setup
    window.location.href = "/dashboard";
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case "onboarding":
        return <OnboardingPage onComplete={handleOnboardingComplete} userName={userName} />;
      case "landing":
        return <LandingPage onLaunchClick={handleLaunchClick} />;
      case "setup-complete":
        return <SetupCompletePage onContinue={handleSetupComplete} />;
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