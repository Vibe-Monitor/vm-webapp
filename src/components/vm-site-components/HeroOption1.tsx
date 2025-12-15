'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap, Clock, Shield } from 'lucide-react';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';
import { useRouter } from 'next/navigation';

export function HeroOption1() {
  const router = useRouter();

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    trackInteraction('hero_cta_clicked', {
      button_text: 'Try for free',
      destination: '/auth'
    });

    posthog.capture('hero_try_free_button_clicked', {
      button_text: 'Try for free',
      page_section: 'hero',
      destination: '/auth'
    });

    posthog.capture('auth_signup_started', {
      entry_point: 'hero_cta',
      button_text: 'Try for free'
    });

    posthog.capture('funnel_stage', {
      stage: 'conversion',
      stage_number: 4,
      description: 'User clicked hero try free button'
    });

    setTimeout(() => {
      router.push('/auth');
    }, 150);
  };

  return (
    <section
      data-section-name="hero" 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0C1829 0%, #1a1f35 100%)',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(98, 102, 250, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 102, 250, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          opacity: 0.4
        }}
      />

      {/* Radial Gradient Overlays */}
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '1000px',
          height: '1000px',
          left: '-20%',
          top: '-20%',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          width: '800px',
          height: '800px',
          right: '-15%',
          bottom: '-20%',
          background: 'radial-gradient(circle, rgba(163, 139, 244, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Floating Code Snippets */}
      {[
        { code: 'error.catch()', top: '15%', left: '10%', delay: 0 },
        { code: 'api.retry()', top: '25%', right: '15%', delay: 1 },
        { code: '500: Server Error', bottom: '20%', left: '12%', delay: 2 },
        { code: 'Slack alert', top: '70%', right: '30%', delay: 1.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            y: [0, -10, 0] 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          style={{
            ...item,
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#6266FA',
            background: 'rgba(98, 102, 250, 0.1)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid rgba(98, 102, 250, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {item.code}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.15), rgba(163, 139, 244, 0.15))',
              border: '1px solid rgba(98, 102, 250, 0.3)',
            }}
          >
            <Zap className="w-4 h-4" style={{ color: '#FFD11B' }} />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #FFD11B, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Ship fearlessly. Find root causes in minutes, not hours.
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
          style={{
            maxWidth: '1100px',
            fontWeight: 700,
            fontSize: 'clamp(40px, 7vw, 84px)',
            lineHeight: '1.1',
            letterSpacing: '-0.03em'
          }}
        >
          <span style={{ color: '#E5E7EB' }}>Debug Faster,</span>
          <br />
          <span 
            style={{
              background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 50%, #A38BF4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sleep Better
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
          style={{
            maxWidth: '700px',
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: '1.6',
            color: '#95A3B2',
            fontWeight: 400
          }}
        >
          An AI Agent that investigates your code, logs, and metrics and explains the root cause with clear fixes — right in Slack.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <motion.a
            href="/auth"
            onClick={handleCTAClick}
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
              boxShadow: '0 8px 32px rgba(255, 207, 0, 0.3)',
              textDecoration: 'none',
              display: 'inline-block'
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
              Try for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <motion.div 
            className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: 'rgba(98, 102, 250, 0.08)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
            }}
          >
            <Clock className="w-5 h-5" style={{ color: '#6266FA' }} />
            <div className="text-left">
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#E5E7EB' }}>
                &lt; 10 min
              </div>
              <div style={{ fontSize: '12px', color: '#95A3B2' }}>
                Setup time
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: 'rgba(255, 207, 0, 0.08)',
              border: '1px solid rgba(255, 207, 0, 0.2)',
            }}
          >
            <Shield className="w-5 h-5" style={{ color: '#FFCF00' }} />
            <div className="text-left">
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#E5E7EB' }}>
                No credit card
              </div>
              <div style={{ fontSize: '12px', color: '#95A3B2' }}>
                Start free trial
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <motion.div 
              className="w-2.5 h-2.5 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
              style={{ background: '#10B981' }}
            />
            <div className="text-left">
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#E5E7EB' }}>
                147 errors
              </div>
              <div style={{ fontSize: '12px', color: '#95A3B2' }}>
                Analyzed today
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
