'use client';

import { motion } from 'motion/react';
import { Zap, TrendingDown, Code2 } from 'lucide-react';

export function HeroOption4() {
  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: '#0C1829',
        minHeight: '100vh',
      }}
    >
      {/* Hexagon Pattern Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='rgba(98, 102, 250, 0.08)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          opacity: 0.4
        }}
      />

      {/* Spotlight Effect */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(98, 102, 250, 0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        {/* Top Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-6 mb-16"
        >
          {[
            { icon: TrendingDown, value: '94%', label: 'Fewer incidents', color: '#10B981' },
            { icon: Zap, value: '60s', label: 'Avg detection', color: '#FFCF00' },
            { icon: Code2, value: '200+', label: 'Teams shipped', color: '#6266FA' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-md"
              style={{
                background: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid rgba(98, 102, 250, 0.15)',
              }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#E5E7EB' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '11px', color: '#95A3B2', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Headline */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 
              style={{
                fontWeight: 800,
                fontSize: 'clamp(48px, 8vw, 92px)',
                lineHeight: '1.1',
                letterSpacing: '-0.04em',
                marginBottom: '24px'
              }}
            >
              <span style={{ color: '#E5E7EB' }}>Every error.</span>
              <br />
              <span 
                style={{
                  background: 'linear-gradient(135deg, #FFCF00 10%, #FF6B00 50%, #6266FA 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Every fix.
              </span>
              <br />
              <span style={{ color: '#E5E7EB' }}>Automated.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '21px',
              lineHeight: '1.6',
              color: '#95A3B2',
              maxWidth: '700px',
              margin: '0 auto 40px',
              fontWeight: 400
            }}
          >
            Stop firefighting production bugs. Vibemonitor detects, analyzes, and delivers actionable fixes before your morning coffee.
          </motion.p>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 60px rgba(255, 207, 0, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group"
              style={{
                padding: '20px 56px',
                background: 'linear-gradient(135deg, #FFCF00, #FFB800)',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 700,
                color: '#000000',
                boxShadow: '0 12px 40px rgba(255, 207, 0, 0.25)',
                letterSpacing: '0.3px'
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                }}
                animate={{
                  x: [-200, 400]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <span className="relative z-10">Deploy with confidence →</span>
            </motion.button>

            <div className="flex items-center gap-4 text-sm" style={{ color: '#95A3B2' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                Cancel anytime
              </div>
              <div className="w-1 h-1 rounded-full" style={{ background: '#2F4257' }} />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                No credit card
              </div>
              <div className="w-1 h-1 rounded-full" style={{ background: '#2F4257' }} />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                Setup in 8 minutes
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            {
              title: 'Instant alerts',
              desc: 'Slack notifications with exact error location and AI-generated fix',
              gradient: 'linear-gradient(135deg, rgba(98, 102, 250, 0.1), rgba(98, 102, 250, 0.05))',
              border: 'rgba(98, 102, 250, 0.3)',
              icon: '⚡'
            },
            {
              title: 'Smart analysis',
              desc: 'Machine learning identifies root cause and impact in real-time',
              gradient: 'linear-gradient(135deg, rgba(255, 207, 0, 0.1), rgba(255, 207, 0, 0.05))',
              border: 'rgba(255, 207, 0, 0.3)',
              icon: '🧠'
            },
            {
              title: 'Zero config',
              desc: 'One line of code. Works with any stack. Production-ready.',
              gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
              border: 'rgba(16, 185, 129, 0.3)',
              icon: '🚀'
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-xl backdrop-blur-sm"
              style={{
                background: card.gradient,
                border: `1px solid ${card.border}`,
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                {card.icon}
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 700, 
                color: '#E5E7EB',
                marginBottom: '8px'
              }}>
                {card.title}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#95A3B2',
                lineHeight: '1.6'
              }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
