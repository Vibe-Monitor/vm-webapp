'use client';

import { motion } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function HowItWorksMinimalSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: '01',
      icon: Plug,
      label: 'Server Connection',
      title: 'Connect your infrastructure',
      description: 'Connect Grafana dashboards or server logs to Vibemonitor. One-time setup. Works with existing infrastructure.',
      color: '#6266FA',
      gradient: 'linear-gradient(135deg, #6266FA 0%, #8B8EFF 100%)',
      badge: 'One-time setup',
    },
    {
      number: '02',
      icon: Activity,
      label: 'Continuous Monitoring',
      title: '24/7 monitoring active',
      description: '24/7 monitoring of logs, traces, and metrics across all servers.',
      color: '#FFCF00',
      gradient: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
      badge: 'Always active',
    },
    {
      number: '03',
      icon: Brain,
      label: 'AI-Powered Analysis',
      title: 'Intelligent error detection',
      description: 'AI identifies errors and anomalies. Learns your system patterns.',
      color: '#6266FA',
      gradient: 'linear-gradient(135deg, #6266FA 0%, #A38BF4 100%)',
      badge: 'AI-powered',
    },
    {
      number: '04',
      icon: Bell,
      label: 'Real-Time Slack Alert',
      title: 'Instant team notification',
      description: 'Slack notification with: exact file location, line number, affected service, severity, and AI recommendations.',
      color: '#FFCF00',
      gradient: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
      badge: '< 60 seconds',
    },
    {
      number: '05',
      icon: Search,
      label: 'AI-Assisted Investigation',
      title: 'Smart resolution insights',
      description: "Vibemonitor's AI provides intelligent insights for faster resolution.",
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      badge: 'Guided fixes',
    },
    {
      number: '06',
      icon: Sparkles,
      label: 'Auto-Resolution',
      title: 'Automatic fixes (upcoming)',
      description: 'We can resolve errors automatically in the future.',
      color: '#A38BF4',
      gradient: 'linear-gradient(135deg, #A38BF4 0%, #C4B5FD 100%)',
      badge: 'Coming soon',
      upcoming: true,
    },
  ];

  return (
    <section className="relative py-32 px-8 overflow-hidden">
      {/* Animated Background - matching hero/demo sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(255, 207, 0, 0.12) 0%, transparent 70%)',
            top: '10%',
            right: '-200px',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(98, 102, 250, 0.15) 0%, transparent 70%)',
            bottom: '10%',
            left: '-150px',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(98, 102, 250, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(98, 102, 250, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Bold Headline - matching hero style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div
              className="px-5 py-2 rounded-full"
              style={{
                background: 'rgba(98, 102, 250, 0.1)',
                border: '1px solid rgba(98, 102, 250, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#6266FA',
                letterSpacing: '0.5px'
              }}>
                ⚙️ THE PROCESS
              </span>
            </div>
          </motion.div>
          
          <h2 
            className="mb-6"
            style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#E5E7EB',
            }}
          >
            How{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #6266FA 0%, #A38BF4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vibemonitor
            </span>
            {' '}works
          </h2>
          
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            color: '#95A3B2',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            From error detection to resolution in 6 automated steps
          </p>
        </motion.div>

        {/* Vertical Workflow Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div 
            className="absolute left-6 lg:left-12 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: 'linear-gradient(180deg, rgba(98, 102, 250, 0.3) 0%, rgba(255, 207, 0, 0.3) 50%, rgba(163, 139, 244, 0.3) 100%)',
            }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="flex gap-6 lg:gap-8">
                  {/* Icon Circle */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl flex items-center justify-center relative z-10"
                      style={{
                        background: step.gradient,
                        boxShadow: `0 0 40px ${step.color}40`,
                      }}
                      animate={{
                        scale: activeStep === index ? 1.1 : 1,
                        boxShadow: activeStep === index 
                          ? `0 0 60px ${step.color}60` 
                          : `0 0 40px ${step.color}40`,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon 
                        className="w-6 h-6 lg:w-12 lg:h-12 text-white" 
                      />
                      
                      {/* Pulsing rings on hover */}
                      {activeStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl lg:rounded-3xl"
                          style={{
                            border: `2px solid ${step.color}`,
                          }}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut'
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className="flex-1"
                    animate={{
                      scale: activeStep === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="rounded-2xl p-6 lg:p-8 h-full"
                      style={{
                        background: activeStep === index 
                          ? 'rgba(30, 41, 59, 0.5)' 
                          : 'rgba(30, 41, 59, 0.3)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${activeStep === index ? step.color + '40' : 'rgba(98, 102, 250, 0.2)'}`,
                        boxShadow: activeStep === index 
                          ? `0 20px 60px ${step.color}20` 
                          : '0 10px 40px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span 
                              style={{ 
                                fontSize: '36px', 
                                fontWeight: 700,
                                background: step.gradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                lineHeight: 1
                              }}
                            >
                              {step.number}
                            </span>
                            <span 
                              style={{ 
                                fontSize: '12px', 
                                color: '#95A3B2',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontWeight: 600
                              }}
                            >
                              {step.label}
                            </span>
                          </div>
                        </div>
                        
                        {/* Badge */}
                        <div
                          className="px-3 py-1.5 rounded-full"
                          style={{
                            background: step.upcoming ? 'rgba(163, 139, 244, 0.15)' : `${step.color}20`,
                            border: `1px solid ${step.upcoming ? 'rgba(163, 139, 244, 0.3)' : step.color + '30'}`,
                          }}
                        >
                          <span 
                            style={{ 
                              fontSize: '11px', 
                              fontWeight: 700,
                              color: step.upcoming ? '#A38BF4' : step.color,
                              letterSpacing: '0.5px'
                            }}
                          >
                            {step.badge}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="mb-3"
                        style={{ 
                          fontSize: 'clamp(20px, 3vw, 28px)', 
                          fontWeight: 700, 
                          color: '#E5E7EB',
                          lineHeight: '1.2',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p 
                        style={{ 
                          fontSize: 'clamp(14px, 2vw, 16px)', 
                          color: '#95A3B2',
                          lineHeight: '1.7',
                          marginBottom: step.upcoming ? '12px' : '0'
                        }}
                      >
                        {step.description}
                      </p>

                      {/* Upcoming indicator */}
                      {step.upcoming && (
                        <div className="flex items-center gap-2 mt-4">
                          <Sparkles className="w-4 h-4 text-[#A38BF4]" />
                          <span style={{ fontSize: '13px', color: '#A38BF4', fontWeight: 600 }}>
                            In development
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div
            className="rounded-3xl p-8 lg:p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.1) 0%, rgba(255, 207, 0, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 102, 250, 0.3)',
              boxShadow: '0 20px 60px rgba(98, 102, 250, 0.1)'
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <Sparkles className="w-8 h-8 text-[#FFCF00]" />
              </motion.div>
              <span 
                style={{ 
                  fontSize: 'clamp(24px, 4vw, 36px)', 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Total time: 60 seconds
              </span>
            </div>
            
            <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: '#95A3B2', marginBottom: '24px' }}>
              From error detection to team notification—fully automated
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
                  Zero manual work
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
                  AI-powered insights
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
                  Instant notifications
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
