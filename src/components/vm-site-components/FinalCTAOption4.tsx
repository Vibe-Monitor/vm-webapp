'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';
import { useRouter } from 'next/navigation';

// OPTION 4: 3D Floating Island with Parallax
// Card floats in space with depth and perspective

// Generate stars once outside component to ensure consistent positions between server and client
const generateStars = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: ((i * 37) % 100), // Pseudo-random but deterministic
    top: ((i * 73) % 100),  // Pseudo-random but deterministic
    duration: 2 + ((i * 17) % 30) / 10,
    delay: ((i * 23) % 20) / 10,
  }));
};

const STARS = generateStars();

export function FinalCTAOption4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    trackInteraction('final_cta_clicked', {
      button_text: 'Claim your free account',
      destination: '/auth'
    });

    posthog.capture('final_claim_free_account_button_clicked', {
      button_text: 'Claim your free account',
      page_section: 'final_cta',
      destination: '/auth'
    });

    posthog.capture('auth_signup_started', {
      entry_point: 'final_cta',
      button_text: 'Claim your free account'
    });

    posthog.capture('funnel_stage', {
      stage: 'conversion',
      stage_number: 4,
      description: 'User clicked final claim free account button'
    });

    setTimeout(() => {
      router.push('/auth');
    }, 150);
  };

  return (
    <section
      data-section-name="final-cta"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-8"
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #0F1828 0%, #050A14 100%)' }} />

      {/* Floating Stars */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Large Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(98, 102, 250, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main Floating Card */}
      <motion.div
        style={{ 
          y,
          rotateX,
          perspective: 1000,
        }}
        className="relative z-10 max-w-5xl w-full"
      >
        {/* 3D Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glow Behind Card */}
          <div 
            className="absolute inset-0 rounded-3xl blur-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.4) 0%, rgba(255, 207, 0, 0.4) 100%)',
              transform: 'scale(1.05)',
            }}
          />

          {/* Main Card */}
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 24, 40, 0.9) 100%)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(98, 102, 250, 0.3)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(98, 102, 250, 0.2)',
            }}
          >
            {/* Gradient Top Bar */}
            <div 
              className="h-2"
              style={{
                background: 'linear-gradient(90deg, #6266FA 0%, #FFCF00 50%, #10B981 100%)',
              }}
            />

            <div className="p-12 lg:p-16">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 207, 0, 0.2), rgba(98, 102, 250, 0.2))',
                    border: '1px solid rgba(255, 207, 0, 0.4)',
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#FFCF00]" />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFCF00', letterSpacing: '0.5px' }}>
                    LIMITED BETA ACCESS
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6"
                style={{ 
                  fontWeight: 700, 
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                  color: '#E5E7EB',
                }}
              >
                Stop firefighting.{' '}
                <span 
                  style={{
                    background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Start fixing.
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center mb-12"
                style={{ 
                  fontSize: '20px', 
                  color: '#95A3B2',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 48px auto'
                }}
              >
                Join the engineering teams who've eliminated error panic. Forever.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  { icon: Clock, value: '<60s', label: 'Root cause time', color: '#FFCF00' },
                  { icon: CheckCircle2, value: '<10 min', label: 'Setup time', color: '#10B981' },
                  { icon: Sparkles, value: 'Limited', label: 'Beta access', color: '#6266FA' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative p-6 rounded-2xl overflow-hidden text-center"
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: `1px solid ${stat.color}30`,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: `${stat.color}60`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at center, ${stat.color}20 0%, transparent 70%)`,
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex justify-center mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${stat.color}20`,
                            border: `1px solid ${stat.color}40`,
                          }}
                        >
                          <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                      </div>
                      <p style={{ fontSize: '36px', fontWeight: 700, color: stat.color, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                        {stat.value}
                      </p>
                      <p style={{ fontSize: '14px', color: '#95A3B2' }}>
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <motion.a
                  href="/auth"
                  onClick={handleCTAClick}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 60px rgba(255, 207, 0, 0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden mb-6"
                  style={{
                    padding: '24px 64px',
                    background: 'linear-gradient(135deg, #FFCF00 0%, #FFB800 100%)',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 12px 48px rgba(255, 207, 0, 0.4)',
                    textDecoration: 'none',
                    display: 'inline-block'
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
                    Claim your free account
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.a>

                <p style={{ fontSize: '14px', color: '#95A3B2' }}>
                  No credit card  •  2-minute setup  •  Cancel anytime
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements Around Card */}
        {[
          { icon: '✓', label: 'Data Security', position: { top: '10%', left: '-10%' }, delay: 0.8 },
          { icon: '⚡', label: 'Minutes to Debug', position: { top: '20%', right: '-10%' }, delay: 1 },
          { icon: '🔒', label: 'Enterprise ready', position: { bottom: '10%', left: '-10%' }, delay: 1.2 },
          { icon: '🚀', label: 'Ship faster', position: { bottom: '10%', right: '-10%' }, delay: 1.4 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, type: 'spring' }}
            className="absolute hidden lg:block"
            style={{
              ...item.position,
            }}
          >
            <motion.div
              className="px-4 py-3 rounded-xl flex items-center gap-2"
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(98, 102, 250, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#E5E7EB', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
