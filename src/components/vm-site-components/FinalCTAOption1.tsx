'use client';

import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

// OPTION 1: Split Screen Dramatic
// Left: Dark with pulsing error visualization
// Right: Bright gradient with CTA

export function FinalCTAOption1() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left Side - Dark Error Visualization */}
      <div 
        className="w-full lg:w-1/2 h-screen flex items-center justify-center relative"
        style={{ background: '#050A14' }}
      >
        {/* Animated Error Pulse */}
        <div className="relative">
          {/* Center Error Icon */}
          <motion.div
            className="relative z-10 w-32 h-32 rounded-3xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 0 60px rgba(239, 68, 68, 0.4)'
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <span style={{ fontSize: '64px' }}>⚠️</span>
          </motion.div>

          {/* Pulsing Rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(239, 68, 68, 0.3)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                width: ['128px', '400px'],
                height: ['128px', '400px'],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeOut'
              }}
            />
          ))}

          {/* Error Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p style={{ fontSize: '14px', color: '#EF4444', fontWeight: 700, marginBottom: '4px' }}>
              WITHOUT VIBEMONITOR
            </p>
            <p style={{ fontSize: '48px', fontWeight: 700, color: '#EF4444', letterSpacing: '-0.02em' }}>
              147
            </p>
            <p style={{ fontSize: '14px', color: '#95A3B2' }}>
              Unresolved errors
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Bright CTA */}
      <div 
        className="w-full lg:w-1/2 h-screen flex items-center justify-center relative px-8"
        style={{
          background: 'linear-gradient(135deg, #0F1828 0%, #1a2332 100%)',
        }}
      >
        {/* Gradient Orb */}
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 207, 0, 0.3) 0%, transparent 70%)',
            transform: 'translate(-30%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <div className="max-w-xl relative z-10">
          {/* Success Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>
              WITH VIBEMONITOR
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6"
            style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#E5E7EB',
            }}
          >
            Stop letting errors{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              pile up
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: '20px', 
              color: '#95A3B2',
              lineHeight: '1.6',
              marginBottom: '40px'
            }}
          >
            Start fixing them in minutes. Every time.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-8 mb-12"
          >
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#10B981', letterSpacing: '-0.02em' }}>
                0
              </p>
              <p style={{ fontSize: '14px', color: '#95A3B2' }}>
                Unresolved errors
              </p>
            </div>
            <div className="w-px h-16 bg-[#2F4257]" />
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#FFCF00', letterSpacing: '-0.02em' }}>
                2.3s
              </p>
              <p style={{ fontSize: '14px', color: '#95A3B2' }}>
                To fix each one
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(255, 207, 0, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden"
            style={{
              padding: '20px 56px',
              background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255, 207, 0, 0.3)'
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              }}
              animate={{
                x: [-300, 300]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            
            <span 
              className="relative z-10 flex items-center gap-2"
              style={{
                fontWeight: 700,
                fontSize: '18px',
                color: '#000000',
                letterSpacing: '0.3px'
              }}
            >
              Start fixing errors now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '14px', color: '#95A3B2', marginTop: '24px' }}
          >
            Start free  •  No credit card  •  2-minute setup
          </motion.p>
        </div>
      </div>

      {/* Diagonal Divider Line */}
      <motion.div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#6266FA] to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
      />
    </section>
  );
}
