'use client';

import { motion } from 'motion/react';
import { Play, Zap } from 'lucide-react';
import { useState } from 'react';

export function FinalCTAWithVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      id="how-it-works"
      data-section-name="how-it-works"
      className="relative w-full min-h-screen py-24 px-6 overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)',
      }}
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(10, 37, 64, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 85, 104, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div
              className="px-4 py-2 rounded-full flex items-center gap-2"
              style={{
                background: 'rgba(10, 37, 64, 0.08)',
                border: '1px solid rgba(10, 37, 64, 0.15)',
              }}
            >
              <Zap className="w-4 h-4" style={{ color: '#0A2540' }} />
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0A2540',
                letterSpacing: '0.5px'
              }}>
                See It In Action
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h2
            className="mb-4"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#0A2540',
            }}
          >
            Production chaos, meet{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A2540 0%, #4A5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vibemonitor
            </span>
            .
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#4A5568',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}>
            It finds the signal in the noise, analyzes what went wrong, and surfaces the commit behind cascading failures — automatically.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mb-16"
        >
          {/* Video wrapper */}
          <div
            className="rounded-2xl overflow-hidden relative mx-auto"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(10, 37, 64, 0.1)',
              boxShadow: '0 20px 60px rgba(10, 37, 64, 0.1), 0 8px 24px rgba(10, 37, 64, 0.08)',
              aspectRatio: '16/9',
              maxWidth: '900px',
            }}
          >
            {/* Glowing border effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.1), rgba(74, 85, 104, 0.1))',
                opacity: 0,
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* YouTube iframe */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/w1bVMMRY1ZM"
              title="Vibemonitor Overview - AI-Powered Error Monitoring"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '16px'
              }}
              onLoad={() => setIsPlaying(true)}
            />

            {/* Play overlay (shows before video loads) */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.9), rgba(74, 85, 104, 0.9))',
                  borderRadius: '16px'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: '#0A2540',
                      boxShadow: '0 8px 32px rgba(10, 37, 64, 0.4)'
                    }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 rounded-full blur-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(10, 37, 64, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(74, 85, 104, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          />
        </motion.div>


     
      </div>
    </div>
  );
}

export default FinalCTAWithVideo;
