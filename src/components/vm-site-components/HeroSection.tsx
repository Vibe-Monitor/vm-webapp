'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: '#0C1829',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(98, 102, 250, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 102, 250, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Gradient Glow Effects */}
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '800px',
          height: '600px',
          left: '-300px',
          bottom: '0',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.35) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          width: '700px',
          height: '700px',
          right: '-200px',
          top: '-100px',
          background: 'radial-gradient(circle, rgba(163, 139, 244, 0.4) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-8 py-32">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
            style={{
              background: 'rgba(98, 102, 250, 0.1)',
              border: '1px solid rgba(98, 102, 250, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#FFD11B' }} />
            <span style={{ 
              fontSize: '14px', 
              color: '#E5E7EB',
              fontWeight: 500
            }}>
              AI-Powered Error Detection
            </span>
          </div>
        </motion.div>

        {/* Main Heading with Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
          style={{
            maxWidth: '1000px',
            fontWeight: 600,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #FFCF00 0%, rgba(255, 207, 0, 0.9) 30%, #A38BF4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}
        >
          Detect Production errors in less than{' '}
          <span 
            style={{
              background: 'linear-gradient(135deg, #A38BF4 0%, #8B7AD5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            2 minutes
          </span>
        </motion.h1>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10" 
          style={{ maxWidth: '800px' }}
        >
          <p 
            className="text-center"
            style={{
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: '1.5',
              color: '#95A3B2',
              fontWeight: 500
            }}
          >
            Vibemonitor continuously monitors your servers. Exact file location, impact, and AI insights delivered to Slack instantly.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(255, 207, 0, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden transition-all duration-300"
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(255, 207, 0, 0.3)'
            }}
          >
            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
              animate={{
                x: [-200, 400]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
            
            <span 
              className="relative z-10 flex items-center gap-2"
              style={{
                fontWeight: 700,
                fontSize: '18px',
                textTransform: 'uppercase',
                color: '#000000',
                letterSpacing: '0.5px'
              }}
            >
              Try for Free
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center gap-6 flex-wrap justify-center"
        >
          {/* Quick Integration */}
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(98, 102, 250, 0.08)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
            }}
          >
            <div 
              className="flex items-center justify-center w-5 h-5 rounded-full"
              style={{ background: 'rgba(98, 102, 250, 0.2)' }}
            >
              <span style={{ color: '#6266FA', fontSize: '12px' }}>⚡</span>
            </div>
            <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
              Integrate and start debugging in less than 10 min
            </span>
          </motion.div>

          {/* No Credit Card */}
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(255, 207, 0, 0.08)',
              border: '1px solid rgba(255, 207, 0, 0.2)',
            }}
          >
            <div 
              className="flex items-center justify-center w-5 h-5 rounded-full"
              style={{ background: 'rgba(255, 207, 0, 0.2)' }}
            >
              <span style={{ color: '#FFCF00', fontSize: '12px' }}>✓</span>
            </div>
            <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
              Try for free - no credit card required
            </span>
          </motion.div>

          {/* Live Counter */}
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ background: '#10B981' }}
            />
            <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>
              124 errors fixed today
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-2"
          >
            <span style={{ fontSize: '12px', color: '#95A3B2', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Scroll to explore
            </span>
            <div 
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
              style={{ borderColor: '#2F4257' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-2 rounded-full"
                style={{ background: '#6266FA' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            background: i % 3 === 0 ? '#FFCF00' : i % 3 === 1 ? '#6266FA' : '#A38BF4',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  );
}
