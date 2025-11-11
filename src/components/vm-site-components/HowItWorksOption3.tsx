'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

// Option 3: Interactive Step-Through Carousel
// Single card that animates between steps - most playful and delightful

export function HowItWorksOption3() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Plug,
      number: '01',
      label: 'Server Connection',
      title: 'Connect in minutes',
      description: 'Connect Grafana dashboards or server logs to Vibemonitor. One-time setup that works with your existing infrastructure.',
      color: '#6266FA',
      visual: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(98, 102, 250, 0.1)' }}>
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span style={{ fontSize: '11px', color: '#E5E7EB', fontFamily: 'monospace' }}>
              Grafana connected ✓
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(98, 102, 250, 0.1)' }}>
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span style={{ fontSize: '11px', color: '#E5E7EB', fontFamily: 'monospace' }}>
              Server logs synced ✓
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: Activity,
      number: '02',
      label: 'Continuous Monitoring',
      title: '24/7 watching',
      description: '24/7 monitoring of logs, traces, and metrics across all servers. Real-time data collection without performance impact.',
      color: '#FFCF00',
      visual: (
        <div className="flex items-center gap-1 h-16">
          {[40, 65, 45, 80, 55, 70, 50, 85, 60].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ 
                background: 'linear-gradient(180deg, #FFCF00 0%, #FFB800 100%)',
                height: `${height}%`
              }}
              animate={{ height: [`${height * 0.8}%`, `${height}%`, `${height * 0.8}%`] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Brain,
      number: '03',
      label: 'AI-Powered Analysis',
      title: 'AI at work',
      description: 'AI identifies errors and anomalies. Learns your system patterns over time for better accuracy.',
      color: '#6266FA',
      visual: (
        <div className="space-y-2">
          <motion.div
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{ background: 'rgba(98, 102, 250, 0.1)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-4 h-4 text-[#6266FA]" />
            <span style={{ fontSize: '11px', color: '#E5E7EB' }}>Analyzing patterns...</span>
          </motion.div>
          <div className="p-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <span style={{ fontSize: '11px', color: '#10B981' }}>✓ Error identified: 2.1s</span>
          </div>
        </div>
      ),
    },
    {
      icon: Bell,
      number: '04',
      label: 'Real-Time Slack Alert',
      title: 'Instant notification',
      description: 'Slack notification with exact file location, line number, affected service, severity, and AI recommendations.',
      color: '#FFCF00',
      visual: (
        <div className="p-3 rounded-lg" style={{ background: 'rgba(30, 41, 59, 0.5)' }}>
          <div className="flex gap-2 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#6266FA] flex items-center justify-center flex-shrink-0">
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>VM</span>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#EF4444', marginBottom: '4px' }}>
                <strong>HIGH:</strong> payment.js:234
              </p>
              <p style={{ fontSize: '10px', color: '#10B981' }}>
                Fix: Replace api.call()
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Search,
      number: '05',
      label: 'AI-Assisted Investigation',
      title: 'Smart insights',
      description: "Vibemonitor's AI provides intelligent insights for faster resolution. Suggests fixes based on similar errors.",
      color: '#10B981',
      visual: (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            <span style={{ fontSize: '10px', color: '#E5E7EB' }}>Root cause identified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            <span style={{ fontSize: '10px', color: '#E5E7EB' }}>Similar error found: 3 matches</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            <span style={{ fontSize: '10px', color: '#E5E7EB' }}>Fix suggestion ready</span>
          </div>
        </div>
      ),
    },
    {
      icon: Sparkles,
      number: '06',
      label: 'Auto-Resolution',
      title: 'Coming soon',
      description: 'Automatic error resolution is in development. AI-powered auto-patching will fix common errors automatically.',
      color: '#A38BF4',
      visual: (
        <div className="text-center py-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-10 h-10 text-[#A38BF4] mx-auto mb-2" />
          </motion.div>
          <span style={{ fontSize: '11px', color: '#A38BF4', fontWeight: 600 }}>
            In development
          </span>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Playful Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${currentStepData.color}20 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{
              background: `${currentStepData.color}15`,
              border: `1px solid ${currentStepData.color}30`,
            }}
          >
            <motion.div
              key={currentStep}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: currentStepData.color }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: currentStepData.color }}>
              STEP {currentStep + 1} OF 6
            </span>
          </div>
          
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#E5E7EB',
            marginBottom: '10px',
            letterSpacing: '-0.02em'
          }}>
            How it works
          </h2>
          
          <p style={{ fontSize: '15px', color: '#95A3B2' }}>
            Click through each step
          </p>
        </motion.div>

        {/* Main Interactive Card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${currentStepData.color}40`,
            boxShadow: `0 20px 60px ${currentStepData.color}20`
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 lg:p-12"
            >
              {/* Icon + Number */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentStepData.color} 0%, ${currentStepData.color}DD 100%)`,
                    boxShadow: `0 8px 32px ${currentStepData.color}40`
                  }}
                >
                  <currentStepData.icon className="w-8 h-8 text-white" />
                </motion.div>

                <div>
                  <span style={{ 
                    fontSize: '48px', 
                    fontWeight: 700,
                    color: currentStepData.color,
                    lineHeight: 1,
                    opacity: 0.5
                  }}>
                    {currentStepData.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p style={{ 
                  fontSize: '12px', 
                  color: currentStepData.color,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px'
                }}>
                  {currentStepData.label}
                </p>
                
                <h3 style={{ 
                  fontSize: 'clamp(24px, 4vw, 36px)', 
                  fontWeight: 700, 
                  color: '#E5E7EB',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>
                  {currentStepData.title}
                </h3>
                
                <p style={{ 
                  fontSize: '16px', 
                  color: '#95A3B2',
                  lineHeight: '1.7',
                  maxWidth: '600px'
                }}>
                  {currentStepData.description}
                </p>
              </div>

              {/* Visual */}
              <div 
                className="rounded-xl p-4 mb-8"
                style={{
                  background: 'rgba(15, 24, 40, 0.5)',
                  border: `1px solid ${currentStepData.color}20`
                }}
              >
                {currentStepData.visual}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: currentStep === 0 ? 'rgba(30, 41, 59, 0.3)' : 'rgba(98, 102, 250, 0.1)',
                    border: currentStep === 0 ? '1px solid rgba(98, 102, 250, 0.1)' : '1px solid rgba(98, 102, 250, 0.3)',
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === 0 ? 0.5 : 1
                  }}
                  whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                  whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
                >
                  <ArrowLeft className="w-4 h-4" style={{ color: '#E5E7EB' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                    Previous
                  </span>
                </motion.button>

                {/* Progress Dots */}
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className="rounded-full"
                      style={{
                        width: currentStep === index ? '24px' : '8px',
                        height: '8px',
                        background: currentStep === index 
                          ? `linear-gradient(90deg, ${currentStepData.color} 0%, ${currentStepData.color}DD 100%)`
                          : 'rgba(98, 102, 250, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: currentStep === steps.length - 1 
                      ? 'rgba(30, 41, 59, 0.3)' 
                      : `linear-gradient(135deg, ${currentStepData.color} 0%, ${currentStepData.color}DD 100%)`,
                    border: currentStep === steps.length - 1 
                      ? '1px solid rgba(98, 102, 250, 0.1)' 
                      : 'none',
                    cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === steps.length - 1 ? 0.5 : 1,
                    boxShadow: currentStep < steps.length - 1 ? `0 4px 20px ${currentStepData.color}40` : 'none'
                  }}
                  whileHover={currentStep < steps.length - 1 ? { scale: 1.05 } : {}}
                  whileTap={currentStep < steps.length - 1 ? { scale: 0.95 } : {}}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                    Next
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p style={{ fontSize: '14px', color: '#95A3B2' }}>
            <span style={{ color: '#FFCF00', fontWeight: 700 }}>60 seconds</span> from error detection to team notification
          </p>
        </motion.div>
      </div>
    </section>
  );
}
