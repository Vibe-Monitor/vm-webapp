'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/services/api/apiFactory';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.mailgun.submitContactForm({
        name: formData.name,
        work_email: formData.email,
        interested_topics: formData.interest,
      });

      if (response.status === 200 && response.data?.success) {
        setIsSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit contact form. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <>
        <div className="min-h-[calc(100vh-4rem)]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center" style={{ background: 'rgba(10, 37, 64, 0.1)' }}>
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#0A2540' }} />
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#0A2540', marginBottom: '12px' }}>
                Thank you for reaching out!
              </h1>
              <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#4A5568', marginBottom: '24px' }}>
                We&apos;ve received your message and will get back to you shortly.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{
                  background: '#0A2540',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  textDecoration: 'none',
                }}
              >
                Return to Home
              </Link>
            </motion.div>
          </div>
        </div>
   
      </>
    );
  }

  return (
    <>

      <div className="min-h-[calc(100vh-9rem)]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 700, color: '#0A2540', marginBottom: 'clamp(16px, 3vw, 24px)', lineHeight: '1.1' }}>
                Contact Us
              </h1>

              <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: '#4A5568', lineHeight: '1.7', marginBottom: 'clamp(24px, 4vw, 48px)' }}>
                We&apos;d love to hear from you. Whether you&apos;re exploring AI-powered incident management or have questions about how VibeMonitor can work in your environment, our team is here to help.
              </p>

              {/* Value Propositions */}
              <div className="space-y-4">
                {[
                  'Learn more about enterprise plans and integrations',
                  'Get support adopting VibeMonitor in your workflows',
                  'Partner to shape autonomous production operations',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(10, 37, 64, 0.1)' }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#0A2540' }} />
                    </div>
                    <p style={{ fontSize: '16px', color: '#1D1C1D', lineHeight: '1.6' }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl"
                style={{ background: 'rgba(10, 37, 64, 0.05)', border: '1px solid rgba(10, 37, 64, 0.1)' }}
              >
                <p style={{ fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, color: '#0A2540', marginBottom: '8px' }}>
                  Direct Support
                </p>
                <a
                  href="mailto:support@vibemonitor.ai"
                  style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', color: '#4A5568', textDecoration: 'none' }}
                  className="hover:underline break-all"
                >
                  support@vibemonitor.ai
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="p-5 sm:p-8 rounded-2xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(10, 37, 64, 0.1)',
                  boxShadow: '0 25px 80px rgba(10, 37, 64, 0.08)',
                }}
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0A2540' }} />
                  <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 24px)', fontWeight: 700, color: '#0A2540' }}>
                    Get in Touch
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      style={{ fontSize: '14px', fontWeight: 600, color: '#1D1C1D', display: 'block', marginBottom: '8px' }}
                    >
                      Your Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                      style={{
                        border: '1px solid #E0E0E0',
                        fontSize: '15px',
                        color: '#1D1C1D',
                        outline: 'none',
                      }}
                      placeholder="John Doe"
                      onFocus={(e) => e.target.style.borderColor = '#0A2540'}
                      onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{ fontSize: '14px', fontWeight: 600, color: '#1D1C1D', display: 'block', marginBottom: '8px' }}
                    >
                      Work Email <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                      style={{
                        border: '1px solid #E0E0E0',
                        fontSize: '15px',
                        color: '#1D1C1D',
                        outline: 'none',
                      }}
                      placeholder="john@company.com"
                      onFocus={(e) => e.target.style.borderColor = '#0A2540'}
                      onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                    />
                  </div>

                  {/* Interest Dropdown */}
                  <div>
                    <label
                      htmlFor="interest"
                      style={{ fontSize: '14px', fontWeight: 600, color: '#1D1C1D', display: 'block', marginBottom: '8px' }}
                    >
                      What are you interested in? <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                      style={{
                        border: '1px solid #E0E0E0',
                        fontSize: '15px',
                        color: formData.interest ? '#1D1C1D' : '#616061',
                        outline: 'none',
                        background: '#ffffff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0A2540'}
                      onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                    >
                      <option value="">Select an option</option>
                      <option value="demo">Seeing a demo</option>
                      <option value="pricing">Pricing</option>
                      <option value="product">General product overview</option>
                      <option value="sales">Speak to sales</option>
                      <option value="tech-partner">Partnering on technology</option>
                      <option value="gtm-partner">Partnering on GTM</option>
                      <option value="press">Analyst or Press</option>
                      <option value="integration">Custom Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        background: 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.2)',
                      }}
                    >
                      <p style={{ fontSize: '14px', color: '#DC2626', margin: 0 }}>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,37,64,0.3)]"
                    style={{
                      background: isSubmitting ? '#4A5568' : '#0A2540',
                      color: '#ffffff',
                      fontSize: '16px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
     
    </>
  );
}
