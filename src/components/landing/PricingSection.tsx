'use client';

import { motion } from 'motion/react';
import { Check, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  icon: React.ReactNode;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for small teams getting started with AI-powered observability.',
    features: [
      'Up to 3 team members',
      '1 GitHub repository',
      '1 Slack workspace',
      'Basic root cause analysis',
      '7-day data retention',
      'Community support',
    ],
    cta: 'Get Started Free',
    ctaLink: '/auth',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For growing teams that need advanced features and integrations.',
    features: [
      'Unlimited team members',
      'Unlimited repositories',
      'Unlimited Slack workspaces',
      'Advanced AI root cause analysis',
      'New Relic integration',
      '30-day data retention',
      'Priority support',
      'Custom alerts & workflows',
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/auth',
    popular: true,
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      data-section-name="pricing"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: '#F8FAFC',
      }}
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(10, 37, 64, 0.06) 0%, transparent 70%)',
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

      <div className="max-w-5xl mx-auto relative z-10">
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
              <Sparkles className="w-4 h-4" style={{ color: '#0A2540' }} />
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0A2540',
                letterSpacing: '0.5px'
              }}>
                PRICING
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
            Simple,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A2540 0%, #4A5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              transparent pricing
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#4A5568',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 lg:p-8 rounded-2xl ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              style={{
                background: tier.popular ? '#0A2540' : '#ffffff',
                border: tier.popular ? 'none' : '1px solid rgba(10, 37, 64, 0.1)',
                boxShadow: tier.popular
                  ? '0 20px 60px rgba(10, 37, 64, 0.3)'
                  : '0 4px 20px rgba(10, 37, 64, 0.06)',
              }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  }}
                >
                  <span className="text-white text-xs font-semibold">MOST POPULAR</span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: tier.popular ? 'rgba(255, 255, 255, 0.1)' : 'rgba(10, 37, 64, 0.06)',
                  }}
                >
                  <span style={{ color: tier.popular ? '#ffffff' : '#0A2540' }}>
                    {tier.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: tier.popular ? '#ffffff' : '#0A2540',
                  }}
                >
                  {tier.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: tier.popular ? '#ffffff' : '#0A2540',
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    color: tier.popular ? 'rgba(255, 255, 255, 0.7)' : '#4A5568',
                  }}
                >
                  {tier.period}
                </span>
              </div>

              {/* Description */}
              <p
                className="mb-6"
                style={{
                  fontSize: '14px',
                  color: tier.popular ? 'rgba(255, 255, 255, 0.8)' : '#4A5568',
                  lineHeight: '1.6',
                }}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: tier.popular ? '#10B981' : '#10B981' }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        color: tier.popular ? 'rgba(255, 255, 255, 0.9)' : '#1D1C1D',
                        lineHeight: '1.5',
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={tier.ctaLink}
                className="block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300"
                style={{
                  background: tier.popular ? '#ffffff' : '#0A2540',
                  color: tier.popular ? '#0A2540' : '#ffffff',
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: tier.popular
                    ? '0 4px 12px rgba(255, 255, 255, 0.2)'
                    : '0 4px 12px rgba(10, 37, 64, 0.2)',
                }}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p style={{ fontSize: '15px', color: '#4A5568', marginBottom: '12px' }}>
            Need a custom plan for your enterprise?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'transparent',
              color: '#0A2540',
              fontSize: '15px',
              textDecoration: 'none',
              border: '1px solid rgba(10, 37, 64, 0.2)',
            }}
          >
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
