'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, CheckCircle } from 'lucide-react';

// OPTION 4: Feature List Grid
// Compact, scannable list format

export function IntegrationsV2Option4() {
  const integrations = [
    {
      icon: BarChart3,
      name: 'Grafana',
      color: '#F59E0B',
      features: [
        'Auto-correlate error spikes with code',
        'Jump from alert to exact dashboard',
      ],
    },
    {
      icon: GitCommit,
      name: 'GitHub',
      color: '#E5E7EB',
      features: [
        'Link errors to deployment commits',
        'One-click rollback from alerts',
      ],
    },
    {
      icon: MessageCircle,
      name: 'Slack',
      color: '#6266FA',
      features: [
        'Full error context in every message',
        'Ask follow-up questions inline',
      ],
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
            Integrations that actually help
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Not just monitoring—actionable intelligence
          </p>
        </motion.div>

        <div className="space-y-4">
          {integrations.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#E5E7EB', marginBottom: '12px' }}>
                        {item.name}
                      </h3>
                      
                      <div className="space-y-2">
                        {item.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                            <p style={{ fontSize: '14px', color: '#98A3B1' }}>
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center glass p-4"
        >
          <p style={{ fontSize: '14px', color: '#98A3B1' }}>
            Also works with: Sentry • Datadog • PagerDuty • Linear • Jira
          </p>
        </motion.div>
      </div>
    </section>
  );
}
