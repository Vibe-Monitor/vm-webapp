"use client";
import { useState } from "react";
import posthog from "posthog-js";
import { Button } from "../ui/button";
import {
  Play,
  Edit,
  Hourglass,
  Search,
  Copy,
  Check,
  HelpCircle,
  FileText,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BackButton } from "../ui/BackButton";
import { LogoutButton } from "../ui/LogoutButton";

interface LandingPageProps {
  onLaunchClick: () => void;
}

export function LandingPage({ onLaunchClick }: LandingPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCopyCode = (code: string, index: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);

    posthog.capture('setup_complete_code_snippet_copied', {
      snippet_type: index,
      code_content: code
    });

    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLaunchClick = () => {
    posthog.capture('launch_slack_button_clicked', {
      source: 'setup_complete_page'
    });

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      onLaunchClick();
    }, 800);
  };

  const CodeBlock = ({ code, index }: { code: string; index: string }) => (
    <span className="relative group inline-block">
      <code
        className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-150 hover:scale-105"
        style={{ background: '#EFF6FF', border: '1px solid rgba(59, 130, 246, 0.2)' }}
      >
        <span className="text-xs sm:text-sm break-all" style={{ color: '#1E40AF' }}>{code}</span>
        <button
          onClick={() => handleCopyCode(code, index)}
          className="p-0.5 sm:p-1 rounded transition-colors flex-shrink-0"
          style={{ background: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-background-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          aria-label="Copy code"
        >
          {copiedCode === index ? (
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: '#10B981' }} />
          ) : (
            <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#3B82F6' }} />
          )}
        </button>
      </code>
    </span>
  );

  return (
    <div
      className="theme-light min-h-screen w-full relative flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #F0FDF4 100%)',
        backgroundImage: `
          linear-gradient(to right, rgba(10, 37, 64, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(10, 37, 64, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      {/* Background */}
      <div className="absolute inset-0" />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(40)].map((_, i) => {
              const colors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#14B8A6', '#EC4899'];
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: "50vw",
                    y: "50vh",
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: colors[i % colors.length] }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <BackButton />

      {/* Logout Button */}
      <LogoutButton />

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[723.5px] mx-auto z-10"
      >
        <div
          className="relative p-4 sm:p-6 space-y-4 sm:space-y-5"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(10, 37, 64, 0.08), 0 1px 2px rgba(10, 37, 64, 0.04)',
            border: '1px solid rgba(10, 37, 64, 0.08)',
          }}
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.15 }}
            className="text-center space-y-3 sm:space-y-5"
          >
            <h1
              className="text-2xl sm:text-[28px]"
              style={{
                lineHeight: '1.5',
                letterSpacing: '0.382812px',
                fontWeight: 400,
                color: 'var(--color-text-primary)'
              }}
            >
              You are all set-up
            </h1>

            <p
              className="text-sm px-2"
              style={{
                lineHeight: '21px',
                letterSpacing: '-0.150391px',
                fontWeight: 400,
                color: 'var(--color-text-secondary)'
              }}
            >
              Fix bugs and get insights instantly. Join now for free.
            </p>
          </motion.div>

          {/* Main Content Container with larger gap */}
          <div className="space-y-5 sm:space-y-[26px]">
            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
              style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <h2
                className="text-lg sm:text-[20px]"
                style={{
                  lineHeight: '1.5',
                  letterSpacing: '-0.449219px',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)'
                }}
              >
                How It Works
              </h2>

              <div className="space-y-4 sm:space-y-[18px]">
                {/* Start */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: '#10B981' }} />
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      Tag @VibeMonitor in Slack:
                    </span>
                    <CodeBlock code="@VibeMonitor debug runtime error in v2.1" index="start-1" />
                    <span
                      className="text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      to analyze issues.
                    </span>
                  </div>
                </div>

                {/* Context */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Edit className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: '#3B82F6' }} />
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      Add details:
                    </span>
                    <CodeBlock code="@Vibemonitor check logs after 10/16 deploy" index="context-1" />
                    <span
                      className="text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      vague queries limit accuracy.
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                  <p
                    className="flex-1 text-sm sm:text-base"
                    style={{
                      lineHeight: '1.5',
                      letterSpacing: '-0.3125px',
                      fontWeight: 400,
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Takes 10-30s to pull GitHub/Grafana data for thorough insights.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Beyond Basics Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.15 }}
              className="rounded-lg p-4 sm:p-6"
              style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: '#8B5CF6' }} />
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h2
                    className="text-lg sm:text-[20px]"
                    style={{
                      lineHeight: '1.5',
                      letterSpacing: '-0.449219px',
                      fontWeight: 400,
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Beyond Basics
                  </h2>
                  <div className="space-y-2 sm:space-y-[10px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm"
                        style={{
                          lineHeight: '21px',
                          letterSpacing: '-0.150391px',
                          fontWeight: 400,
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        Ask
                      </span>
                      <CodeBlock code="@Vibemonitor explain API rate limits" index="bonus-1" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm"
                        style={{
                          lineHeight: '21px',
                          letterSpacing: '-0.150391px',
                          fontWeight: 400,
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        or
                      </span>
                      <CodeBlock code="@Vibemonitor optimise this SQL query" index="bonus-2" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.15 }}
          >
            <Button
              onClick={handleLaunchClick}
              className="w-full h-11 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(10, 37, 64, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0D3050 0%, #264A6E 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Launch Slack to start debugging
            </Button>
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.15 }}
            className="pt-4 sm:pt-5 space-y-2"
            style={{
              borderTop: '1px solid rgba(10, 37, 64, 0.1)'
            }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4" style={{ color: '#14B8A6' }} />
                <h4
                  className="text-sm"
                  style={{
                    lineHeight: '21px',
                    letterSpacing: '-0.150391px',
                    fontWeight: 400,
                    color: 'var(--color-text-primary)'
                  }}
                >
                  Need Help?
                </h4>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  onClick={() => toast.info("Documentation coming soon!")}
                  className="transition-colors duration-150 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    letterSpacing: '-0.3125px',
                    fontWeight: 500,
                    color: '#64748B'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
                >
                  <FileText className="w-4 h-4" />
                  Documentation
                </motion.button>
                <span
                  className="text-sm hidden sm:inline"
                  style={{
                    lineHeight: '20px',
                    letterSpacing: '-0.150391px',
                    fontWeight: 400,
                    color: 'var(--color-text-tertiary)'
                  }}
                >
                  or
                </span>
                <motion.button
                  onClick={() => toast.info("Support team ready to help!")}
                  className="transition-colors duration-150 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    letterSpacing: '-0.3125px',
                    fontWeight: 500,
                    color: '#64748B'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#10B981'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
                >
                  <MessageSquare className="w-4 h-4" />
                  Support
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
