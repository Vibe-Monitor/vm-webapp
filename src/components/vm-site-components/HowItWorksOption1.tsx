'use client';

import { motion } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

// Option 1: Horizontal Timeline with Animated Progress
// Ultra-lightweight with small icons and flowing progress line

export function HowItWorksOption1() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: Plug,
      label: 'Connect',
      title: 'Server Connection',
      description: 'Connect Grafana dashboards or server logs. One-time setup.',
      color: '#6266FA',
    },
    {
      icon: Activity,
      label: 'Monitor',
      title: '24/7 Monitoring',
      description: 'Continuous monitoring of logs, traces, and metrics.',
      color: '#FFCF00',
    },
    {
      icon: Brain,
      label: 'Analyze',
      title: 'AI-Powered Analysis',
      description: 'AI identifies errors and learns system patterns.',
      color: '#6266FA',
    },
    {
      icon: Bell,
      label: 'Alert',
      title: 'Slack Notification',
      description: 'Instant alerts with file location, line number, and fix.',
      color: '#FFCF00',
    },
    {
      icon: Search,
      label: 'Investigate',
      title: 'AI Investigation',
      description: 'Intelligent insights for faster resolution.',
      color: '#10B981',
    },
    {
      icon: Sparkles,
      label: 'Resolve',
      title: 'Auto-Fix (Soon)',
      description: 'Automatic error resolution coming soon.',
      color: '#A38BF4',
    },
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(98, 102, 250, 0.15) 0%, transparent 70%)',
            top: '0%',
            left: '20%',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'rgba(98, 102, 250, 0.1)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#6266FA] animate-pulse" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6266FA' }}>
              THE WORKFLOW
            </span>
          </div>
          
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#E5E7EB',
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            How it works
          </h2>
          
          <p style={{ fontSize: '16px', color: '#95A3B2', maxWidth: '500px', margin: '0 auto' }}>
            6 automated steps from error to resolution
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 hidden lg:block"
            style={{ background: 'rgba(98, 102, 250, 0.2)' }}
          >
            <motion.div
              className="h-full"
              style={{ 
                background: 'linear-gradient(90deg, #6266FA 0%, #FFCF00 50%, #A38BF4 100%)',
                boxShadow: '0 0 20px rgba(98, 102, 250, 0.5)'
              }}
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative"
              >
                {/* Floating Icon */}
                <motion.div
                  className="relative z-10 mb-4"
                  animate={{
                    y: activeStep === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                      style={{
                        background: activeStep === index 
                          ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}DD 100%)`
                          : `rgba(30, 41, 59, 0.4)`,
                        border: `1px solid ${activeStep === index ? step.color : 'rgba(98, 102, 250, 0.2)'}`,
                        backdropFilter: 'blur(10px)',
                        boxShadow: activeStep === index ? `0 8px 32px ${step.color}40` : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <step.icon 
                        className="w-7 h-7"
                        style={{ color: activeStep === index ? '#fff' : step.color }}
                      />
                      
                      {/* Pulse effect on hover */}
                      {activeStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ border: `2px solid ${step.color}` }}
                          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="text-center"
                  animate={{
                    scale: activeStep === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="p-4 rounded-xl min-h-[140px]"
                    style={{
                      background: activeStep === index 
                        ? 'rgba(30, 41, 59, 0.6)' 
                        : 'rgba(30, 41, 59, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${activeStep === index ? step.color + '40' : 'rgba(98, 102, 250, 0.15)'}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <p style={{ 
                      fontSize: '11px', 
                      color: step.color,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>
                      {step.label}
                    </p>
                    
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: 700, 
                      color: '#E5E7EB',
                      marginBottom: '6px',
                      lineHeight: '1.3'
                    }}>
                      {step.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#95A3B2',
                      lineHeight: '1.5'
                    }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Step Number Badge */}
                <div
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center z-20"
                  style={{
                    background: step.color,
                    boxShadow: `0 0 20px ${step.color}60`
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>
                    {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span style={{ fontSize: '14px', color: '#E5E7EB' }}>
              60s total time
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span style={{ fontSize: '14px', color: '#E5E7EB' }}>
              100% automated
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span style={{ fontSize: '14px', color: '#E5E7EB' }}>
              Zero manual work
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
