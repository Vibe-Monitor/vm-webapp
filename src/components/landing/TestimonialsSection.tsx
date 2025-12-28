'use client';

import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechScale',
    quote: 'VibeMonitor cut our incident response time by 80%. The AI-powered root cause analysis is a game-changer for our on-call team.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'SRE Lead',
    company: 'CloudFirst',
    quote: 'Finally, an observability tool that actually explains what went wrong instead of just showing us dashboards. Our MTTR dropped from hours to minutes.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CTO',
    company: 'DataFlow',
    quote: 'The Slack integration is brilliant. Our team gets actionable insights right where they work, with clear fix recommendations.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-section-name="testimonials"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      }}
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(10, 37, 64, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
                background: 'rgba(10, 37, 64, 0.06)',
                border: '1px solid rgba(10, 37, 64, 0.12)',
              }}
            >
              <Quote className="w-4 h-4" style={{ color: '#0A2540' }} />
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0A2540',
                letterSpacing: '0.5px'
              }}>
                TESTIMONIALS
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h2
            className="mb-4"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#0A2540',
            }}
          >
            Loved by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A2540 0%, #4A5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              engineering teams
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#4A5568',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See why teams trust VibeMonitor to keep their production systems running smoothly
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 lg:p-8 rounded-2xl"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(10, 37, 64, 0.08)',
                boxShadow: '0 4px 20px rgba(10, 37, 64, 0.06)',
              }}
            >
              {/* Quote Icon */}
              <div
                className="absolute -top-3 left-6 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: '#0A2540',
                }}
              >
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{ color: '#F59E0B', fill: '#F59E0B' }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="mb-6"
                style={{
                  fontSize: '15px',
                  color: '#1D1C1D',
                  lineHeight: '1.7',
                }}
              >
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0A2540 0%, #4A5568 100%)',
                  }}
                >
                  {/* Placeholder avatar with initials */}
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0A2540',
                      marginBottom: '2px',
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4A5568' }}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(10, 37, 64, 0.04)',
              border: '1px solid rgba(10, 37, 64, 0.08)',
            }}
          >
            <div className="flex -space-x-2">
              {['SC', 'MJ', 'ER', 'JK', 'AL'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-white"
                  style={{
                    background: `linear-gradient(135deg, ${['#0A2540', '#4A5568', '#0A2540', '#4A5568', '#0A2540'][i]} 0%, #4A5568 100%)`,
                  }}
                >
                  <span className="text-white text-xs font-medium">{initials}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: '14px', color: '#4A5568', fontWeight: 500 }}>
              Trusted by 500+ engineering teams worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
