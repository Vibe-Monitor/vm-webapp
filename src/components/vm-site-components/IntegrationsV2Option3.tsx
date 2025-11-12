'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, Zap } from 'lucide-react';

// OPTION 3: Horizontal Flow
// Shows integration as a visual workflow

export function IntegrationsV2Option3() {
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
            Connects to your stack
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Works seamlessly with the tools you already use
          </p>
        </motion.div>

        {/* Visual Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8"
        >
          <div className="grid grid-cols-[1fr,auto,1fr,auto,1fr] gap-6 items-center">
            {/* Grafana */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)' }}
              >
                <BarChart3 className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB', marginBottom: '4px' }}>
                Grafana
              </p>
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                Metrics
              </p>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-0.5 bg-[#2F4257]" />
              <p style={{ fontSize: '10px', color: '#6266FA', marginTop: '4px', fontWeight: 600 }}>
                connects
              </p>
            </div>

            {/* Vibemonitor */}
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6266FA, #FFD11B)', boxShadow: '0 8px 24px rgba(98, 102, 250, 0.3)' }}
              >
                <Zap className="w-10 h-10 text-white" />
              </div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#E5E7EB', marginBottom: '4px' }}>
                Vibemonitor
              </p>
              <p style={{ fontSize: '12px', color: '#FFD11B' }}>
                AI Analysis
              </p>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-0.5 bg-[#2F4257]" />
              <p style={{ fontSize: '10px', color: '#6266FA', marginTop: '4px', fontWeight: 600 }}>
                alerts
              </p>
            </div>

            {/* Slack */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(98, 102, 250, 0.1)', border: '2px solid rgba(98, 102, 250, 0.3)' }}
              >
                <MessageCircle className="w-8 h-8 text-[#6266FA]" />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB', marginBottom: '4px' }}>
                Slack
              </p>
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                Team
              </p>
            </div>
          </div>

          {/* Bottom labels */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#2F4257]">
            <div className="text-center">
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                Detects anomalies
              </p>
            </div>
            <div className="text-center">
              <p style={{ fontSize: '12px', color: '#FFD11B', fontWeight: 600 }}>
                Finds fix in 2.3s
              </p>
            </div>
            <div className="text-center">
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                Delivers solution
              </p>
            </div>
          </div>
        </motion.div>

        {/* GitHub callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 glass p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(229, 231, 235, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)' }}
            >
              <GitCommit className="w-5 h-5 text-[#E5E7EB]" />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                GitHub Integration
              </p>
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                Auto-links errors to commits
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
            One-click rollback
          </p>
        </motion.div>
      </div>
    </section>
  );
}
