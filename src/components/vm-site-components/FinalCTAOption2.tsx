'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

// OPTION 2: Centered Minimal Orb
// Giant glowing orb with minimal floating content

export function FinalCTAOption2() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-8">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: '#050A14' }} />

      {/* Giant Central Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.2) 0%, rgba(98, 102, 250, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Orbital Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: `${400 + i * 150}px`,
            height: `${400 + i * 150}px`,
            border: '1px solid rgba(98, 102, 250, 0.1)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 3 === 0 ? '#FFCF00' : i % 3 === 1 ? '#6266FA' : '#10B981',
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        {/* Floating Stats Above */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-12 mb-16"
        >
          {[
            { number: '147', label: 'Errors investigated today', color: '#10B981' },
            { number: '59s', label: 'Average investigation time', color: '#FFCF00' },
            { number: '892+', label: 'Teams using', color: '#6266FA' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 700, 
                  color: stat.color,
                  letterSpacing: '-0.02em',
                  marginBottom: '4px'
                }}
              >
                {stat.number}
              </p>
              <p style={{ fontSize: '12px', color: '#95A3B2', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
          style={{ 
            fontWeight: 700, 
            fontSize: 'clamp(48px, 8vw, 80px)',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            color: '#E5E7EB',
          }}
        >
          Fix errors in{' '}
          <span 
            style={{
              background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 50%, #6266FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            minutes
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ 
            fontSize: '22px', 
            color: '#95A3B2',
            lineHeight: '1.6',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px auto'
          }}
        >
          Start your free account. No credit card required.
        </motion.p>

        {/* CTA Button - Larger */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ 
            scale: 1.08,
            boxShadow: '0 0 60px rgba(255, 207, 0, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden mb-12"
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
            Get started free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </motion.button>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {[
            { icon: Zap, text: '2-minute setup' },
            { icon: CheckCircle2, text: 'No credit card' },
            { icon: CheckCircle2, text: 'Cancel anytime' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[#10B981]" />
              <span style={{ fontSize: '14px', color: '#95A3B2' }}>
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
