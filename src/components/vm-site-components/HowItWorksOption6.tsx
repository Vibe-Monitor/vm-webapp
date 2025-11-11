'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Plug, Activity, Brain, Bell, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Option 6: Giant Numbers with Micro-interactions
// Big bold numbers, minimal text, playful animations

export function HowItWorksOption6() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const steps = [
    { 
      number: '01',
      icon: Plug, 
      word: 'Connect',
      micro: 'Setup',
      color: '#6266FA',
      accent: '5min'
    },
    { 
      number: '02',
      icon: Activity, 
      word: 'Monitor',
      micro: '24/7',
      color: '#FFCF00',
      accent: 'Live'
    },
    { 
      number: '03',
      icon: Brain, 
      word: 'Analyze',
      micro: 'AI',
      color: '#6266FA',
      accent: '2s'
    },
    { 
      number: '04',
      icon: Bell, 
      word: 'Alert',
      micro: 'Slack',
      color: '#FFCF00',
      accent: '60s'
    },
    { 
      number: '05',
      icon: Search, 
      word: 'Guide',
      micro: 'AI Fix',
      color: '#10B981',
      accent: 'Smart'
    },
    { 
      number: '06',
      icon: Sparkles, 
      word: 'Auto-Fix',
      micro: 'Soon',
      color: '#A38BF4',
      accent: '🔮'
    },
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
          }}>
            6 steps to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              zero errors
            </span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative group"
            >
              <motion.div
                className="rounded-2xl p-4 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                style={{
                  background: activeIndex === index 
                    ? `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 100%)`
                    : 'rgba(30, 41, 59, 0.3)',
                  border: `1px solid ${activeIndex === index ? step.color + '40' : 'rgba(98, 102, 250, 0.15)'}`,
                  backdropFilter: 'blur(10px)',
                  minHeight: '180px',
                }}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Giant Number Background */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                    opacity: activeIndex === index ? 0.15 : 0.08,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={{ 
                    fontSize: '120px', 
                    fontWeight: 700,
                    color: step.color,
                    lineHeight: 1,
                  }}>
                    {step.number}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    className="mb-3"
                    animate={{
                      rotate: activeIndex === index ? [0, -10, 10, -10, 0] : 0,
                      scale: activeIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon 
                      className="w-8 h-8 mx-auto"
                      style={{ color: activeIndex === index ? step.color : '#95A3B2' }}
                    />
                  </motion.div>

                  {/* Word */}
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: activeIndex === index ? '#E5E7EB' : '#95A3B2',
                    marginBottom: '6px',
                    transition: 'color 0.2s ease'
                  }}>
                    {step.word}
                  </h3>

                  {/* Micro Text */}
                  <p style={{ 
                    fontSize: '11px', 
                    color: step.color,
                    fontWeight: 600,
                    opacity: activeIndex === index ? 1 : 0.6,
                    transition: 'opacity 0.2s ease'
                  }}>
                    {step.micro}
                  </p>

                  {/* Accent Badge - appears on hover */}
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="mt-3"
                      >
                        <div
                          className="inline-block px-2 py-1 rounded-full"
                          style={{
                            background: step.color,
                            boxShadow: `0 0 20px ${step.color}60`
                          }}
                        >
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>
                            {step.accent}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover Glow */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${step.color}20 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Animated Border on Hover */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mt-12 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(98, 102, 250, 0.2)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6266FA 0%, #FFCF00 33%, #10B981 66%, #A38BF4 100%)',
              boxShadow: '0 0 20px rgba(98, 102, 250, 0.5)'
            }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>

        {/* Bottom Summary - Ultra Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255, 207, 0, 0.1)',
              border: '1px solid rgba(255, 207, 0, 0.2)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#FFCF00]"
            />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFCF00' }}>
              60s
            </span>
            <span style={{ fontSize: '13px', color: '#95A3B2' }}>
              • Automated
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
