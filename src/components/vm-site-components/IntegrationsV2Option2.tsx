'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, ArrowRight } from 'lucide-react';

// OPTION 2: Before/After Split
// Shows clear transformation with side-by-side comparison

export function IntegrationsV2Option2() {
  const integrations = [
    {
      icon: BarChart3,
      name: 'Grafana',
      color: '#F59E0B',
      before: { text: 'Error spike detected', type: 'Problem' },
      after: { text: 'payment.js:234 + fix', type: 'Solution' },
    },
    {
      icon: GitCommit,
      name: 'GitHub',
      color: '#E5E7EB',
      before: { text: 'Deploy broke prod', type: 'Problem' },
      after: { text: 'Linked to commit a3f2', type: 'Solution' },
    },
    {
      icon: MessageCircle,
      name: 'Slack',
      color: '#6266FA',
      before: { text: '500 error alert', type: 'Problem' },
      after: { text: 'Full context + action', type: 'Solution' },
    },
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '12px' }}>
            Before vs After Vibemonitor
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            See how we enhance your existing tools
          </p>
        </motion.div>

        <div className="space-y-6">
          {integrations.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#E5E7EB' }}>
                    {item.name}
                  </h3>
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                  {/* Before */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    <p style={{ fontSize: '11px', color: '#EF4444', marginBottom: '4px', fontWeight: 600 }}>
                      BEFORE
                    </p>
                    <p style={{ fontSize: '14px', color: '#E5E7EB' }}>
                      {item.before.text}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-[#6266FA]" />

                  {/* After */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                  >
                    <p style={{ fontSize: '11px', color: '#10B981', marginBottom: '4px', fontWeight: 600 }}>
                      AFTER
                    </p>
                    <p style={{ fontSize: '14px', color: '#E5E7EB' }}>
                      {item.after.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
