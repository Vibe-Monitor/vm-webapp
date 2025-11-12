'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function SocialProofSection() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const testimonials = [
    {
      quote: 'Fixed before customers noticed',
      author: 'Sarah K.',
      role: 'Engineering Manager',
    },
    {
      quote: 'Saved 3 hours per incident',
      author: 'Mike T.',
      role: 'DevOps Lead',
    },
    {
      quote: 'Simple. Reliable. Done.',
      author: 'Priya S.',
      role: 'CTO',
    },
  ];

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
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-16 mb-32">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B35] to-transparent rounded-full" />
              <div className="pl-8">
                <p style={{ fontSize: '20px', fontStyle: 'italic', color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.6 }}>
                  "{testimonial.quote}"
                </p>
                <p style={{ fontSize: '15px', color: '#9CA3AF', marginBottom: '4px' }}>
                  — {testimonial.author}
                </p>
                <p style={{ fontSize: '13px', color: '#9CA3AF', opacity: 0.7 }}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent mb-32" />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          onViewportEnter={() => setHasAnimated(true)}
          className="grid lg:grid-cols-3 gap-16"
        >
          <div className="text-center">
            <motion.p
              style={{ fontSize: '56px', fontWeight: 700, color: '#FF6B35', marginBottom: '12px', lineHeight: 1 }}
            >
              {count1}+
            </motion.p>
            <p style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>teams</p>
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Protected daily</p>
          </div>
          <div className="text-center">
            <motion.p
              style={{ fontSize: '56px', fontWeight: 700, color: '#FF6B35', marginBottom: '12px', lineHeight: 1 }}
            >
              {count2}%
            </motion.p>
            <p style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>accuracy</p>
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Error detection rate</p>
          </div>
          <div className="text-center">
            <motion.p
              style={{ fontSize: '56px', fontWeight: 700, color: '#FF6B35', marginBottom: '12px', lineHeight: 1 }}
            >
              {count3}
            </motion.p>
            <p style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>minutes</p>
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Average resolution</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
