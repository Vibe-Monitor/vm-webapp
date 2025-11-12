'use client';

import { motion } from 'motion/react';
import { BarChart3, GitCommit, MessageCircle } from 'lucide-react';

export function IntegrationsProofSection() {

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
            Your Stack. <span style={{ color: '#6266FA' }}>Enhanced.</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Vibemonitor supercharges your existing tools with AI-powered error detection
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Grafana Enhancement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Subtle accent line */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.5), rgba(245, 158, 11, 0))' 
              }}
            />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center pl-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: '#F59E0B20',
                      border: '2px solid #F59E0B40',
                    }}
                  >
                    <BarChart3 className="w-7 h-7" style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#E5E7EB' }}>
                      Grafana + Vibemonitor
                    </h3>
                    <p style={{ fontSize: '13px', color: '#F59E0B' }}>
                      From metrics to fixes
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#98A3B1', marginBottom: '16px', lineHeight: 1.7 }}>
                  Stop staring at graphs wondering what went wrong. Vibemonitor reads your Grafana spikes, identifies the exact error, and delivers actionable fixes.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        Auto-correlates error spikes
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Matches dashboard anomalies to exact code locations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        Links Slack alerts to graphs
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Click alert → jump straight to Grafana dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustration: Grafana → Vibemonitor Flow */}
              <div className="p-6">
                <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
                  {/* Grafana Graph */}
                  <g>
                    <rect x="20" y="20" width="120" height="80" rx="6" stroke="#F59E0B" strokeWidth="2" fill="rgba(245, 158, 11, 0.05)" />
                    <text x="80" y="15" fill="#F59E0B" fontSize="11" textAnchor="middle" fontWeight="600">Grafana</text>
                    
                    {/* Graph line */}
                    <motion.path
                      d="M 30 70 L 50 65 L 70 60 L 90 40 L 110 45 L 130 50"
                      stroke="#EF4444"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                    {/* Spike indicator */}
                    <motion.circle
                      cx="90"
                      cy="40"
                      r="4"
                      fill="#EF4444"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    />
                    <text x="80" y="120" fill="#98A3B1" fontSize="10" textAnchor="middle">Error spike detected</text>
                  </g>

                  {/* Arrow */}
                  <motion.g
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <path d="M 150 60 L 230 60" stroke="#6266FA" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 230 60 L 220 55 M 230 60 L 220 65" stroke="#6266FA" strokeWidth="2" />
                    <text x="190" y="55" fill="#6266FA" fontSize="10" textAnchor="middle">AI Analysis</text>
                  </motion.g>

                  {/* Vibemonitor Result */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.4 }}
                  >
                    <rect x="240" y="20" width="140" height="80" rx="6" stroke="#10B981" strokeWidth="2" fill="rgba(16, 185, 129, 0.05)" />
                    <text x="310" y="15" fill="#10B981" fontSize="11" textAnchor="middle" fontWeight="600">Vibemonitor</text>
                    
                    <text x="250" y="45" fill="#E5E7EB" fontSize="9" fontFamily="monospace">payment.js:234</text>
                    <text x="250" y="60" fill="#10B981" fontSize="9">✓ Fix identified</text>
                    <text x="250" y="75" fill="#FFD11B" fontSize="9">⚡ 2.3s</text>
                    <text x="310" y="120" fill="#98A3B1" fontSize="10" textAnchor="middle">Root cause + Fix</text>
                  </motion.g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* GitHub Enhancement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            {/* Subtle accent line */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(229, 231, 235, 0.4), rgba(229, 231, 235, 0))' 
              }}
            />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center pl-6">
              {/* Illustration First on Desktop */}
              <div className="p-6 order-2 lg:order-1">
                <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
                  {/* Commit */}
                  <g>
                    <rect x="20" y="30" width="100" height="60" rx="6" stroke="#E5E7EB" strokeWidth="2" fill="rgba(229, 231, 235, 0.05)" />
                    <text x="70" y="25" fill="#E5E7EB" fontSize="11" textAnchor="middle" fontWeight="600">Deploy</text>
                    <text x="30" y="50" fill="#98A3B1" fontSize="9">commit: a3f2e1</text>
                    <text x="30" y="65" fill="#98A3B1" fontSize="9">by: @dev</text>
                    <text x="30" y="80" fill="#98A3B1" fontSize="9">4:23 PM</text>
                  </g>

                  {/* Error Arrow */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <path d="M 70 100 L 70 130" stroke="#EF4444" strokeWidth="2" />
                    <circle cx="70" cy="140" r="8" fill="#EF4444" />
                    <text x="70" y="144" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">!</text>
                    <text x="70" y="160" fill="#EF4444" fontSize="9" textAnchor="middle">Error 60s later</text>
                  </motion.g>

                  {/* Vibemonitor Link */}
                  <motion.g
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <path d="M 140 60 L 220 60" stroke="#6266FA" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 220 60 L 210 55 M 220 60 L 210 65" stroke="#6266FA" strokeWidth="2" />
                    <text x="180" y="55" fill="#6266FA" fontSize="10" textAnchor="middle">Tracks</text>
                  </motion.g>

                  {/* Auto-Link to Commit */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                  >
                    <rect x="230" y="30" width="150" height="60" rx="6" stroke="#6266FA" strokeWidth="2" fill="rgba(98, 102, 250, 0.05)" />
                    <text x="305" y="25" fill="#6266FA" fontSize="11" textAnchor="middle" fontWeight="600">Vibemonitor</text>
                    
                    <text x="240" y="50" fill="#E5E7EB" fontSize="9">🔗 Linked to commit</text>
                    <text x="240" y="65" fill="#10B981" fontSize="9">✓ Rollback suggested</text>
                    <text x="240" y="80" fill="#FFD11B" fontSize="9">⚡ One-click revert</text>
                  </motion.g>
                </svg>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(229, 231, 235, 0.1)',
                      border: '2px solid rgba(229, 231, 235, 0.3)',
                    }}
                  >
                    <GitCommit className="w-7 h-7" style={{ color: '#E5E7EB' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#E5E7EB' }}>
                      GitHub + Vibemonitor
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6266FA' }}>
                      Deploy to diagnosis in 60s
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#98A3B1', marginBottom: '16px', lineHeight: 1.7 }}>
                  Every error is automatically linked to the exact commit that caused it. Know instantly what broke and who deployed it.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        Automatic commit correlation
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Pinpoints which deploy introduced the error
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        One-click rollback option
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Revert directly from Slack alert if needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Slack Enhancement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative"
          >
            {/* Subtle accent line */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(98, 102, 250, 0.5), rgba(98, 102, 250, 0))' 
              }}
            />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center pl-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: '#6266FA20',
                      border: '2px solid #6266FA40',
                    }}
                  >
                    <MessageCircle className="w-7 h-7" style={{ color: '#6266FA' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#E5E7EB' }}>
                      Slack + Vibemonitor
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6266FA' }}>
                      From noise to action
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#98A3B1', marginBottom: '16px', lineHeight: 1.7 }}>
                  Transform your Slack alerts from "something's broken" to "here's exactly what to do." Get file, line, fix, and context in one message.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        Zero-click context switching
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Everything in the alert: error, fix, affected users, severity
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span style={{ fontSize: '10px', color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>
                        Interactive debugging
                      </p>
                      <p style={{ fontSize: '13px', color: '#98A3B1' }}>
                        Ask follow-ups: "@vibemonitor show stack trace"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustration: Before/After Slack */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Before */}
                  <div>
                    <p style={{ fontSize: '10px', color: '#EF4444', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
                      Before
                    </p>
                    <div className="rounded p-3 space-y-2" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded bg-[#EF4444]" />
                        <div className="flex-1">
                          <p style={{ fontSize: '8px', color: '#E5E7EB', marginBottom: '4px', lineHeight: 1.3 }}>
                            🚨 ERROR
                          </p>
                          <p style={{ fontSize: '7px', color: '#98A3B1', lineHeight: 1.4 }}>
                            500 Internal Server Error
                          </p>
                          <p style={{ fontSize: '7px', color: '#98A3B1', marginTop: '4px' }}>
                            Check logs...
                          </p>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '8px', color: '#EF4444', marginTop: '4px', textAlign: 'center' }}>
                      Vague. Useless.
                    </p>
                  </div>

                  {/* After */}
                  <div>
                    <p style={{ fontSize: '10px', color: '#10B981', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
                      After
                    </p>
                    <div className="rounded p-3 space-y-2" style={{ background: 'rgba(98, 102, 250, 0.1)', border: '1px solid rgba(98, 102, 250, 0.3)' }}>
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded bg-[#6266FA] flex items-center justify-center">
                          <span style={{ fontSize: '6px', fontWeight: 700, color: '#fff' }}>VM</span>
                        </div>
                        <div className="flex-1">
                          <p style={{ fontSize: '7px', color: '#E5E7EB', marginBottom: '3px', lineHeight: 1.3 }}>
                            🔍 payment.js:234
                          </p>
                          <p style={{ fontSize: '7px', color: '#10B981', lineHeight: 1.3 }}>
                            ✅ Fix: api.retry()
                          </p>
                          <p style={{ fontSize: '7px', color: '#FFD11B', marginTop: '3px' }}>
                            ⚡ 2.3s
                          </p>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '8px', color: '#10B981', marginTop: '4px', textAlign: 'center' }}>
                      Actionable. Fast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p style={{ fontSize: '16px', color: '#98A3B1' }}>
            Your existing stack + Vibemonitor AI ={' '}
            <span style={{ color: '#FFD11B', fontWeight: 700 }}>60-second error resolution</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
