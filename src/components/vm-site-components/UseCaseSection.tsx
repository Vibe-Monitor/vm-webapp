'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, DollarSign, Smile } from 'lucide-react';

export function UseCaseSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative px-8 py-24 bg-[#2D425A]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700, color: '#E5E7EB' }}>
            This Could Be Your Day
          </h2>
          <p className="text-xl text-[#98A3B1]">
            See the difference Vibemonitor makes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Without Vibemonitor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#2D425A]/40 backdrop-blur-sm rounded-lg p-8 border-2 border-[#EF4444]/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
              <h3 className="text-2xl text-[#EF4444]" style={{ fontWeight: 600 }}>
                Without Vibemonitor
              </h3>
            </div>

            {/* Timeline */}
            <div className="space-y-4 mb-6">
              {[
                { time: '2:45 PM', label: 'Deploy to Production', delay: 3 },
                { time: '5:45 PM', label: 'Customer Complaint', delay: 180 },
                { time: '8:00 PM', label: 'Finally Fixed', delay: 315 },
              ].map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[#E5E7EB]">{event.label}</span>
                      <span className="text-sm text-[#98A3B1]">{event.time}</span>
                    </div>
                    {i > 0 && (
                      <div className="text-xs text-[#EF4444] mt-1">
                        +{event.delay} minutes
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slack Screenshot Mock */}
            <div className="bg-[#0F1828] rounded-lg p-4 border border-[#EF4444]/30 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div>
                  <p className="text-sm text-[#E5E7EB] mb-1" style={{ fontWeight: 600 }}>
                    Customer Support
                  </p>
                  <p className="text-sm text-[#98A3B1]">
                    "Payment failed! Users can't checkout. Revenue dropping!"
                  </p>
                  <div className="mt-2 px-2 py-1 bg-[#EF4444]/20 text-[#EF4444] text-xs rounded inline-block">
                    HIGH PRIORITY
                  </div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="flex items-center gap-2 text-[#EF4444]">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm" style={{ fontWeight: 600 }}>
                3 hours delay + Revenue loss + Customer frustration
              </span>
            </div>
          </motion.div>

          {/* With Vibemonitor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#2D425A]/40 backdrop-blur-sm rounded-lg p-8 border-2 border-[#10B981]/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-[#10B981]" />
              <h3 className="text-2xl text-[#10B981]" style={{ fontWeight: 600 }}>
                With Vibemonitor
              </h3>
            </div>

            {/* Timeline */}
            <div className="space-y-4 mb-6">
              {[
                { time: '2:45 PM', label: 'Deploy to Production', delay: null },
                { time: '2:46 PM', label: 'Error Detected & Team Alerted', delay: 1 },
                { time: '2:50 PM', label: 'Fixed & Deployed', delay: 5 },
              ].map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[#E5E7EB]">{event.label}</span>
                      <span className="text-sm text-[#98A3B1]">{event.time}</span>
                    </div>
                    {event.delay && (
                      <div className="text-xs text-[#10B981] mt-1">
                        +{event.delay} minute{event.delay > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slack Screenshot Mock */}
            <div className="bg-[#0F1828] rounded-lg p-4 border border-[#10B981]/30 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#FFD11B]/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#FFD11B]" />
                </div>
                <div>
                  <p className="text-sm text-[#E5E7EB] mb-1" style={{ fontWeight: 600 }}>
                    Vibemonitor
                  </p>
                  <div className="text-sm text-[#E5E7EB] space-y-1 mb-2">
                    <p>🔴 <span style={{ fontWeight: 600 }}>High Impact Error</span></p>
                    <p className="text-[#98A3B1]">
                      <code className="text-[#10B981]">payment.js</code> line <code className="text-[#FFD11B]">234</code>
                    </p>
                    <p className="text-[#98A3B1]">Service: Checkout (20% of requests failing)</p>
                  </div>
                  <div className="bg-[#10B981]/10 border-l-2 border-[#10B981] pl-2 py-1">
                    <p className="text-xs text-[#10B981]" style={{ fontWeight: 600 }}>
                      Fix: Update Stripe API call to v2023-10-16
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="flex items-center gap-2 text-[#10B981]">
              <Smile className="w-5 h-5" />
              <span className="text-sm" style={{ fontWeight: 600 }}>
                5 minutes total + Customers never noticed + Team peace of mind
              </span>
            </div>
          </motion.div>
        </div>

        {/* Video Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div
            className="relative max-w-3xl mx-auto bg-[#2D425A]/40 backdrop-blur-sm rounded-lg p-4 border border-[#3F4F67] cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <div className="aspect-video bg-[#0F1828] rounded flex items-center justify-center relative overflow-hidden">
              {!isPlaying ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6266FA]/20 to-[#FFD11B]/20" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 w-20 h-20 rounded-full bg-[#6266FA] flex items-center justify-center group-hover:bg-[#4F53E5] transition-colors"
                  >
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                  </motion.div>
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-sm text-[#E5E7EB]" style={{ fontWeight: 600 }}>
                      Watch a Real Fix in 45 Seconds
                    </p>
                    <p className="text-xs text-[#98A3B1]">
                      See how a team caught and fixed a checkout error
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-[#98A3B1]">[Demo video would play here]</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
