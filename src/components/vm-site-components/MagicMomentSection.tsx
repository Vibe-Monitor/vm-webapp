'use client';

import { motion } from 'motion/react';
import { GitCommit, Zap, CheckCircle } from 'lucide-react';

export function MagicMomentSection() {
  const panels = [
    {
      time: '2:45 PM',
      title: 'Deploy goes live',
      icon: GitCommit,
      color: '#9CA3AF',
    },
    {
      time: '2:46 PM',
      title: 'Error detected',
      subtitle: '60 seconds from deploy to alert',
      icon: Zap,
      color: '#FFB800',
      highlight: true,
    },
    {
      time: '2:50 PM',
      title: 'Fixed',
      subtitle: '5 minutes total vs 3 hours without',
      icon: CheckCircle,
      color: '#10B981',
    },
  ];

  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <h2 style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
            The Magic Moment
          </h2>
          <p style={{ fontSize: '20px', color: '#9CA3AF' }}>
            Watch how errors go from detection to fix in real-time
          </p>
        </motion.div>

        {/* 3-Panel Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 px-32">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #9CA3AF 0%, #FFB800 50%, #10B981 100%)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-16 relative">
            {/* Panels */}
            {panels.map((panel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="relative"
              >
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 backdrop-blur-sm"
                    style={{
                      backgroundColor: `${panel.color}15`,
                      border: `2px solid ${panel.color}`,
                      boxShadow: `0 0 30px ${panel.color}30`,
                    }}
                  >
                    <panel.icon className="w-10 h-10" style={{ color: panel.color }} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    {panel.time}
                  </p>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: panel.highlight ? '#FFB800' : '#FFFFFF',
                      marginBottom: '12px',
                      fontSize: '22px',
                    }}
                  >
                    {panel.title}
                  </h3>
                  {panel.subtitle && (
                    <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: 1.6 }}>
                      {panel.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
