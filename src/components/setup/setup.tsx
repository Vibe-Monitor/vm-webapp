"use client";
import { useState } from "react";
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

interface LandingPageProps {
  onLaunchClick: () => void;
}

export function LandingPage({ onLaunchClick }: LandingPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCopyCode = (code: string, index: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLaunchClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      onLaunchClick();
    }, 800);
  };

  const CodeBlock = ({ code, index }: { code: string; index: string }) => (
    <span className="relative group inline-block">
      <code className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#27435C] rounded-md transition-all duration-150 hover:scale-105">
        <span className="text-[#E5E7EB] text-xs sm:text-sm break-all">{code}</span>
        <button
          onClick={() => handleCopyCode(code, index)}
          className="p-0.5 sm:p-1 hover:bg-[#3D526A] rounded transition-colors flex-shrink-0"
          aria-label="Copy code"
        >
          {copiedCode === index ? (
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFCF00]" />
          ) : (
            <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFCF00] opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </code>
    </span>
  );

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16 overflow-hidden">
      {/* Background with radial gradient matching the design */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(59.35% 92.81% at 50% 50%, rgba(12, 24, 41, 0.95) 0%, #0C1829 100%), #0C1829'
        }}
      />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(40)].map((_, i) => (
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
                className="absolute w-2 h-2 bg-[#FFCF00] rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[723.5px] mx-auto z-10"
      >
        <div
          className="relative border rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5"
          style={{
            background: 'rgba(23, 41, 63, 0.1)',
            borderColor: '#294359',
            boxShadow: '0px 10px 20px -6px rgba(0, 0, 0, 0.1)',
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
              className="text-2xl sm:text-[28px] text-[#E5E7EB]"
              style={{
                lineHeight: '1.5',
                letterSpacing: '0.382812px',
                fontWeight: 400
              }}
            >
              You are all set-up
            </h1>

            <p
              className="text-sm text-[#95A3B2] px-2"
              style={{
                lineHeight: '21px',
                letterSpacing: '-0.150391px',
                fontWeight: 400
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
                background: 'rgba(41, 67, 89, 0.3)',
                border: '1px solid rgba(41, 67, 89, 0.5)',
              }}
            >
              <h2
                className="text-lg sm:text-[20px] text-[#FFCF00]"
                style={{
                  lineHeight: '1.5',
                  letterSpacing: '-0.449219px',
                  fontWeight: 400
                }}
              >
                How It Works
              </h2>

              <div className="space-y-4 sm:space-y-[18px]">
                {/* Start */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCF00] flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[#E5E7EB] text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400
                      }}
                    >
                      Tag @vm-bot in Slack:
                    </span>
                    <CodeBlock code="@vm-bot debug runtime error in v2.1" index="start-1" />
                    <span
                      className="text-[#E5E7EB] text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400
                      }}
                    >
                      to analyze issues.
                    </span>
                  </div>
                </div>

                {/* Context */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCF00] flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[#E5E7EB] text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400
                      }}
                    >
                      Add details:
                    </span>
                    <CodeBlock code="@vm-bot check logs after 10/16 deploy" index="context-1" />
                    <span
                      className="text-[#E5E7EB] text-sm sm:text-base"
                      style={{
                        lineHeight: '1.5',
                        letterSpacing: '-0.3125px',
                        fontWeight: 400
                      }}
                    >
                      vague queries limit accuracy.
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCF00] flex-shrink-0 mt-0.5" />
                  <p
                    className="text-[#E5E7EB] flex-1 text-sm sm:text-base"
                    style={{
                      lineHeight: '1.5',
                      letterSpacing: '-0.3125px',
                      fontWeight: 400
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
                background: 'rgba(96, 102, 255, 0.1)',
                border: '1px solid #6066FF',
              }}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCF00] flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h2
                    className="text-lg sm:text-[20px] text-[#E5E7EB]"
                    style={{
                      lineHeight: '1.5',
                      letterSpacing: '-0.449219px',
                      fontWeight: 400
                    }}
                  >
                    Beyond Basics
                  </h2>
                  <div className="space-y-2 sm:space-y-[10px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm text-[#95A3B2]"
                        style={{
                          lineHeight: '21px',
                          letterSpacing: '-0.150391px',
                          fontWeight: 400
                        }}
                      >
                        Ask
                      </span>
                      <CodeBlock code="@vm-bot explain API rate limits" index="bonus-1" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm text-[#95A3B2]"
                        style={{
                          lineHeight: '21px',
                          letterSpacing: '-0.150391px',
                          fontWeight: 400
                        }}
                      >
                        or
                      </span>
                      <CodeBlock code="@vm-bot optimise this SQL query" index="bonus-2" />
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
              className="w-full h-9 rounded-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ 
                background: '#6166FF',
                opacity: 0.95,
                color: '#E5E7EB',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '-0.150391px',
                fontWeight: 500
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
              borderTop: '1px solid rgba(41, 67, 89, 0.5)'
            }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#FFCF00]" />
                <h4
                  className="text-sm text-[#FFCF00]"
                  style={{
                    lineHeight: '21px',
                    letterSpacing: '-0.150391px',
                    fontWeight: 400
                  }}
                >
                  Need Help?
                </h4>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  onClick={() => toast.info("Documentation coming soon!")}
                  className="text-[#95A3B2] hover:text-[#FFCF00] transition-colors duration-150 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    letterSpacing: '-0.3125px',
                    fontWeight: 500
                  }}
                >
                  <FileText className="w-4 h-4" />
                  Documentation
                </motion.button>
                <span
                  className="text-sm text-[#294359] hidden sm:inline"
                  style={{
                    lineHeight: '20px',
                    letterSpacing: '-0.150391px',
                    fontWeight: 400
                  }}
                >
                  or
                </span>
                <motion.button
                  onClick={() => toast.info("Support team ready to help!")}
                  className="text-[#95A3B2] hover:text-[#FFCF00] transition-colors duration-150 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    letterSpacing: '-0.3125px',
                    fontWeight: 500
                  }}
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
