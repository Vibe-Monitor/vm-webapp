'use client';

import { motion } from 'motion/react';
import { Link2, Eye, MessageSquare } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Connect in 2 minutes',
      description: "Link your existing logs. No new tools, no complex setup. Just connect Grafana or your log provider and you're ready.",
      visual: (
        <div className="flex items-center justify-center gap-6">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-16 h-16 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center"
          >
            <span style={{ fontSize: '28px' }}>📊</span>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ color: '#6266FA', fontSize: '32px' }}>→</span>
          </motion.div>
          <motion.div
            whileHover={{ rotate: -5 }}
            className="w-16 h-16 rounded-2xl bg-[#6266FA]/10 border border-[#6266FA]/30 flex items-center justify-center"
          >
            <span style={{ fontSize: '28px' }}>💬</span>
          </motion.div>
        </div>
      ),
    },
    {
      number: '02',
      icon: Eye,
      title: 'AI watches 24/7',
      description: 'Our AI monitors everything automatically. It learns your patterns, understands your stack, and never sleeps.',
      visual: (
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-16 rounded-full"
              style={{ backgroundColor: '#FF6B35' }}
              animate={{
                height: ['64px', '96px', '64px'],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      number: '03',
      icon: MessageSquare,
      title: 'Get alerted instantly',
      description: 'Exact file, line number, and fix steps delivered to your Slack. Your team knows what to do immediately.',
      visual: (
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-sm rounded-xl p-6 border border-[#1F1F1F] max-w-xs mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center">
              <span style={{ fontSize: '12px', color: '#fff', fontWeight: 700 }}>VM</span>
            </div>
            <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>
              Vibemonitor
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#FF6B35', fontWeight: 700, marginBottom: '6px' }}>
            payment.js:234
          </p>
          <p style={{ fontSize: '9px', color: '#9CA3AF' }}>
            Fix ready → Update API endpoint
          </p>
        </motion.div>
      ),
      cta: true,
    },
  ];

  return (
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-24"
        >
          <h2 style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
            How It Works
          </h2>
          <p style={{ fontSize: '20px', color: '#9CA3AF' }}>
            Three simple steps to never miss an error again
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    style={{
                      fontSize: '48px',
                      fontWeight: 700,
                      color: '#FF6B35',
                      opacity: 0.2,
                    }}
                  >
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center">
                    <step.icon className="w-7 h-7" style={{ color: '#FF6B35' }} />
                  </div>
                </div>
                <h3 style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', fontSize: '28px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '18px', color: '#9CA3AF', marginBottom: step.cta ? '28px' : '0', lineHeight: 1.7 }}>
                  {step.description}
                </p>
                {step.cta && (
                  <button
                    className="bg-[#0A0A0A]/50 hover:bg-[#0A0A0A] backdrop-blur-sm border border-[#1F1F1F] text-[#FF6B35] rounded-xl px-6 py-3 transition-all hover:border-[#FF6B35]/50"
                    style={{ fontWeight: 600, fontSize: '15px' }}
                  >
                    Try in Slack →
                  </button>
                )}
              </div>

              {/* Visual */}
              <div className={`flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center mt-32"
        >
          <p style={{ fontSize: '20px', color: '#FFFFFF' }}>
            That's it. Errors caught before customers notice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
