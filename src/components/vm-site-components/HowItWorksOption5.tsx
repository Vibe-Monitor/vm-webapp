'use client';

import { motion } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Option 5: Animated Journey Path
// Visual flow with animated path connecting steps

export function HowItWorksOption5() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { icon: Plug, label: 'Connect', color: '#6266FA', x: 10, y: 20 },
    { icon: Activity, label: 'Monitor', color: '#FFCF00', x: 30, y: 35 },
    { icon: Brain, label: 'Analyze', color: '#6266FA', x: 50, y: 20 },
    { icon: Bell, label: 'Alert', color: '#FFCF00', x: 70, y: 35 },
    { icon: Search, label: 'Investigate', color: '#10B981', x: 90, y: 20 },
    { icon: Sparkles, label: 'Resolve', color: '#A38BF4', x: 95, y: 50 },
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#E5E7EB',
            marginBottom: '8px',
          }}>
            The journey
          </h2>
          <p style={{ fontSize: '14px', color: '#95A3B2' }}>
            From error to fix in 6 steps
          </p>
        </motion.div>

        {/* Path Container */}
        <div className="relative h-80 mb-12">
          {/* Animated Path SVG */}
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ overflow: 'visible' }}
          >
            <motion.path
              d="M 10,20 Q 20,50 30,35 T 50,20 Q 60,0 70,35 T 90,20 L 95,50"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6266FA" />
                <stop offset="33%" stopColor="#FFCF00" />
                <stop offset="66%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#A38BF4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Step Nodes */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${step.x}%`,
                top: `${step.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Glow Effect */}
              {activeStep === index && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ 
                    background: step.color,
                    width: '80px',
                    height: '80px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Node */}
              <motion.div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer"
                style={{
                  background: activeStep === index 
                    ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}DD 100%)`
                    : `rgba(30, 41, 59, 0.6)`,
                  border: `2px solid ${activeStep === index ? step.color : step.color + '40'}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeStep === index ? `0 8px 32px ${step.color}60` : 'none',
                }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: activeStep === index ? -5 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <step.icon 
                  className="w-7 h-7"
                  style={{ color: activeStep === index ? '#fff' : step.color }}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                <div
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: activeStep === index ? `${step.color}20` : 'rgba(30, 41, 59, 0.8)',
                    border: `1px solid ${activeStep === index ? step.color + '40' : 'rgba(98, 102, 250, 0.2)'}`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 700,
                    color: activeStep === index ? step.color : '#E5E7EB'
                  }}>
                    {step.label}
                  </span>
                </div>
              </motion.div>

              {/* Number Badge */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-20"
                style={{
                  background: step.color,
                  boxShadow: `0 0 15px ${step.color}60`
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>
                  {index + 1}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Animated Particle */}
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
              boxShadow: '0 0 20px #FFCF00',
              left: `${steps[0].x}%`,
              top: `${steps[0].y}%`,
            }}
            animate={{
              left: steps.map(s => `${s.x}%`),
              top: steps.map(s => `${s.y}%`),
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Bottom Stats - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FFCF00]" />
            <span style={{ fontSize: '14px', color: '#95A3B2' }}>
              <span style={{ color: '#FFCF00', fontWeight: 700 }}>60s</span> total
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span style={{ fontSize: '14px', color: '#95A3B2' }}>
              <span style={{ color: '#10B981', fontWeight: 700 }}>100%</span> automated
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
