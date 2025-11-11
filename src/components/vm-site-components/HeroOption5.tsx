'use client';

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroOption5() {
  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: '#0C1829',
        minHeight: '100vh',
      }}
    >
      {/* Animated Mesh Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(98, 102, 250, 0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(98, 102, 250, 0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(98, 102, 250, 0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(98, 102, 250, 0.03) 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
          opacity: 0.5
        }}
      />

      {/* Glowing Orbs */}
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '500px',
          height: '500px',
          left: '5%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          width: '600px',
          height: '600px',
          right: '5%',
          bottom: '15%',
          background: 'radial-gradient(circle, rgba(98, 102, 250, 0.3) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 207, 0, 0.15), rgba(163, 139, 244, 0.15))',
                border: '1px solid rgba(255, 207, 0, 0.3)',
                boxShadow: '0 4px 20px rgba(255, 207, 0, 0.1)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#FFD11B' }} />
              </motion.div>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 600,
                background: 'linear-gradient(135deg, #FFD11B, #A38BF4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                The future of error monitoring
              </span>
            </motion.div>
          </motion.div>

          {/* Power Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontWeight: 800,
              fontSize: 'clamp(44px, 7vw, 88px)',
              lineHeight: '1.1',
              letterSpacing: '-0.04em',
              marginBottom: '28px'
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#E5E7EB' }}
            >
              Build faster.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, #FFCF00 0%, #FF8C00 50%, #6266FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Break nothing.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: '23px',
              lineHeight: '1.6',
              color: '#95A3B2',
              maxWidth: '800px',
              margin: '0 auto 48px',
              fontWeight: 400
            }}
          >
            Vibemonitor is your team's safety net. Catch errors in 60 seconds, get AI-powered fixes, and sleep better at night.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(98, 102, 250, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
              style={{
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #6266FA, #5558E3)',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '17px',
                fontWeight: 700,
                color: '#FFFFFF',
                boxShadow: '0 12px 40px rgba(98, 102, 250, 0.3)',
                letterSpacing: '0.3px',
                overflow: 'hidden'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Get started free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '20px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(229, 231, 235, 0.2)',
                borderRadius: '14px',
                cursor: 'pointer',
                fontSize: '17px',
                fontWeight: 600,
                color: '#E5E7EB',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.3px'
              }}
            >
              View live dashboard
            </motion.button>
          </motion.div>

          {/* Trust Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl backdrop-blur-md"
            style={{
              background: 'rgba(30, 41, 59, 0.3)',
              border: '1px solid rgba(98, 102, 250, 0.15)',
            }}
          >
            {[
              { label: 'Setup', value: '< 10 minutes', icon: '⚡' },
              { label: 'Detection', value: '60 seconds', icon: '🎯' },
              { label: 'Teams', value: '200+ live', icon: '🚀' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                {i > 0 && (
                  <div 
                    className="w-px h-8 mr-4"
                    style={{ background: 'rgba(98, 102, 250, 0.2)' }}
                  />
                )}
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div className="text-left">
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#95A3B2',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '2px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: '#E5E7EB'
                  }}>
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {[
              'No credit card required',
              'Start free trial',
              'Cancel anytime',
              'SOC 2 compliant'
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
                <span style={{ 
                  fontSize: '14px', 
                  color: '#E5E7EB',
                  fontWeight: 500
                }}>
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
