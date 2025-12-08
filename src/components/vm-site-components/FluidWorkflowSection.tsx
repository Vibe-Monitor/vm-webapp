'use client';

import { motion } from 'motion/react';
import { GitCommit, Zap, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

export function FluidWorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: 'Deploy at 2:45 PM',
      icon: GitCommit,
      color: '#98A3B1',
      skew: -2,
      visual: (
        <div className="space-y-2">
          <motion.div
            className="flex items-center gap-2 text-[#10B981]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ fontSize: '13px', fontFamily: 'monospace' }}>$ git push origin main</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 rounded-full bg-gradient-to-r from-[#6266FA] to-[#FFD11B]"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ fontSize: '12px', color: '#98A3B1', fontFamily: 'monospace' }}
          >
            ✓ Deployed successfully
          </motion.p>
        </div>
      ),
    },
    {
      title: 'Alert at 2:46 PM',
      icon: Zap,
      color: '#FFD11B',
      skew: 0,
      scale: 1.05,
      highlight: true,
      visual: (
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-[#6266FA] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
              VM
            </div>
            <span style={{ fontSize: '12px', color: '#E5E7EB', fontWeight: 600 }}>Vibemonitor</span>
          </div>
          <p style={{ fontSize: '11px', color: '#E5E7EB', marginBottom: '6px' }}>@channel</p>
          <p style={{ fontSize: '13px', color: '#FFD11B', fontWeight: 700, marginBottom: '4px' }}>
            HIGH: payment.js:234
          </p>
          <p style={{ fontSize: '10px', color: '#98A3B1', marginBottom: '8px' }}>
            Checkout down • Fix: Update API call
          </p>
          <div className="text-[10px] text-[#98A3B1] pt-2 border-t border-[#2F4257]">
            60 seconds from deploy to alert
          </div>
        </div>
      ),
    },
    {
      title: 'Fixed at 2:50 PM',
      icon: CheckCircle2,
      color: '#10B981',
      skew: 2,
      visual: (
        <div className="space-y-2">
          {/* Metrics Graph */}
          <div className="flex items-end gap-1 h-20">
            {[40, 60, 80, 95, 50, 20, 10, 5].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  background: i < 4 ? '#EF4444' : '#10B981',
                  height: `${height}%`,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#10B981', textAlign: 'center' }}>
            ✓ 5 minutes total resolution
          </p>
        </div>
      ),
    },
  ];

  return (
    <section ref={containerRef} className="py-32 px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '16px' }}>
            The 60-Second Journey
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            From deploy to fix in three seamless steps
          </p>
        </motion.div>

        {/* Floating Glass Cards */}
        <div className="grid lg:grid-cols-3 gap-16 relative">
          {/* Particle Trail */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block">
            <motion.path
              d="M 300 100 Q 500 200, 700 100 T 1100 100"
              stroke="#FFD11B"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>

          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              style={{
                transform: `skewY(${card.skew}deg) scale(${card.scale || 1})`,
              }}
              className="relative"
            >
              <div
                className="glass p-8 h-full"
                style={{
                  boxShadow: card.highlight ? 'var(--glow-highlight)' : 'var(--card-shadow)',
                  border: card.highlight ? '2px solid rgba(255, 209, 27, 0.3)' : undefined,
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                  style={{
                    background: `${card.color}20`,
                    border: `2px solid ${card.color}40`,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <card.icon className="w-8 h-8" style={{ color: card.color }} />
                </motion.div>

                {/* Title */}
                <h3
                  className="mb-6"
                  style={{
                    fontWeight: 700,
                    color: card.highlight ? '#FFD11B' : '#E5E7EB',
                    fontSize: '20px',
                  }}
                >
                  {card.title}
                </h3>

                {/* Visual */}
                <div>{card.visual}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
