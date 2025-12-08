import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Copy, Check, ChevronDown, Lightbulb, ExternalLink, Tag, Star, Search, Brain, Clock, Gift, Hand } from "lucide-react";
import { toast } from "sonner";

// Icon wrapper component for consistent styling
const IconWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-[#2F4257] border border-[rgba(255,209,27,0.2)] ${className}`}>
    <div className="text-amber-300">
      {children}
    </div>
  </div>
);

interface SetupCompletePageProps {
  onContinue: () => void;
}

export function SetupCompletePage({ onContinue }: SetupCompletePageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fade in effect on mount
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code }: { code: string }) => (
    <div className="group relative w-full mt-2 bg-slate-700 rounded-md p-3 transition-transform hover:scale-[1.02] duration-200">
      <code className="text-sm text-[#E5E7EB] font-mono block pr-8">
        {code}
      </code>
      <button
        onClick={() => handleCopyCode(code)}
        className="absolute top-2 right-2 p-1.5 rounded hover:bg-slate-600 transition-colors"
        aria-label="Copy code"
      >
        {copiedCode === code ? (
          <Check className="w-4 h-4 text-amber-300" />
        ) : (
          <Copy className="w-4 h-4 text-[#9AA3B0] group-hover:text-amber-300 transition-colors" />
        )}
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card 
        className={`w-full max-w-[800px] lg:w-[800px] p-8 lg:p-12 bg-[rgba(27,41,61,0.1)] border-[#2F4257] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-xl transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CardContent className="p-0 flex flex-col items-start gap-8">
          {/* Header Greeting */}
          <div className="flex flex-col items-start gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <Hand className="w-6 h-6" />
              </IconWrapper>
              <h1 className="text-[32px] leading-tight tracking-tight text-[#E5E7EB]">
                Hey everyone!
              </h1>
            </div>
            <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
              <span className="italic text-[#E5E7EB]">I&apos;m your friendly debugging assistant bot</span> — here to help you debug issues, investigate alerts, and understand root causes for smarter fixes and prevention.
            </p>
          </div>

          {/* Intro Hook */}
          <div className="flex items-center gap-2 text-sm text-[#9AA3B0] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            <span>Here&apos;s how to make the most of me</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-300" />
          </div>

          {/* Main Sections */}
          <div className="flex flex-col gap-6 w-full">
            {/* Section 1 */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Accordion type="single" collapsible defaultValue="section-1" className="w-full">
                <AccordionItem value="section-1" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <IconWrapper className="w-10 h-10">
                          <Tag className="w-5 h-5" />
                        </IconWrapper>
                        <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                          1. Always tag me to engage
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-col gap-3 pl-11">
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Mention <span className="text-amber-300 font-mono">@bot</span> in any Slack thread or channel to activate me.
                        </p>
                        <CodeBlock code="Example: @bot investigate this alert thread." />
                        <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                          This keeps responses focused and thread-specific for efficient team collaboration.
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 2 */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[450ms]">
              <Accordion type="single" collapsible defaultValue="section-2" className="w-full">
                <AccordionItem value="section-2" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <IconWrapper className="w-10 h-10">
                          <Star className="w-5 h-5" />
                        </IconWrapper>
                        <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                          2. What I excel at
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-col gap-4 pl-11">
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Debugging code errors, analyzing alerts, explaining anomalies, and suggesting fixes or optimizations.
                        </p>
                        <div className="flex flex-col gap-2">
                          <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                            Alert in channel? Tag me in the thread for context-aware analysis:
                          </p>
                          <CodeBlock code="@bot debug this spike in CPU usage from the logs." />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                            External error? Share details for tailored insights:
                          </p>
                          <CodeBlock code='@bot analyze this stack trace: Traceback (most recent call last): File "app.py", line 10, in <module>...' />
                        </div>
                        <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                          Leverage integrations like GitHub for commit-linked debugging or Grafana for metric correlations—turning data into actionable steps.
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 3 */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[600ms]">
              <Accordion type="single" collapsible defaultValue="section-3" className="w-full">
                <AccordionItem value="section-3" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <IconWrapper className="w-10 h-10">
                          <Search className="w-5 h-5" />
                        </IconWrapper>
                        <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                          3. Provide clear context for precise help
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-col gap-4 pl-11">
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Include logs, stack traces, timestamps, or events leading up (e.g., &apos;This happened after deploy v2.1&apos;).
                        </p>
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Avoid vague queries like &apos;Fix my bug&apos;—specifics unlock deeper root-cause detection and code suggestions.
                        </p>
                        <div className="flex items-start gap-3 p-4 bg-[rgba(98,102,250,0.1)] border border-[#6266FA] rounded-lg mt-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(98,102,250,0.2)] flex-shrink-0">
                            <Lightbulb className="w-4 h-4 text-amber-300" />
                          </div>
                          <p className="text-sm leading-5 text-[#E5E7EB]">
                            <span className="font-semibold">Pro tip:</span> More details = faster resolutions and learning opportunities
                          </p>
                        </div>
                        <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                          Clear context helps me cross-reference integrations (e.g., pulling recent PRs from GitHub) for holistic, accurate advice that prevents recurrence.
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 4 */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[750ms]">
              <Accordion type="single" collapsible defaultValue="section-4" className="w-full">
                <AccordionItem value="section-4" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <IconWrapper className="w-10 h-10">
                          <Brain className="w-5 h-5" />
                        </IconWrapper>
                        <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                          4. I retain thread memory
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-col gap-3 pl-11">
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Conversations stay contextual within a single thread—reference prior messages seamlessly for ongoing investigations.
                        </p>
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • Start fresh threads for new issues to keep things organized and accurate
                        </p>
                        <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                          This builds investigative continuity, like iterating on a debug session without resetting—saving time and reducing miscommunication in teams.
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 5 */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[900ms]">
              <Accordion type="single" collapsible defaultValue="section-5" className="w-full">
                <AccordionItem value="section-5" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <IconWrapper className="w-10 h-10">
                          <Clock className="w-5 h-5" />
                        </IconWrapper>
                        <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                          5. Response time note
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-col gap-3 pl-11">
                        <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                          • I may take 10-30 seconds to fetch data from integrations (e.g., GitHub commits or Grafana metrics), analyze patterns, and generate insights—patience ensures thorough, reliable responses
                        </p>
                        <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                          During this, I&apos;m correlating data across your connected sources for comprehensive answers that go beyond surface-level fixes.
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Bonus Section */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[1050ms]">
              <div className="bg-[rgba(98,102,250,0.1)] border border-[#6266FA] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <IconWrapper className="w-10 h-10 bg-[rgba(98,102,250,0.2)] border-[rgba(98,102,250,0.4)]">
                    <Gift className="w-5 h-5" />
                  </IconWrapper>
                  <h2 className="text-[20px] font-semibold tracking-tight text-[#E5E7EB]">
                    Bonus: Beyond bugs
                  </h2>
                </div>
                <div className="flex flex-col gap-4 pl-11">
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                      Ask conceptual questions for growth:
                    </p>
                    <CodeBlock code="@bot explain rate limiting in APIs and best mitigation strategies." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] leading-6 tracking-[-0.150391px] text-[#9AA3B0]">
                      Or proactive queries:
                    </p>
                    <CodeBlock code="@bot suggest optimizations for this query based on recent alerts." />
                  </div>
                  <p className="text-sm leading-5 text-[#9AA3B0] mt-2">
                    Use me for knowledge sharing—fostering team upskilling and proactive monitoring to catch issues before they escalate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col items-center gap-4 w-full pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[1200ms]">
            <p className="text-[18px] leading-6 tracking-tight text-[#E5E7EB] text-center font-semibold">
              Let&apos;s turn alerts into actions and debug smarter together
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={onContinue}
                className="h-11 px-6 bg-[#6266FA] hover:bg-[#6266FA]/90 text-[#E5E7EB] rounded-md font-medium tracking-[-0.150391px] flex items-center gap-2"
              >
                Launch Slack Now
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6 border-[#2F4257] text-[#E5E7EB] hover:bg-[rgba(47,66,87,0.2)] rounded-md font-medium tracking-[-0.150391px]"
              >
                Explore More Tips
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
