'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function IntegrationOrbsSection() {
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);

  const orbs = [
    {
      name: 'Grafana',
      color: '#F59E0B',
      preview: (
        <div className="text-center">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-sm bg-[#F59E0B]" style={{ opacity: Math.random() }} />
            ))}
          </div>
          <p style={{ fontSize: '8px', color: '#E5E7EB' }}>Dashboard sync</p>
        </div>
      ),
    },
    {
      name: 'GitHub',
      color: '#E5E7EB',
      preview: (
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
            <div className="w-0.5 h-6 bg-[#E5E7EB]" />
          </div>
          <p style={{ fontSize: '8px', color: '#E5E7EB' }}>Commit tracking</p>
        </div>
      ),
    },
    {
      name: 'Slack',
      color: '#6266FA',
      preview: (
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-2"
          >
            <div className="w-3 h-0.5 rounded bg-[#6266FA] mb-1" />
            <div className="w-4 h-0.5 rounded bg-[#6266FA]" />
          </motion.div>
          <p style={{ fontSize: '8px', color: '#E5E7EB' }}>Real-time alerts</p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB' }}>
            Your Stack. <span style={{ color: '#6266FA' }}>Enhanced.</span>
          </h2>
        </motion.div>

        {/* Orbs */}
        <div className="flex items-center justify-center gap-20 flex-wrap">
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              onHoverStart={() => setHoveredOrb(i)}
              onHoverEnd={() => setHoveredOrb(null)}
              className="relative"
            >
              {/* Orb */}
              <motion.div
                className="glass relative overflow-hidden cursor-pointer"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: `2px solid ${orb.color}40`,
                  boxShadow: `0 0 40px ${orb.color}30`,
                }}
                animate={{
                  rotate: hoveredOrb === i ? 360 : 0,
                }}
                transition={{ duration: 2 }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Rotating Background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${orb.color}40, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <motion.div
                    className="mb-4"
                    animate={{
                      y: hoveredOrb === i ? [0, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: `${orb.color}20`,
                        border: `2px solid ${orb.color}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '24px',
                          fontWeight: 700,
                          color: orb.color,
                        }}
                      >
                        {orb.name[0]}
                      </span>
                    </div>
                  </motion.div>

                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#E5E7EB', marginBottom: '8px' }}>
                    {orb.name}
                  </p>

                  {/* Preview on Hover */}
                  <AnimatePresence>
                    {hoveredOrb === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(15, 24, 40, 0.95)',
                          borderRadius: '50%',
                        }}
                      >
                        {orb.preview}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Label */}
              <motion.p
                className="text-center mt-4"
                style={{ fontSize: '14px', color: '#98A3B1' }}
                animate={{
                  color: hoveredOrb === i ? orb.color : '#98A3B1',
                }}
              >
                Seamless integration
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
