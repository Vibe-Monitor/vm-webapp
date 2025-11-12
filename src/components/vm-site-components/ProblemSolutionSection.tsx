'use client';

import { motion } from 'motion/react';

export function ProblemSolutionSection() {
  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-[1200px] mx-auto space-y-32">
        {/* Problem Screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-16"
        >
          {/* Left: Visual */}
          <div className="flex-1">
            <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
              {/* Timeline dots and lines - RED */}
              <motion.circle
                cx="50"
                cy="150"
                r="12"
                fill="#EF4444"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.2 }}
              />
              <motion.line
                x1="62"
                y1="150"
                x2="188"
                y2="150"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              <motion.circle
                cx="200"
                cy="150"
                r="12"
                fill="#EF4444"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.6 }}
              />
              <motion.line
                x1="212"
                y1="150"
                x2="338"
                y2="150"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              />
              <motion.circle
                cx="350"
                cy="150"
                r="12"
                fill="#EF4444"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 1.0 }}
              />

              {/* Labels */}
              <text x="20" y="120" fill="#64748B" fontSize="14" textAnchor="middle">Customer</text>
              <text x="20" y="135" fill="#64748B" fontSize="14" textAnchor="middle">complains</text>
              
              <text x="200" y="120" fill="#64748B" fontSize="14" textAnchor="middle">Manual log</text>
              <text x="200" y="135" fill="#64748B" fontSize="14" textAnchor="middle">search</text>
              
              <text x="350" y="120" fill="#64748B" fontSize="14" textAnchor="middle">3hr delay</text>
            </svg>
          </div>

          {/* Right: Text */}
          <div className="flex-1">
            <h2 style={{ fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>
              Errors Hide Until Customers Complain
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              3 hours wasted hunting scattered logs
            </p>
          </div>
        </motion.div>

        {/* Solution Screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-16"
        >
          {/* Left: Text */}
          <div className="flex-1">
            <h2 style={{ fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>
              Vibemonitor Changes Everything
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              One Slack alert with exact file + fix steps
            </p>
          </div>

          {/* Right: Visual */}
          <div className="flex-1">
            <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
              {/* Timeline dots and lines - GREEN */}
              <motion.circle
                cx="50"
                cy="150"
                r="12"
                fill="#10B981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.2 }}
              />
              <motion.line
                x1="62"
                y1="150"
                x2="188"
                y2="150"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              <motion.circle
                cx="200"
                cy="150"
                r="12"
                fill="#10B981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.6 }}
              />
              <motion.line
                x1="212"
                y1="150"
                x2="338"
                y2="150"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              />
              <motion.circle
                cx="350"
                cy="150"
                r="12"
                fill="#10B981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 1.0 }}
              />

              {/* Labels */}
              <text x="50" y="120" fill="#64748B" fontSize="14" textAnchor="middle">60s</text>
              <text x="50" y="135" fill="#64748B" fontSize="14" textAnchor="middle">detection</text>
              
              <text x="200" y="120" fill="#64748B" fontSize="14" textAnchor="middle">Slack</text>
              <text x="200" y="135" fill="#64748B" fontSize="14" textAnchor="middle">alert</text>
              
              <text x="350" y="120" fill="#64748B" fontSize="14" textAnchor="middle">5min</text>
              <text x="350" y="135" fill="#64748B" fontSize="14" textAnchor="middle">fix</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
