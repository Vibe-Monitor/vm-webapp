'use client';

import { motion } from 'motion/react';

export function IntegrationsSection() {
  const integrations = [
    {
      name: 'Grafana',
      label: 'Dashboard sync',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="26" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <path d="M28 14 L28 42 M14 28 L42 28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      label: 'Commit tracking',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="26" stroke="#E5E7EB" strokeWidth="2" fill="none" />
          <circle cx="28" cy="23" r="7" fill="#E5E7EB" />
          <circle cx="16" cy="37" r="5" fill="#E5E7EB" />
          <circle cx="40" cy="37" r="5" fill="#E5E7EB" />
        </svg>
      ),
    },
    {
      name: 'Slack',
      label: 'Team alerts',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="21" y="14" width="5" height="14" rx="2.5" fill="#FF6B35" />
          <rect x="30" y="14" width="5" height="14" rx="2.5" fill="#FF6B35" />
          <rect x="14" y="21" width="14" height="5" rx="2.5" fill="#FF6B35" />
          <rect x="14" y="30" width="14" height="5" rx="2.5" fill="#FF6B35" />
          <rect x="28" y="28" width="14" height="5" rx="2.5" fill="#FF6B35" />
          <rect x="28" y="37" width="14" height="5" rx="2.5" fill="#FF6B35" />
          <rect x="30" y="28" width="5" height="14" rx="2.5" fill="#FF6B35" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <h2 style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
            Built for your stack
          </h2>
          <p style={{ fontSize: '18px', color: '#9CA3AF' }}>
            Works seamlessly with tools you already use
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-20">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-8"
              >
                {integration.icon}
              </motion.div>
              <h3 style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '20px', marginBottom: '8px' }}>
                {integration.name}
              </h3>
              <p style={{ fontSize: '15px', color: '#9CA3AF' }}>
                {integration.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
