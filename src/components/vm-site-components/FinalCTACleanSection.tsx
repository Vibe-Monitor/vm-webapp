'use client';

import { motion } from 'motion/react';
import { ArrowRight, Play, Zap, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FinalCTACleanSection() {
  const [errorsFixed, setErrorsFixed] = useState(147);
  const [activeUsers, setActiveUsers] = useState(892);

  useEffect(() => {
    // Animate errors fixed counter
    const errorsInterval = setInterval(() => {
      setErrorsFixed((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);

    // Animate active users counter
    const usersInterval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 2));
    }, 6000);

    return () => {
      clearInterval(errorsInterval);
      clearInterval(usersInterval);
    };
  }, []);

  return (
    <section className="relative py-32 px-8 overflow-hidden">
      {/* Animated Background - matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(98, 102, 250, 0.2) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 207, 0, 0.15) 0%, transparent 70%)',
            top: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(98, 102, 250, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(98, 102, 250, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Headline */}
          <h2 
            className="mb-6"
            style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(36px, 6vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#E5E7EB',
            }}
          >
            Your next error will{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              fix itself
            </span>
          </h2>

          {/* Subheadline */}
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            color: '#95A3B2',
            maxWidth: '700px',
            margin: '0 auto 48px auto',
            lineHeight: '1.6'
          }}>
            Join the teams shipping code without fear. Start free. No credit card.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(255, 207, 0, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden"
              style={{
                padding: '18px 48px',
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
                  fontSize: '17px',
                  color: '#000000',
                  letterSpacing: '0.3px'
                }}
              >
                Start Fixing Errors in 60s
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(98, 102, 250, 0.15)'
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
              style={{
                padding: '16px 40px',
                background: 'transparent',
                border: '2px solid rgba(98, 102, 250, 0.5)',
                borderRadius: '12px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Play className="w-5 h-5" style={{ color: '#6266FA' }} />
              <span style={{
                fontWeight: 600,
                fontSize: '16px',
                color: '#6266FA',
                letterSpacing: '0.3px'
              }}>
                See Demo
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Live Value Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Metric 1: Errors Fixed */}
          <motion.div
            className="relative p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: 'rgba(16, 185, 129, 0.5)'
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                </div>
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-[#10B981]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <motion.p
                key={errorsFixed}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ 
                  fontSize: '42px', 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                {errorsFixed}
              </motion.p>
              <p style={{ fontSize: '14px', color: '#95A3B2', fontWeight: 500 }}>
                Errors fixed today
              </p>
            </div>
          </motion.div>

          {/* Metric 2: Response Time */}
          <motion.div
            className="relative p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 207, 0, 0.3)',
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: 'rgba(255, 207, 0, 0.5)'
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(255, 207, 0, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 207, 0, 0.2) 0%, rgba(255, 207, 0, 0.1) 100%)',
                    border: '1px solid rgba(255, 207, 0, 0.3)'
                  }}
                >
                  <Zap className="w-6 h-6 text-[#FFCF00]" />
                </div>
              </div>
              
              <p
                style={{ 
                  fontSize: '42px', 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                59s
              </p>
              <p style={{ fontSize: '14px', color: '#95A3B2', fontWeight: 500 }}>
                Average fix time
              </p>
            </div>
          </motion.div>

          {/* Metric 3: Active Users */}
          <motion.div
            className="relative p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 102, 250, 0.3)',
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: 'rgba(98, 102, 250, 0.5)'
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(98, 102, 250, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.2) 0%, rgba(98, 102, 250, 0.1) 100%)',
                    border: '1px solid rgba(98, 102, 250, 0.3)'
                  }}
                >
                  <TrendingUp className="w-6 h-6 text-[#6266FA]" />
                </div>
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-[#6266FA]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </div>
              
              <motion.p
                key={activeUsers}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ 
                  fontSize: '42px', 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #6266FA 0%, #8B8EFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                {activeUsers}+
              </motion.p>
              <p style={{ fontSize: '14px', color: '#95A3B2', fontWeight: 500 }}>
                Developers monitoring
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators - Glassmorphic Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {[
            { icon: Clock, text: '2-minute setup', color: '#6266FA' },
            { icon: CheckCircle2, text: 'No credit card', color: '#10B981' },
            { icon: Zap, text: 'Cancel anytime', color: '#FFCF00' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-6 py-4 rounded-xl"
              style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${item.color}40`,
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: `${item.color}80`,
                background: 'rgba(30, 41, 59, 0.5)',
              }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
