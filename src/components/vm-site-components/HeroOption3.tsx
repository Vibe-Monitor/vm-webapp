'use client';

import { motion } from 'motion/react';
import { Play, Terminal, Rocket } from 'lucide-react';

export function HeroOption3() {
  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0F1828 0%, #0C1520 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Dynamic Grid with Pulse */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(98, 102, 250, 0.06) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(98, 102, 250, 0.06) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.5
        }}
      />

      {/* Morphing Blobs */}
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.3, 1.1, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ['30% 70% 70% 30%', '70% 30% 30% 70%', '50% 50% 50% 50%', '30% 70% 70% 30%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '600px',
          height: '600px',
          left: '-10%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.2, 1.4, 1],
          rotate: [360, 270, 180, 90, 0],
          borderRadius: ['70% 30% 50% 50%', '50% 50% 30% 70%', '30% 70% 70% 30%', '70% 30% 50% 50%']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          width: '700px',
          height: '700px',
          right: '-15%',
          bottom: '10%',
          background: 'radial-gradient(circle, rgba(163, 139, 244, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-2xl">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(98, 102, 250, 0)',
                  '0 0 0 8px rgba(98, 102, 250, 0.1)',
                  '0 0 0 0 rgba(98, 102, 250, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                background: 'rgba(98, 102, 250, 0.15)',
                border: '1px solid rgba(98, 102, 250, 0.3)',
              }}
            >
              <Rocket className="w-4 h-4" style={{ color: '#FFD11B' }} />
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 600,
                color: '#E5E7EB'
              }}>
                Trusted by 200+ engineering teams
              </span>
            </motion.div>
          </motion.div>

          {/* Power Headline */}
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontWeight: 700,
              fontSize: 'clamp(42px, 6vw, 68px)',
              lineHeight: '1.15',
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}
          >
            <span style={{ color: '#E5E7EB' }}>
              Your AI debugging
            </span>
            <br />
            <span 
              style={{
                background: 'linear-gradient(135deg, #FFCF00 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              co-pilot
            </span>
            {' '}
            <span style={{ color: '#E5E7EB' }}>is here</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '22px',
              lineHeight: '1.6',
              color: '#95A3B2',
              marginBottom: '32px',
              fontWeight: 400
            }}
          >
            Catch production errors faster than you can say "It works on my machine." AI analyzes, fixes, and alerts—all in one Slack message.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group"
              style={{
                padding: '18px 32px',
                background: 'linear-gradient(135deg, #6266FA 0%, #5558E3 100%)',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '16px',
                color: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(98, 102, 250, 0.3)'
              }}
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Start debugging smarter
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '18px 32px',
                background: 'transparent',
                border: '2px solid rgba(229, 231, 235, 0.2)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '16px',
                color: '#E5E7EB',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch 60s demo
              </span>
            </motion.button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex gap-8"
          >
            {[
              { value: '< 60s', label: 'Error detection' },
              { value: '98%', label: 'Fix accuracy' },
              { value: '10m', label: 'Setup time' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: '#FFCF00',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#95A3B2' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Visual Element */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-xl"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
            style={{
              background: 'rgba(30, 41, 59, 0.3)',
              borderRadius: '16px',
              border: '1px solid rgba(98, 102, 250, 0.2)',
              padding: '32px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span style={{ 
                marginLeft: '12px', 
                fontSize: '13px', 
                color: '#95A3B2',
                fontFamily: 'monospace'
              }}>
                vibemonitor.log
              </span>
            </div>

            {/* Terminal Content */}
            <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              {[
                { text: '✓ Error detected: payment.js:234', color: '#EF4444', delay: 0 },
                { text: '⚡ AI analysis complete: 2.3s', color: '#FFCF00', delay: 0.5 },
                { text: '✓ Fix generated: api.retry()', color: '#10B981', delay: 1 },
                { text: '📢 Slack alert sent', color: '#6266FA', delay: 1.5 },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: line.delay + 0.5 }}
                  style={{
                    color: line.color,
                    marginBottom: '12px',
                    padding: '8px 12px',
                    background: `${line.color}15`,
                    borderRadius: '6px',
                    border: `1px solid ${line.color}40`
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl opacity-0"
              animate={{
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                background: 'linear-gradient(135deg, #6266FA, #A38BF4)',
                filter: 'blur(20px)',
                zIndex: -1
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
