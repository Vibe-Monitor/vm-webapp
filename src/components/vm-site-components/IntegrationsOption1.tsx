'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

// OPTION 1: Icon-Driven Compact Grid
// Large icons, minimal text, visual arrows showing enhancement flow

export function IntegrationsOption1() {
  const integrations = [
    {
      icon: BarChart3,
      name: 'Grafana',
      color: '#F59E0B',
      before: 'Graph spike',
      after: 'Exact fix',
      time: '2.3s',
      visual: (
        <svg width="100%" height="120" viewBox="0 0 200 120" fill="none">
          {/* Simple graph with spike */}
          <motion.path
            d="M 20 80 L 40 75 L 60 70 L 80 30 L 100 35 L 120 40 L 140 45 L 160 50 L 180 55"
            stroke="#EF4444"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.circle
            cx="80"
            cy="30"
            r="6"
            fill="#EF4444"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }}
          />
          {/* Arrow down to fix */}
          <motion.path
            d="M 80 45 L 80 75"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
          <motion.path
            d="M 80 75 L 75 70 M 80 75 L 85 70"
            stroke="#10B981"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
          <motion.rect
            x="60"
            y="85"
            width="40"
            height="20"
            rx="4"
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#10B981"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, type: 'spring' }}
          />
          <text x="100" y="99" fill="#10B981" fontSize="10" textAnchor="middle" fontWeight="600">FIX</text>
        </svg>
      ),
    },
    {
      icon: GitCommit,
      name: 'GitHub',
      color: '#E5E7EB',
      before: 'Deploy',
      after: 'Auto-link',
      time: '60s',
      visual: (
        <svg width="100%" height="120" viewBox="0 0 200 120" fill="none">
          {/* Commit circle */}
          <motion.circle
            cx="50"
            cy="60"
            r="20"
            stroke="#E5E7EB"
            strokeWidth="3"
            fill="rgba(229, 231, 235, 0.1)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          />
          <text x="50" y="65" fill="#E5E7EB" fontSize="12" textAnchor="middle" fontWeight="600">C</text>
          
          {/* Link arrow */}
          <motion.path
            d="M 75 60 L 125 60"
            stroke="#6266FA"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.path
            d="M 125 60 L 120 55 M 125 60 L 120 65"
            stroke="#6266FA"
            strokeWidth="3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          />
          
          {/* Error linked */}
          <motion.circle
            cx="150"
            cy="60"
            r="20"
            stroke="#EF4444"
            strokeWidth="3"
            fill="rgba(239, 68, 68, 0.1)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: 'spring' }}
          />
          <text x="150" y="65" fill="#EF4444" fontSize="18" textAnchor="middle" fontWeight="600">!</text>
          
          {/* Link icon */}
          <motion.text
            x="100"
            y="50"
            fill="#6266FA"
            fontSize="16"
            textAnchor="middle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 }}
          >
            🔗
          </motion.text>
        </svg>
      ),
    },
    {
      icon: MessageCircle,
      name: 'Slack',
      color: '#6266FA',
      before: 'Noise',
      after: 'Action',
      time: 'Instant',
      visual: (
        <svg width="100%" height="120" viewBox="0 0 200 120" fill="none">
          {/* Before - Small vague box */}
          <motion.rect
            x="20"
            y="40"
            width="50"
            height="40"
            rx="6"
            stroke="#EF4444"
            strokeWidth="2"
            fill="rgba(239, 68, 68, 0.1)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
          <text x="45" y="55" fill="#EF4444" fontSize="18" textAnchor="middle">🚨</text>
          <text x="45" y="70" fill="#98A3B1" fontSize="8" textAnchor="middle">Error</text>
          
          {/* Transform arrow */}
          <motion.path
            d="M 80 60 L 110 60"
            stroke="#FFD11B"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          <motion.path
            d="M 110 60 L 105 55 M 110 60 L 105 65"
            stroke="#FFD11B"
            strokeWidth="3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
          <motion.text
            x="95"
            y="50"
            fill="#FFD11B"
            fontSize="12"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            AI
          </motion.text>
          
          {/* After - Detailed box */}
          <motion.rect
            x="120"
            y="30"
            width="60"
            height="60"
            rx="6"
            stroke="#10B981"
            strokeWidth="2"
            fill="rgba(16, 185, 129, 0.1)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, type: 'spring' }}
          />
          <text x="150" y="48" fill="#E5E7EB" fontSize="7" textAnchor="middle">payment.js:234</text>
          <text x="150" y="60" fill="#10B981" fontSize="8" textAnchor="middle" fontWeight="600">✓ Fix ready</text>
          <text x="150" y="72" fill="#FFD11B" fontSize="7" textAnchor="middle">⚡ 2.3s</text>
        </svg>
      ),
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
            Your Stack. <span style={{ color: '#6266FA' }}>Supercharged.</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            AI-powered enhancements for tools you already use
          </p>
        </motion.div>

        {/* Compact Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass p-6 hover:border-opacity-80 transition-all"
                style={{
                  borderColor: integration.color,
                  borderWidth: '1px',
                }}
                whileHover={{ y: -4 }}
              >
                {/* Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${integration.color}20`,
                      border: `2px solid ${integration.color}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: integration.color }} />
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: '11px', color: integration.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {integration.time}
                    </p>
                  </div>
                </div>

                {/* Visual */}
                <div className="mb-6">
                  {integration.visual}
                </div>

                {/* Before/After */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div
                      className="rounded-lg py-2 mb-2"
                      style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    >
                      <p style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>Before</p>
                    </div>
                    <p style={{ fontSize: '13px', color: '#98A3B1' }}>{integration.before}</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="rounded-lg py-2 mb-2"
                      style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    >
                      <p style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>After</p>
                    </div>
                    <p style={{ fontSize: '13px', color: '#E5E7EB', fontWeight: 600 }}>{integration.after}</p>
                  </div>
                </div>

                {/* Name */}
                <div className="mt-5 pt-5 border-t border-[#2F4257]">
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#E5E7EB', textAlign: 'center' }}>
                    {integration.name} + Vibemonitor
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 glass px-6 py-3">
            <Zap className="w-4 h-4 text-[#FFD11B]" />
            <p style={{ fontSize: '14px', color: '#E5E7EB' }}>
              <span style={{ fontWeight: 600 }}>Result:</span> 60-second error resolution
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
