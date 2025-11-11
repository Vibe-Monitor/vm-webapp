'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function TrustSection() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) {
      const timer1 = setInterval(() => {
        setCount1((prev) => (prev < 50 ? prev + 1 : 50));
      }, 15);

      const timer2 = setInterval(() => {
        setCount2((prev) => (prev < 98 ? prev + 1 : 98));
      }, 8);

      const timer3 = setInterval(() => {
        setCount3((prev) => (prev < 5 ? prev + 1 : 5));
      }, 160);

      return () => {
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
      };
    }
  }, [hasAnimated]);

  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            onViewportEnter={() => setHasAnimated(true)}
            className="space-y-6"
          >
            <div>
              <p style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                {count1}+ teams protected
              </p>
            </div>
            <div>
              <p style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                {count2}% errors caught instantly
              </p>
            </div>
            <div>
              <p style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                {count3}-minute average fix time
              </p>
            </div>
          </motion.div>

          {/* Right: Micro-quotes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-[#3B82F6] pl-6">
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#64748B', marginBottom: '8px' }}>
                "Fixed before customers noticed"
              </p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>— Engineering Lead</p>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-6">
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#64748B', marginBottom: '8px' }}>
                "Saved hours per incident"
              </p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>— DevOps Manager</p>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-6">
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#64748B', marginBottom: '8px' }}>
                "Simple and reliable"
              </p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>— CTO</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
