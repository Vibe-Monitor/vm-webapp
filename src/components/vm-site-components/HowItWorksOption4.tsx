'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Option 4: Icon Grid with Hover Reveals
// Minimal grid - just icons and numbers, hover for details

export function HowItWorksOption4() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    { icon: Plug, number: '01', title: 'Connect', detail: 'One-time setup', color: '#6266FA' },
    { icon: Activity, number: '02', title: '24/7 Watch', detail: 'Auto-monitor', color: '#FFCF00' },
    { icon: Brain, number: '03', title: 'AI Detect', detail: 'AI analysis', color: '#6266FA' },
    { icon: Bell, number: '04', title: 'Slack Alert', detail: '< 60 seconds', color: '#FFCF00' },
    { icon: Search, number: '05', title: 'AI Guide', detail: 'Smart fix', color: '#10B981' },
    { icon: Sparkles, number: '06', title: 'Auto-Fix', detail: 'Coming soon', color: '#A38BF4' },
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#E5E7EB',
            marginBottom: '8px',
          }}>
            How it works
          </h2>
          <p style={{ fontSize: '14px', color: '#95A3B2' }}>
            Hover to explore
          </p>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <motion.div
                className="aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
                style={{
                  background: hoveredIndex === index 
                    ? `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`
                    : 'rgba(30, 41, 59, 0.3)',
                  border: `1px solid ${hoveredIndex === index ? step.color + '40' : 'rgba(98, 102, 250, 0.15)'}`,
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Background Glow */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${step.color}15 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Number Badge */}
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: hoveredIndex === index ? step.color : `${step.color}30`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    color: hoveredIndex === index ? '#fff' : step.color 
                  }}>
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? -5 : 0,
                    rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon 
                    className="w-12 h-12 mb-3"
                    style={{ color: hoveredIndex === index ? step.color : '#95A3B2' }}
                  />
                </motion.div>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: 700, 
                  color: hoveredIndex === index ? '#E5E7EB' : '#95A3B2',
                  marginBottom: '4px',
                  transition: 'all 0.2s ease'
                }}>
                  {step.title}
                </h3>

                {/* Detail appears on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      style={{ 
                        fontSize: '12px', 
                        color: step.color,
                        fontWeight: 600
                      }}
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Pulse ring on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Single Line Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p style={{ fontSize: '14px', color: '#95A3B2' }}>
            <span style={{ color: '#FFCF00', fontWeight: 700 }}>60s</span> total • Fully automated
          </p>
        </motion.div>
      </div>
    </section>
  );
}
