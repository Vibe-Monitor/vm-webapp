'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function HeroOption2() {
  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: '#0C1829',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Minimal Dot Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(98, 102, 250, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          opacity: 0.3
        }}
      />

      {/* Subtle Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(98, 102, 250, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 max-w-6xl mx-auto">
        {/* Minimal Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5"
            style={{
              fontSize: '13px',
              color: '#95A3B2',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
            Production Error Intelligence
          </div>
        </motion.div>

        {/* Elegant Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
          style={{
            maxWidth: '900px',
            fontWeight: 600,
            fontSize: 'clamp(44px, 7vw, 72px)',
            lineHeight: '1.15',
            letterSpacing: '-0.04em',
            color: '#E5E7EB'
          }}
        >
          Errors caught.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6266FA 0%, #A38BF4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Fixes ready.
          </span>
          <br />
          In 60 seconds.
        </motion.h1>

        {/* Clean Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
          style={{
            maxWidth: '580px',
            fontSize: '20px',
            lineHeight: '1.7',
            color: '#95A3B2',
            fontWeight: 400
          }}
        >
          AI-powered error monitoring that pinpoints the exact file, line, and solution—delivered to Slack before impact.
        </motion.p>

        {/* Refined CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            style={{
              padding: '20px 48px',
              background: '#E5E7EB',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '16px',
              color: '#0C1829',
              letterSpacing: '0.3px',
              boxShadow: '0 4px 20px rgba(229, 231, 235, 0.15)'
            }}
          >
            Get started free
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '14px',
              color: '#95A3B2',
              textAlign: 'center',
              marginTop: '12px'
            }}
          >
            No credit card • 2-minute setup • Cancel anytime
          </motion.p>
        </motion.div>

        {/* Elegant Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {[
            { label: 'Instant detection', desc: 'Errors caught in production within 60s' },
            { label: 'AI-powered fixes', desc: 'Exact solutions with 98% accuracy' },
            { label: 'Slack integration', desc: 'Alerts delivered where you work' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-start gap-3 p-5 rounded-xl"
              style={{
                background: 'rgba(30, 41, 59, 0.2)',
                border: '1px solid rgba(98, 102, 250, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: 'rgba(98, 102, 250, 0.15)',
                  border: '1.5px solid rgba(98, 102, 250, 0.3)'
                }}
              >
                <Check className="w-3 h-3" style={{ color: '#6266FA' }} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#E5E7EB', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '14px', color: '#95A3B2', lineHeight: '1.5' }}>
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
