'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export function GiantOrbCTASection() {
  const [teamCount, setTeamCount] = useState(78);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamCount((prev) => (prev < 100 ? prev + 1 : 78));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
  };

  return (
    <section className="py-40 px-8 relative overflow-hidden">
      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? '#6266FA' : '#FFD11B',
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: '50%',
              }}
              initial={{ y: 0, opacity: 1, scale: 0 }}
              animate={{
                y: (Math.random() - 0.5) * 800,
                x: (Math.random() - 0.5) * 800,
                opacity: 0,
                scale: [0, 1, 0],
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto text-center">
        {/* Giant Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto mb-16"
          style={{
            width: '600px',
            height: '600px',
            maxWidth: '90vw',
            maxHeight: '90vw',
          }}
        >
          {/* Orb Background */}
          <motion.div
            className="absolute inset-0 rounded-full glass"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(98, 102, 250, 0.4), rgba(15, 24, 40, 0.2))',
              boxShadow: 'var(--glow-primary)',
              border: '3px solid rgba(98, 102, 250, 0.5)',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Rotating Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="rgba(98, 102, 250, 0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="#FFD11B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="596.9"
              initial={{ strokeDashoffset: 596.9 }}
              animate={{ strokeDashoffset: 596.9 * (1 - teamCount / 100) }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            {/* Icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mb-8"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6266FA, #FFD11B)',
                  boxShadow: '0 0 60px rgba(98, 102, 250, 0.6)',
                }}
              >
                <Zap className="w-12 h-12 text-white" fill="white" />
              </div>
            </motion.div>

            {/* Curved Text Effect - Headline */}
            <h2
              className="mb-6"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(24px, 5vw, 40px)',
                color: '#E5E7EB',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              Start Catching
              <br />
              <span style={{ color: '#6266FA' }}>Errors Now</span>
            </h2>

            {/* Subheadline */}
            <p
              className="mb-8"
              style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                color: '#98A3B1',
                maxWidth: '300px',
              }}
            >
              Start free. 2-minute setup.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="px-8 py-4 rounded-xl flex items-center gap-2 mb-6"
              style={{
                background: 'linear-gradient(135deg, #6266FA, #5558E3)',
                color: '#E5E7EB',
                fontWeight: 700,
                fontSize: '18px',
                boxShadow: 'var(--glow-primary)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Launch Vibemonitor
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Progress Text */}
            <motion.p
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: '14px',
                color: '#FFD11B',
                fontWeight: 600,
              }}
            >
              {teamCount}/100 teams this week
            </motion.p>
          </div>
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-8 flex-wrap"
          style={{ fontSize: '14px', color: '#98A3B1' }}
        >
          <span>✓ No credit card required</span>
          <span>✓ Cancel anytime</span>
          <span>✓ 98% accuracy guaranteed</span>
        </motion.div>
      </div>
    </section>
  );
}
