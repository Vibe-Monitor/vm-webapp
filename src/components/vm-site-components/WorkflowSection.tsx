'use client';

import { motion } from 'motion/react';
import { Database, Eye, Brain, MessageSquare, CheckCircle } from 'lucide-react';

export function WorkflowSection() {
  const steps = [
    { icon: Database, label: 'Connect your logs', x: 100 },
    { icon: Eye, label: 'Watch 24/7', x: 275 },
    { icon: Brain, label: 'Spot errors instantly', x: 450 },
    { icon: MessageSquare, label: 'Alert Slack with fixes', x: 625 },
    { icon: CheckCircle, label: 'Resolve in minutes', x: 800 },
  ];

  return (
    <section className="bg-[#F8FAFC] py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="mb-16"
        >
          <svg width="1000" height="200" viewBox="0 0 1000 200" fill="none" className="mx-auto">
            {/* Connecting Line */}
            <motion.line
              x1="100"
              y1="60"
              x2="800"
              y2="60"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.g
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.2 + index * 0.15 }}
              >
                {/* Icon Circle */}
                <circle cx={step.x} cy="60" r="30" fill="white" stroke="#3B82F6" strokeWidth="2" />
                <foreignObject x={step.x - 12} y={48} width="24" height="24">
                  <step.icon className="w-6 h-6" style={{ color: '#3B82F6' }} />
                </foreignObject>
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 1.0 }}
          className="flex justify-between max-w-[900px] mx-auto"
        >
          {steps.map((step, index) => (
            <div key={index} className="text-center" style={{ width: '160px' }}>
              <p style={{ fontSize: '16px', color: '#64748B' }}>{step.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#F59E0B' }}>
            End-to-end: 60 seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
