'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, ArrowRight, X, CheckCircle2 } from 'lucide-react';

// OPTION 3: Horizontal Before/After Timeline
// Shows transformation journey left to right
// Most visual storytelling, clear before/after

export function IntegrationsOption3() {
  const transformations = [
    {
      icon: BarChart3,
      name: 'Grafana',
      color: '#F59E0B',
      before: {
        icon: '📊',
        label: 'Graph spike',
        problem: 'What caused this?',
      },
      after: {
        icon: '✅',
        label: 'payment.js:234',
        solution: 'Fix: api.retry()',
      },
    },
    {
      icon: GitCommit,
      name: 'GitHub',
      color: '#E5E7EB',
      before: {
        icon: '🚀',
        label: 'Deploy a3f2e1',
        problem: 'What broke?',
      },
      after: {
        icon: '🔗',
        label: 'Linked commit',
        solution: 'Rollback ready',
      },
    },
    {
      icon: MessageCircle,
      name: 'Slack',
      color: '#6266FA',
      before: {
        icon: '🚨',
        label: '500 Error',
        problem: 'Check logs...',
      },
      after: {
        icon: '⚡',
        label: 'Full context',
        solution: 'Action ready',
      },
    },
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '12px' }}>
            Before & After Vibemonitor
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            See how AI transforms your existing tools
          </p>
        </motion.div>

        <div className="space-y-12">
          {transformations.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Tool Name Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${item.color}20`,
                      border: `2px solid ${item.color}40`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#E5E7EB' }}>
                    {item.name}
                  </h3>
                </div>

                {/* Timeline: Before → Transform → After */}
                <div className="grid grid-cols-[1fr,auto,1fr] gap-6 items-center">
                  {/* BEFORE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="rounded-xl p-6 relative"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '2px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <div className="absolute -top-3 left-4 px-3 py-1 rounded-full" style={{ background: '#0F1828', border: '1px solid #EF4444' }}>
                      <p style={{ fontSize: '10px', color: '#EF4444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Before
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '32px' }}>{item.before.icon}</span>
                      <div className="flex-1">
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#E5E7EB', marginBottom: '2px' }}>
                          {item.before.label}
                        </p>
                        <div className="flex items-center gap-2">
                          <X className="w-3 h-3 text-[#EF4444]" />
                          <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                            {item.before.problem}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* TRANSFORM ARROW */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4, type: 'spring' }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #6266FA, #FFD11B)',
                      }}
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <p style={{ fontSize: '10px', color: '#FFD11B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                      AI Fix
                    </p>
                  </motion.div>

                  {/* AFTER */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                    className="rounded-xl p-6 relative"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '2px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <div className="absolute -top-3 left-4 px-3 py-1 rounded-full" style={{ background: '#0F1828', border: '1px solid #10B981' }}>
                      <p style={{ fontSize: '10px', color: '#10B981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        After
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '32px' }}>{item.after.icon}</span>
                      <div className="flex-1">
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#E5E7EB', marginBottom: '2px' }}>
                          {item.after.label}
                        </p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <p style={{ fontSize: '13px', color: '#10B981' }}>
                            {item.after.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Result Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block rounded-2xl px-8 py-4"
            style={{
              background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.2), rgba(255, 209, 27, 0.2))',
              border: '2px solid rgba(98, 102, 250, 0.4)',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                <GitCommit className="w-5 h-5 text-[#E5E7EB]" />
                <MessageCircle className="w-5 h-5 text-[#6266FA]" />
              </div>
              <span style={{ fontSize: '20px', color: '#FFD11B' }}>+</span>
              <span style={{ fontSize: '16px', color: '#6266FA', fontWeight: 600 }}>Vibemonitor AI</span>
              <span style={{ fontSize: '20px', color: '#FFD11B' }}>=</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span style={{ fontSize: '16px', color: '#E5E7EB', fontWeight: 700 }}>
                  60-second fixes
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
