'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

// OPTION 3: Diagonal Slash Design
// Dramatic diagonal cut with contrasting sections

export function FinalCTAOption3() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 147 ? prev + 7 : 147));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Top Section - Dark with gradient */}
      <div 
        className="absolute inset-0 h-1/2 top-0"
        style={{
          background: 'linear-gradient(180deg, #0F1828 0%, #1a2332 100%)',
        }}
      />

      {/* Bottom Section - Nearly Black */}
      <div 
        className="absolute inset-0 h-1/2 bottom-0 top-auto"
        style={{
          background: '#050A14',
        }}
      />

      {/* Diagonal Slash Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #6266FA 0%, #8B8EFF 100%)',
          clipPath: 'polygon(0 40%, 100% 25%, 100% 60%, 0 75%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Animated Grid on Slash */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Diagonal Shine */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stats & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              {/* Counter */}
              <div>
                <motion.div
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-6"
                  style={{
                    background: 'rgba(255, 207, 0, 0.15)',
                    border: '1px solid rgba(255, 207, 0, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Zap className="w-5 h-5 text-[#FFCF00]" />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFCF00', letterSpacing: '0.5px' }}>
                    LIVE COUNTER
                  </span>
                </motion.div>

                <motion.p
                  style={{ 
                    fontSize: 'clamp(64px, 10vw, 120px)', 
                    fontWeight: 700, 
                    background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.03em',
                    lineHeight: '1',
                    marginBottom: '16px'
                  }}
                >
                  {count}
                </motion.p>
                <p style={{ fontSize: '24px', color: '#E5E7EB', fontWeight: 600, marginBottom: '8px' }}>
                  Errors auto-fixed today
                </p>
                <p style={{ fontSize: '16px', color: '#95A3B2', lineHeight: '1.6' }}>
                  Join 892+ engineering teams catching production errors in under 5 minutes.
                </p>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="p-5 rounded-xl"
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(98, 102, 250, 0.2)',
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(98, 102, 250, 0.4)' }}
                >
                  <p style={{ fontSize: '32px', fontWeight: 700, color: '#6266FA', letterSpacing: '-0.02em' }}>
                    2.3s
                  </p>
                  <p style={{ fontSize: '13px', color: '#95A3B2' }}>
                    Avg fix time
                  </p>
                </motion.div>

                <motion.div
                  className="p-5 rounded-xl"
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                >
                  <p style={{ fontSize: '32px', fontWeight: 700, color: '#10B981', letterSpacing: '-0.02em' }}>
                    100%
                  </p>
                  <p style={{ fontSize: '13px', color: '#95A3B2' }}>
                    Automated
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 102, 250, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Gradient Orb Inside Card */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(98, 102, 250, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10">
                <h2 
                  className="mb-6"
                  style={{ 
                    fontWeight: 700, 
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                    color: '#E5E7EB',
                  }}
                >
                  Your next error{' '}
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    fixes itself
                  </span>
                </h2>

                <p style={{ fontSize: '18px', color: '#95A3B2', lineHeight: '1.6', marginBottom: '32px' }}>
                  Start monitoring production in 2 minutes. Get AI-powered fixes delivered to Slack in under 60 seconds.
                </p>

                {/* Email Input + Button */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your work email"
                      className="flex-1 px-5 py-4 rounded-xl outline-none"
                      style={{
                        background: 'rgba(15, 24, 40, 0.6)',
                        border: '1px solid rgba(98, 102, 250, 0.3)',
                        color: '#E5E7EB',
                        fontSize: '15px'
                      }}
                    />
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 40px rgba(255, 207, 0, 0.5)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden"
                      style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 32px rgba(255, 207, 0, 0.3)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span 
                        className="flex items-center gap-2"
                        style={{
                          fontWeight: 700,
                          fontSize: '16px',
                          color: '#000000',
                        }}
                      >
                        Start free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>

                  <p style={{ fontSize: '13px', color: '#95A3B2', textAlign: 'center' }}>
                    No credit card required  •  Cancel anytime  •  2-minute setup
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-[#2F4257] flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>✓</p>
                    <p style={{ fontSize: '12px', color: '#95A3B2' }}>SOC 2</p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>✓</p>
                    <p style={{ fontSize: '12px', color: '#95A3B2' }}>GDPR</p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>✓</p>
                    <p style={{ fontSize: '12px', color: '#95A3B2' }}>ISO 27001</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
