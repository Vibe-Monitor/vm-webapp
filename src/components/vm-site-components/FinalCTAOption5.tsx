'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { VibemonitorLogo } from './VibemonitorLogo';

// OPTION 5: Full-Width Gradient Mesh
// Vibrant gradient mesh background with central content

export function FinalCTAOption5() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0F1828 0%, #1a2038 100%)',
          }}
        />

        {/* Gradient Mesh Orbs */}
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(98, 102, 250, 0.4) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 80% 70%, rgba(255, 207, 0, 0.3) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
        
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(163, 139, 244, 0.25) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
        />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <VibemonitorLogo size={80} />
            </motion.div>
          </motion.div>

          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.2), rgba(255, 207, 0, 0.2))',
                border: '1px solid rgba(98, 102, 250, 0.4)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Zap className="w-5 h-5 text-[#FFCF00]" />
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#E5E7EB', letterSpacing: '0.5px' }}>
                ERROR MONITORING REIMAGINED
              </span>
            </div>
          </motion.div>

          {/* Main Headline - HUGE */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
            style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(48px, 10vw, 96px)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: '#E5E7EB',
            }}
          >
            Errors get fixed.
            <br />
            <span 
              style={{
                background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 40%, #6266FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              You keep shipping.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ 
              fontSize: 'clamp(18px, 2.5vw, 28px)', 
              color: '#95A3B2',
              lineHeight: '1.5',
              maxWidth: '800px',
              margin: '0 auto 64px auto',
              fontWeight: 500
            }}
          >
            AI-powered monitoring that catches production errors and delivers exact fixes to Slack in under 60 seconds.
          </motion.p>

          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-12 flex-wrap mb-16"
          >
            {[
              { value: '147', label: 'Errors fixed today', color: '#10B981', prefix: '' },
              { value: '2.3', label: 'Seconds per fix', color: '#FFCF00', prefix: '' },
              { value: '892', label: 'Teams monitoring', color: '#6266FA', prefix: '+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}40, transparent)`,
                    padding: '2px',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />

                <div
                  className="relative px-8 py-6 rounded-2xl min-w-[180px]"
                  style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <motion.p
                    style={{ 
                      fontSize: '42px', 
                      fontWeight: 700, 
                      color: stat.color,
                      letterSpacing: '-0.02em',
                      lineHeight: '1',
                      marginBottom: '8px'
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {stat.value}{stat.prefix}
                  </motion.p>
                  <p style={{ fontSize: '13px', color: '#95A3B2', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6 flex-wrap mb-12"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 0 60px rgba(255, 207, 0, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden"
              style={{
                padding: '24px 64px',
                background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 12px 48px rgba(255, 207, 0, 0.4)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                }}
                animate={{
                  x: [-400, 400]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
              
              <span 
                className="relative z-10 flex items-center gap-3"
                style={{
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#000000',
                  letterSpacing: '0.3px'
                }}
              >
                Start for free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(98, 102, 250, 0.15)'
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
              style={{
                padding: '24px 48px',
                background: 'transparent',
                border: '2px solid rgba(98, 102, 250, 0.5)',
                borderRadius: '16px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{
                fontWeight: 600,
                fontSize: '18px',
                color: '#6266FA',
                letterSpacing: '0.3px'
              }}>
                Watch demo
              </span>
            </motion.button>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-8 flex-wrap"
          >
            {['No credit card required', '2-minute setup', 'Cancel anytime', 'SOC 2 compliant'].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span style={{ fontSize: '14px', color: '#95A3B2' }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Bottom Ambient Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-24 h-px mx-auto"
            style={{
              maxWidth: '600px',
              background: 'linear-gradient(90deg, transparent, rgba(98, 102, 250, 0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
