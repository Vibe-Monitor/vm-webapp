'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function FloatingLogosSection() {
  const logos = [
    { name: 'Vercel', quote: 'Fixed before launch', author: 'Vercel Eng', angle: 0 },
    { name: 'Stripe', quote: '5min incidents', author: 'Stripe DevOps', angle: 60 },
    { name: 'Notion', quote: 'Zero customer impact', author: 'Notion Lead', angle: 120 },
    { name: 'GitHub', quote: 'Catches everything', author: 'GitHub SRE', angle: 180 },
    { name: 'Linear', quote: 'Incredible speed', author: 'Linear Team', angle: 240 },
    { name: 'Supabase', quote: 'Game changer', author: 'Supabase Eng', angle: 300 },
  ];

  const stats = [
    { value: '247', label: 'errors caught today' },
    { value: '4.9/5', label: 'rating' },
    { value: '2.3s', label: 'avg response' },
  ];

  return (
    <section className="py-32 px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '16px' }}>
            Trusted by Modern Teams
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Engineering leaders who demand excellence
          </p>
        </motion.div>

        {/* Orbiting Logos */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Center Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass absolute z-10 p-8 text-center"
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              boxShadow: 'var(--glow-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#6266FA',
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </motion.p>
                <p style={{ fontSize: '11px', color: '#98A3B1' }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Orbiting Logo Cards */}
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              animate={{
                rotate: [logo.angle, logo.angle + 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="glass p-6"
                style={{
                  width: '160px',
                  transform: 'translateX(250px)',
                  boxShadow: '0 4px 20px rgba(255, 209, 27, 0.2)',
                }}
                animate={{
                  rotate: [-(logo.angle), -(logo.angle + 360)],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 8px 30px rgba(255, 209, 27, 0.4)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-[#FFD11B]" fill="#FFD11B" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#E5E7EB' }}>
                    {logo.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    fontStyle: 'italic',
                    color: '#98A3B1',
                    marginBottom: '6px',
                  }}
                >
                  "{logo.quote}"
                </p>
                <p style={{ fontSize: '10px', color: '#98A3B1', opacity: 0.7 }}>
                  — {logo.author}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
