'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle } from 'lucide-react';

// OPTION 5: Large Screenshot Style
// Focuses on realistic product mockups

export function IntegrationsV2Option5() {
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
            Plugs into your workflow
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Works with the tools you already use every day
          </p>
        </motion.div>

        {/* Main integration showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 mb-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#2F4257]">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(98, 102, 250, 0.15)', border: '1px solid rgba(98, 102, 250, 0.3)' }}
              >
                <MessageCircle className="w-6 h-6 text-[#6266FA]" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#E5E7EB' }}>
                  Slack
                </h3>
                <p style={{ fontSize: '13px', color: '#6266FA' }}>
                  Primary integration
                </p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>
                Active
              </p>
            </div>
          </div>

          {/* Mock Slack Message */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-[#6266FA] flex items-center justify-center flex-shrink-0">
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>VM</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                    Vibemonitor
                  </p>
                  <span style={{ fontSize: '11px', color: '#98A3B1' }}>
                    2:34 PM
                  </span>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ background: 'rgba(98, 102, 250, 0.05)', border: '1px solid rgba(98, 102, 250, 0.2)' }}
                >
                  <p style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600, marginBottom: '8px' }}>
                    🚨 Production Error Detected
                  </p>
                  <p style={{ fontSize: '13px', color: '#E5E7EB', marginBottom: '8px', fontFamily: 'monospace' }}>
                    payment.js:234
                  </p>
                  <p style={{ fontSize: '13px', color: '#98A3B1', marginBottom: '12px' }}>
                    Null pointer exception in payment processing
                  </p>
                  <div className="flex items-center gap-2 mb-8">
                    <span style={{ fontSize: '11px', color: '#98A3B1' }}>Affected users:</span>
                    <span style={{ fontSize: '11px', color: '#E5E7EB', fontWeight: 600 }}>12</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#10B981', fontWeight: 600, marginBottom: '6px' }}>
                    ✅ Fix identified
                  </p>
                  <div
                    className="p-3 rounded font-mono"
                    style={{ background: 'rgba(15, 24, 40, 0.8)', fontSize: '12px', color: '#10B981' }}
                  >
                    Add null check: if (user?.paymentMethod)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary integrations */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
              >
                <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#E5E7EB' }}>
                  Grafana
                </h4>
                <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                  Metrics correlation
                </p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#98A3B1' }}>
              Links error spikes to exact code locations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(229, 231, 235, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)' }}
              >
                <GitCommit className="w-5 h-5 text-[#E5E7EB]" />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#E5E7EB' }}>
                  GitHub
                </h4>
                <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                  Deployment tracking
                </p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#98A3B1' }}>
              Auto-links errors to commits for instant rollback
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
