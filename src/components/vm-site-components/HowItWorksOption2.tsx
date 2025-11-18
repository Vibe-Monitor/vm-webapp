'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';

// Option 2: Expandable List with Click-to-Reveal
// Minimal, compact design with interactive expansion

export function HowItWorksOption2() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const handleStepToggle = (stepIndex: number, stepLabel: string) => {
    const isExpanding = expandedStep !== stepIndex;
    const eventAction = isExpanding ? 'expanded' : 'collapsed';

    trackInteraction(`how_it_works_step_${stepIndex + 1}_${eventAction}`, {
      step_number: stepIndex + 1,
      step_name: stepLabel,
      action: eventAction
    });

    posthog.capture(`how_it_works_step_${stepIndex + 1}_${stepLabel.toLowerCase().replace(/\s+/g, '_')}_${eventAction}`, {
      step_number: stepIndex + 1,
      step_name: stepLabel,
      action: eventAction,
      page_section: 'how_it_works'
    });

    setExpandedStep(isExpanding ? stepIndex : null);
  };

  const steps = [
    {
      icon: Plug,
      label: 'Connect Once',
      shortDesc: 'Drop in a config file. Walk away.',
      fullDesc: 'Point Vibemonitor to your Grafana, logs, or metrics. No migration. No agents. Just one config file and you\'re monitoring production in under 5 minutes.',
      color: '#6266FA',
      badge: 'Setup',
    },
    {
      icon: Activity,
      label: 'Always Watching',
      shortDesc: 'Every log. Every trace. Every metric.',
      fullDesc: 'Vibemonitor watches everything—24/7 across all your servers. Zero performance impact. You ship code. We watch it run.',
      color: '#FFCF00',
      badge: 'Active',
    },
    {
      icon: Brain,
      label: 'Error Detected',
      shortDesc: 'AI catches what humans miss',
      fullDesc: 'AI spots errors the moment they happen. It learns your system\'s normal behavior, so it catches the weird stuff—edge cases, race conditions, silent failures.',
      color: '#6266FA',
      badge: 'Smart',
    },
    {
      icon: Bell,
      label: 'Alert Sent',
      shortDesc: 'Your team gets root cause, not just the problem',
      fullDesc: 'Slack alert lands in your channel with the error, the exact line of code, the commit that broke it, and the AI-identified root cause. All in one message. Under 60 seconds.',
      color: '#FFCF00',
      badge: '< 60s',
    },
    {
      icon: Search,
      label: 'Deep Dive (Optional)',
      shortDesc: 'Need more context? AI has your back.',
      fullDesc: 'Click into any error for full forensics. Stack traces, similar past incidents, deployment history, affected users. The AI connects the dots so you don\'t have to.',
      color: '#10B981',
      badge: 'Guided',
    },
    {
      icon: Sparkles,
      label: 'Auto-Fix',
      shortDesc: 'Auto-fixing is coming soon',
      fullDesc: 'Coming soon: AI auto-patches common errors—null checks, retry logic, fallbacks. Deploy fixes automatically or with one click. No humans needed.',
      color: '#A38BF4',
      badge: 'Soon',
    },
  ];

  return (
    <section data-section-name="how-it-works" className="relative py-24 px-8 overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(98, 102, 250, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(98, 102, 250, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255, 207, 0, 0.1)',
              border: '1px solid rgba(255, 207, 0, 0.2)',
            }}
          >
            <Zap className="w-3 h-3 text-[#FFCF00]" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFCF00' }}>
              6 STEPS
            </span>
          </div>
          
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#E5E7EB',
            marginBottom: '10px',
            letterSpacing: '-0.02em'
          }}>
            The 60-second journey
          </h2>
          
          <p style={{ fontSize: '15px', color: '#95A3B2' }}>
            From error to root cause. Fully automated. Click to see each step.
          </p>
        </motion.div>

        {/* Expandable Steps List */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => handleStepToggle(index, step.label)}
                className="w-full text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: expandedStep === index 
                      ? 'rgba(30, 41, 59, 0.6)' 
                      : 'rgba(30, 41, 59, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${expandedStep === index ? step.color + '40' : 'rgba(98, 102, 250, 0.15)'}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon Badge - Small */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: expandedStep === index 
                          ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}DD 100%)`
                          : `${step.color}20`,
                        border: `1px solid ${step.color}40`,
                      }}
                    >
                      <step.icon 
                        className="w-5 h-5"
                        style={{ color: expandedStep === index ? '#fff' : step.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ 
                          fontSize: '10px', 
                          fontWeight: 700,
                          color: step.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {step.badge}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-[#95A3B2]" />
                        <span style={{ fontSize: '10px', color: '#95A3B2', fontWeight: 600 }}>
                          STEP {index + 1}
                        </span>
                      </div>
                      
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: 700, 
                        color: '#E5E7EB',
                        marginBottom: '2px'
                      }}>
                        {step.label}
                      </h3>
                      
                      <p style={{ 
                        fontSize: '13px', 
                        color: '#95A3B2',
                        lineHeight: '1.5'
                      }}>
                        {step.shortDesc}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <motion.div
                      animate={{ rotate: expandedStep === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown 
                        className="w-5 h-5"
                        style={{ color: expandedStep === index ? step.color : '#95A3B2' }}
                      />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="mt-4 pt-4 pl-14"
                          style={{ borderTop: `1px solid ${step.color}20` }}
                        >
                          <p style={{ 
                            fontSize: '14px', 
                            color: '#E5E7EB',
                            lineHeight: '1.7'
                          }}>
                            {step.fullDesc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.1) 0%, rgba(255, 207, 0, 0.1) 100%)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Zap className="w-4 h-4 text-[#FFCF00]" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
              Error to root cause: Under 60 seconds
            </span>
            <div className="w-1 h-1 rounded-full bg-[#95A3B2]" />
            <span style={{ fontSize: '14px', color: '#95A3B2' }}>
              Zero manual work
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
