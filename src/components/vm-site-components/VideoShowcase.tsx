'use client';

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useState } from 'react';

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section data-section-name="video-ai-showcase" className="relative py-20 px-8 overflow-hidden">
      {/* Animated Background - matching hero and interactive proof */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(98, 102, 250, 0.15) 0%, transparent 70%)',
            top: '-250px',
            right: '-150px',
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
          className="absolute rounded-full blur-3xl"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 207, 0, 0.1) 0%, transparent 70%)',
            bottom: '-200px',
            left: '-150px',
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

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(98, 102, 250, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(98, 102, 250, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-3"
          >
            <div
              className="px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(98, 102, 250, 0.1)',
                border: '1px solid rgba(98, 102, 250, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#6266FA',
                letterSpacing: '0.5px'
              }}>
                See It In Action
              </span>
            </div>
          </motion.div>

          <h2
            className="mb-4"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 48px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#E5E7EB',
            }}
          >
            Production chaos, meet{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6266FA 0%, #A38BF4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vibemonitor
            </span>
            .
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#95A3B2',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6',
            marginBottom: '16px'
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
          className="relative group"
        >
          {/* Video wrapper with glassmorphism */}
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(98, 102, 250, 0.1)',
              aspectRatio: '16/9'
            }}
          >
            {/* Glowing border effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.3), rgba(255, 207, 0, 0.3))',
                opacity: 0,
              }}
              whileHover={{ opacity: 0.5 }}
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
                borderRadius: '24px'
              }}
              onLoad={() => setIsPlaying(true)}
            />

            {/* Play overlay (shows before video loads/plays) */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 24, 40, 0.9), rgba(30, 41, 59, 0.9))',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #FFCF00 0%, #FF9500 100%)',
                      boxShadow: '0 8px 32px rgba(255, 207, 0, 0.4)'
                    }}
                  >
                    <Play className="w-10 h-10 text-black ml-1" fill="black" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(98, 102, 250, 0.3) 0%, transparent 70%)',
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
            className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 207, 0, 0.3) 0%, transparent 70%)',
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
    </section>
  );
}
