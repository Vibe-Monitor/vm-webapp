'use client';

import { motion } from 'motion/react';
import { GitCommit, Zap, CheckCircle2 } from 'lucide-react';

export function WorkflowProofSection() {
  const cards = [
    {
      title: 'Deploy → Detection',
      subtitle: '60 seconds from deploy to alert',
      icon: GitCommit,
      color: '#98A3B1',
      illustration: (
        <svg width="300" height="80" viewBox="0 0 300 80" fill="none" className="mx-auto mb-4">
          {/* GitHub Icon */}
          <circle cx="40" cy="40" r="20" stroke="#98A3B1" strokeWidth="2" fill="none" />
          <path d="M40 30v20M30 40h20" stroke="#98A3B1" strokeWidth="2" />
          
          {/* Arrow */}
          <motion.line
            x1="70"
            y1="40"
            x2="130"
            y2="40"
            stroke="#6266FA"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          {/* Server */}
          <rect x="140" y="25" width="30" height="30" rx="4" stroke="#98A3B1" strokeWidth="2" fill="none" />
          <line x1="145" y1="35" x2="165" y2="35" stroke="#98A3B1" strokeWidth="1" />
          <line x1="145" y1="40" x2="165" y2="40" stroke="#98A3B1" strokeWidth="1" />
          <line x1="145" y1="45" x2="165" y2="45" stroke="#98A3B1" strokeWidth="1" />
          
          {/* Arrow */}
          <motion.line
            x1="180"
            y1="40"
            x2="240"
            y2="40"
            stroke="#FFD11B"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          
          {/* Lightning */}
          <path d="M260 25l-10 15h8l-10 15" stroke="#FFD11B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      screenshot: (
        <div className="rounded-lg overflow-hidden border border-[#2F4257] p-4 bg-[#0F1828]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-12 bg-[#EF4444] rounded" />
            <div className="flex-1">
              <div className="flex gap-1 mb-1">
                {[60, 80, 95, 85, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-6 bg-[#EF4444] rounded-t"
                    style={{ height: `${h}%` }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '10px', color: '#98A3B1' }}>Error spike detected</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Instant Slack Alert',
      subtitle: 'Everything in one message',
      icon: Zap,
      color: '#FFD11B',
      highlight: true,
      screenshot: (
        <div className="rounded-lg overflow-hidden border border-[#6266FA] bg-[#0F1828] p-4">
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-[#6266FA] flex items-center justify-center flex-shrink-0">
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>VM</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#E5E7EB', marginBottom: '4px' }}>
                Vibemonitor <span style={{ color: '#98A3B1', fontWeight: 400 }}>2:46 PM</span>
              </p>
              <div
                className="rounded p-3 mb-2"
                style={{ background: 'rgba(98, 102, 250, 0.1)', border: '1px solid rgba(98, 102, 250, 0.3)' }}
              >
                <p style={{ fontSize: '10px', color: '#E5E7EB', marginBottom: '6px' }}>
                  🔍 <strong>Found:</strong> payment.js:234
                </p>
                <p style={{ fontSize: '10px', color: '#E5E7EB' }}>
                  ✅ <strong>Fix:</strong> Replace api.call() → api.retry()
                </p>
              </div>
              <p style={{ fontSize: '9px', color: '#FFD11B' }}>⚡ Response: 2.3s</p>
            </div>
          </div>
        </div>
      ),
      illustration: (
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" className="mx-auto mb-4">
          {/* Server to Slack Arrow */}
          <motion.path
            d="M20 30 Q100 10, 180 30"
            stroke="#6266FA"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.circle
            cx="180"
            cy="30"
            r="4"
            fill="#6266FA"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          />
          <text x="90" y="50" fill="#FFD11B" fontSize="10" textAnchor="middle">
            60 seconds
          </text>
        </svg>
      ),
    },
    {
      title: 'Fixed in 5 Minutes',
      subtitle: 'See impact drop instantly',
      icon: CheckCircle2,
      color: '#10B981',
      screenshot: (
        <div className="rounded-lg overflow-hidden border border-[#2F4257] p-4 bg-[#0F1828]">
          <div className="flex items-end gap-1 h-16 mb-2">
            {[85, 90, 95, 85, 60, 30, 15, 10, 8].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{ 
                  background: i < 4 ? '#EF4444' : '#10B981',
                  height: `${h}%`,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
          <p style={{ fontSize: '10px', color: '#10B981', textAlign: 'center' }}>
            ✓ Errors resolved
          </p>
        </div>
      ),
      illustration: (
        <svg width="150" height="60" viewBox="0 0 150 60" fill="none" className="mx-auto mb-4">
          <motion.path
            d="M20 40 L50 40 L50 10 L100 10"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.circle
            cx="100"
            cy="10"
            r="8"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.path
            d="M95 10 L98 13 L105 6"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '12px' }}>
            The 60-Second Journey
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            From deploy to fix in three proven steps
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass p-8"
              style={{
                boxShadow: card.highlight ? 'var(--glow-primary)' : 'var(--card-shadow)',
                border: card.highlight ? '2px solid rgba(98, 102, 250, 0.3)' : undefined,
              }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${card.color}20`,
                        border: `2px solid ${card.color}40`,
                      }}
                    >
                      <card.icon className="w-6 h-6" style={{ color: card.color }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontWeight: 700,
                          color: card.highlight ? '#FFD11B' : '#E5E7EB',
                          fontSize: '20px',
                          marginBottom: '4px',
                        }}
                      >
                        {card.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#98A3B1' }}>{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Illustration */}
                  {card.illustration}
                </div>

                {/* Screenshot */}
                <div>{card.screenshot}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
