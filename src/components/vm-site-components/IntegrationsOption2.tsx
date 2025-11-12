'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// OPTION 2: Enhanced Hover-Reveal Bento Box
// Sophisticated animations, gradients, and visual polish

export function IntegrationsOption2() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const integrations = [
    {
      icon: BarChart3,
      name: 'Grafana',
      tagline: 'Metrics → Fixes',
      color: '#F59E0B',
      colorRgb: '245, 158, 11',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.02))',
      glowGradient: 'radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.4), transparent 60%)',
      features: ['Auto-correlate spikes', 'Link to dashboards'],
      stat: '2.3s to fix',
      emoji: '📊',
    },
    {
      icon: GitCommit,
      name: 'GitHub',
      tagline: 'Deploy → Diagnose',
      color: '#E5E7EB',
      colorRgb: '229, 231, 235',
      gradient: 'linear-gradient(135deg, rgba(229, 231, 235, 0.12), rgba(229, 231, 235, 0.02))',
      glowGradient: 'radial-gradient(circle at 30% 20%, rgba(229, 231, 235, 0.3), transparent 60%)',
      features: ['Link errors to commits', 'One-click rollback'],
      stat: '60s tracking',
      emoji: '🔗',
    },
    {
      icon: MessageCircle,
      name: 'Slack',
      tagline: 'Noise → Action',
      color: '#6266FA',
      colorRgb: '98, 102, 250',
      gradient: 'linear-gradient(135deg, rgba(98, 102, 250, 0.15), rgba(98, 102, 250, 0.02))',
      glowGradient: 'radial-gradient(circle at 30% 20%, rgba(98, 102, 250, 0.4), transparent 60%)',
      features: ['Full context in alert', 'Interactive debugging'],
      stat: 'Instant clarity',
      emoji: '⚡',
    },
  ];

  return (
    <section className="py-24 px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6266FA, transparent)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD11B, transparent)' }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-2 glass px-5 py-2.5 mb-6 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 209, 27, 0.3), transparent)',
              }}
              animate={{ x: [-200, 200] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-[#FFD11B]" />
            </motion.div>
            <span style={{ fontSize: '12px', color: '#FFD11B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Integrations
            </span>
          </motion.div>
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '12px' }}>
            Enhances What You Have
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Vibemonitor AI supercharges your existing workflow
          </p>
        </motion.div>

        {/* Enhanced Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  background: integration.gradient,
                  border: `2px solid ${isHovered ? integration.color : 'rgba(47, 66, 87, 0.4)'}`,
                  boxShadow: isHovered ? `0 20px 60px rgba(${integration.colorRgb}, 0.25), 0 0 0 1px rgba(${integration.colorRgb}, 0.1)` : '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0"
                  style={{ background: integration.glowGradient }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Animated border glow */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: `linear-gradient(135deg, transparent, rgba(${integration.colorRgb}, 0.3), transparent)`,
                      borderRadius: '16px',
                    }}
                  />
                )}

                <div className="p-7 relative z-10">
                  {/* Icon with enhanced animation */}
                  <div className="relative mb-5">
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.15 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300,
                        rotate: { duration: 0.5 }
                      }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                      style={{
                        background: isHovered 
                          ? `linear-gradient(135deg, rgba(${integration.colorRgb}, 0.4), rgba(${integration.colorRgb}, 0.2))`
                          : `rgba(${integration.colorRgb}, 0.15)`,
                        border: `2px solid rgba(${integration.colorRgb}, ${isHovered ? 0.6 : 0.3})`,
                        boxShadow: isHovered ? `0 8px 32px rgba(${integration.colorRgb}, 0.3)` : 'none',
                      }}
                    >
                      {/* Pulse ring on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ 
                            border: `2px solid ${integration.color}`,
                            opacity: 0.6,
                          }}
                          animate={{ scale: [1, 1.3, 1.5], opacity: [0.6, 0.3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      <Icon className="w-8 h-8 relative z-10" style={{ color: integration.color }} />
                    </motion.div>
                    
                    {/* Floating emoji */}
                    <motion.div
                      className="absolute -right-2 -top-2"
                      animate={{
                        y: isHovered ? [0, -8, 0] : 0,
                        rotate: isHovered ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: isHovered ? Infinity : 0,
                        ease: 'easeInOut'
                      }}
                      style={{ fontSize: '24px' }}
                    >
                      {integration.emoji}
                    </motion.div>
                  </div>

                  {/* Name with gradient on hover */}
                  <motion.h3 
                    style={{ 
                      fontSize: '22px', 
                      fontWeight: 700, 
                      marginBottom: '6px',
                      background: isHovered 
                        ? `linear-gradient(135deg, #E5E7EB, ${integration.color})`
                        : '#E5E7EB',
                      WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                      WebkitTextFillColor: isHovered ? 'transparent' : '#E5E7EB',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {integration.name}
                  </motion.h3>
                  
                  <div className="flex items-center gap-2 mb-5">
                    <p style={{ fontSize: '14px', color: integration.color, fontWeight: 600 }}>
                      {integration.tagline}
                    </p>
                    <motion.div
                      animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                      transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: integration.color }} />
                    </motion.div>
                  </div>

                  {/* Features - Enhanced slide in */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isHovered ? 'auto' : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="space-y-3 overflow-hidden mb-5"
                  >
                    {integration.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: isHovered ? 0 : -20,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 200 }}
                        className="flex items-center gap-2.5"
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: integration.color }}
                          animate={{
                            scale: isHovered ? [1, 1.5, 1] : 1,
                          }}
                          transition={{ 
                            delay: 0.2 + i * 0.15,
                            duration: 0.6,
                            repeat: isHovered ? Infinity : 0,
                            repeatDelay: 1
                          }}
                        />
                        <p style={{ fontSize: '13px', color: '#E5E7EB', lineHeight: 1.4 }}>{feature}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Stat Badge - Enhanced */}
                  <motion.div
                    className="pt-4 border-t"
                    style={{ 
                      borderColor: `rgba(${integration.colorRgb}, ${isHovered ? 0.4 : 0.2})`,
                    }}
                    animate={{ 
                      borderColor: isHovered 
                        ? `rgba(${integration.colorRgb}, 0.4)` 
                        : `rgba(${integration.colorRgb}, 0.2)` 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: '10px', color: '#98A3B1', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        Performance
                      </span>
                      <motion.div
                        className="flex items-center gap-1.5"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                      >
                        <Zap 
                          className="w-3.5 h-3.5" 
                          style={{ color: integration.color }}
                        />
                        <span style={{ fontSize: '13px', color: integration.color, fontWeight: 700 }}>
                          {integration.stat}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Particle effects on hover */}
                {isHovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full pointer-events-none"
                        style={{ 
                          background: integration.color,
                          left: `${20 + i * 30}%`,
                          top: '20%',
                        }}
                        animate={{
                          y: [0, -100],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Visual Flow Below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="glass p-8 inline-flex items-center gap-6 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(98, 102, 250, 0.5), transparent)',
              }}
              animate={{ x: [-300, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center gap-4 relative z-10">
              <div className="flex -space-x-3">
                {integrations.map((integration, i) => {
                  const Icon = integration.icon;
                  return (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#0F1828]"
                      style={{ 
                        background: integration.color,
                        boxShadow: `0 4px 12px rgba(${integration.colorRgb}, 0.4)`
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        zIndex: 10,
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: i === 1 ? '#0F1828' : 'white' }} />
                    </motion.div>
                  );
                })}
              </div>
              <motion.span 
                style={{ fontSize: '24px', color: '#FFD11B' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                +
              </motion.span>
              <motion.div 
                className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #6266FA, #FFD11B)',
                  boxShadow: '0 8px 24px rgba(98, 102, 250, 0.4)',
                }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#6266FA]"
                  animate={{ 
                    scale: [1, 1.4, 1.6],
                    opacity: [0.6, 0.2, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            
            <motion.span 
              style={{ fontSize: '24px', color: '#FFD11B', fontWeight: 700 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              =
            </motion.span>
            
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 209, 27, 0.3)',
                    '0 0 40px rgba(255, 209, 27, 0.6)',
                    '0 0 20px rgba(255, 209, 27, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-lg bg-[#FFD11B] flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-[#0F1828]" />
              </motion.div>
              <div>
                <p style={{ fontSize: '12px', color: '#98A3B1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Result
                </p>
                <p style={{ fontSize: '18px', color: '#E5E7EB', fontWeight: 700, lineHeight: 1.2 }}>
                  60-second fixes
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
