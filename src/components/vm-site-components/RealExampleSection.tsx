'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export function RealExampleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[#F8FAFC] py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="text-center mb-12"
            style={{ fontWeight: 700, color: '#1E293B' }}
          >
            What your team sees in 60 seconds
          </motion.h2>

          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="max-w-[800px] mx-auto cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div
              className="bg-white rounded-lg p-8 border border-[#E2E8F0] hover:shadow-lg transition-shadow"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              {/* Slack Message UI */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#3B82F6] flex items-center justify-center">
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      VM
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1E293B', fontSize: '14px' }}>
                      Vibemonitor
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>Today at 2:34 PM</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-[#F8FAFC] rounded-lg p-6 border border-[#E2E8F0]">
                  <p style={{ fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>
                    @channel Error detected
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#3B82F6', marginBottom: '12px' }}>
                    payment-service.js • Line 234
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>
                    Checkout service affected
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#F59E0B', marginBottom: '16px' }}>
                    HIGH severity
                  </p>

                  {/* Code Block */}
                  <div className="bg-[#1E293B] rounded p-4">
                    <p style={{ fontSize: '12px', color: '#10B981', marginBottom: '4px' }}>
                      Fix: Update API endpoint
                    </p>
                    <code style={{ fontSize: '11px', color: '#E2E8F0', fontFamily: 'monospace' }}>
                      - const url = '/api/v1/payment'
                      <br />+ const url = '/api/v2/payment'
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="text-center mt-8"
            style={{ fontSize: '16px', color: '#64748B' }}
          >
            No more 3AM customer calls
          </motion.p>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-12 max-w-[900px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-[#3B82F6] flex items-center justify-center">
                  <span className="text-white" style={{ fontWeight: 700, fontSize: '18px' }}>
                    VM
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#1E293B', fontSize: '16px' }}>
                    Vibemonitor
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>Today at 2:34 PM</p>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-lg p-8 border border-[#E2E8F0]">
                <p style={{ fontWeight: 600, color: '#1E293B', marginBottom: '12px', fontSize: '16px' }}>
                  @channel Error detected
                </p>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#3B82F6', marginBottom: '16px' }}>
                  payment-service.js • Line 234
                </p>
                <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '12px' }}>
                  Checkout service affected
                </p>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#F59E0B', marginBottom: '24px' }}>
                  HIGH severity
                </p>

                <div className="bg-[#1E293B] rounded p-6">
                  <p style={{ fontSize: '14px', color: '#10B981', marginBottom: '8px' }}>
                    Fix: Update API endpoint
                  </p>
                  <code style={{ fontSize: '13px', color: '#E2E8F0', fontFamily: 'monospace' }}>
                    - const url = '/api/v1/payment'
                    <br />+ const url = '/api/v2/payment'
                  </code>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 bg-[#F8FAFC] hover:bg-[#E2E8F0] rounded-lg transition-colors"
                style={{ color: '#64748B' }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
