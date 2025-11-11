'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FinalCTASection() {
  const [teamCount, setTeamCount] = useState(73);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamCount((prev) => (prev < 99 ? prev + 1 : 73));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-40 px-8">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Headline */}
          <h2 style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '20px', fontSize: '48px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Start Catching Errors <span style={{ color: '#FF6B35' }}>Today</span>
          </h2>

          {/* Subheadline */}
          <p style={{ fontSize: '20px', color: '#9CA3AF', marginBottom: '48px', lineHeight: 1.6 }}>
            Free for all teams. 2-minute setup. No credit card required.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FFB800] hover:bg-[#FFA500] text-[#000000] rounded-xl px-12 transition-all mx-auto flex items-center gap-3 mb-6"
            style={{
              fontWeight: 700,
              height: '64px',
              width: 'auto',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 0 40px rgba(255, 184, 0, 0.3)',
            }}
          >
            Start Free
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          {/* Urgency Counter */}
          <motion.p
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '15px', color: '#FFB800', fontWeight: 600, marginBottom: '64px' }}
          >
            Join {teamCount} of 100 teams this week
          </motion.p>

          {/* Divider */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent mb-16" />

          {/* Trust Section */}
          <div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Trusted by teams at
            </p>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {['Vercel', 'Stripe', 'Railway', 'Supabase'].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <span style={{ fontSize: '16px', color: '#9CA3AF', fontWeight: 600 }}>
                    {company}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
