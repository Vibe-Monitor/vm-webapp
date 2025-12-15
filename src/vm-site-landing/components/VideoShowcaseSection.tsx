'use client';

import { motion } from 'motion/react';
import { CheckCircle2, Send, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GithubLogo } from '@/components/vm-site-components/GithubLogo';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';
import Image from 'next/image';

export function VideoShowcaseSection() {
  const [stage, setStage] = useState<'channel-view' | 'thread-sent' | 'thread-ack' | 'thread-investigating' | 'thread-complete'>('channel-view');
  const [investigationStep, setInvestigationStep] = useState(0);
  const [completeSection, setCompleteSection] = useState(0);

  const handleClick = () => {
    if (stage === 'channel-view') {
      trackInteraction('ai_demo_send_button_clicked', {
        demo_type: 'slack_ai_investigation',
        action: 'start'
      });

      posthog.capture('interactive_demo_started', {
        demo_name: 'slack_ai_investigation',
        page_section: 'video-showcase',
        interaction_method: 'send_button_click'
      });

      setStage('thread-sent');
      setTimeout(() => setStage('thread-ack'), 500);
      setTimeout(() => {
        setStage('thread-investigating');
        setInvestigationStep(0);
      }, 1500);
    } else if (stage === 'thread-complete') {
      trackInteraction('ai_demo_reset_clicked', {
        demo_type: 'slack_ai_investigation'
      });

      setStage('channel-view');
      setInvestigationStep(0);
      setCompleteSection(0);
    }
  };

  // Progressive investigation steps
  useEffect(() => {
    if (stage === 'thread-investigating') {
      const steps = [0, 1, 2, 3, 4, 5, 6, 7];
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setInvestigationStep(currentStep);
        } else {
          clearInterval(interval);
          setTimeout(() => setStage('thread-complete'), 400);
        }
      }, 450);

      return () => clearInterval(interval);
    }
  }, [stage]);

  // Progressive reveal of complete response sections
  useEffect(() => {
    if (stage === 'thread-complete') {
      setCompleteSection(1);
      let currentSection = 1;

      const interval = setInterval(() => {
        currentSection++;
        if (currentSection <= 6) {
          setCompleteSection(currentSection);
        } else {
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div
      id="video-showcase"
      data-section-name="video-showcase"
      className="relative w-full min-h-screen py-24 px-6 overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      }}
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0"
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
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(10, 37, 64, 0.06) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Header */}
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
                background: 'rgba(10, 37, 64, 0.06)',
                border: '1px solid rgba(10, 37, 64, 0.12)',
              }}
            >
              <Clock className="w-4 h-4" style={{ color: '#0A2540' }} />
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0A2540',
                letterSpacing: '0.5px'
              }}>
                Live in Slack
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
            Minutes to root cause.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #0A2540 0%, #4A5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Watch it happen.
            </span>
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#4A5568',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}>
            Watch a real production error get caught, diagnosed, and solved—faster than you can read this sentence
          </p>
        </motion.div>

        {/* Slack Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(10, 37, 64, 0.1)',
              boxShadow: '0 25px 80px rgba(10, 37, 64, 0.12), 0 10px 30px rgba(10, 37, 64, 0.08)'
            }}
          >
            {/* Slack Header */}
            <div style={{
              background: '#F8F8F8',
              padding: '10px 16px',
              borderBottom: '1px solid #E0E0E0'
            }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <div style={{ fontSize: '18px' }}>🎯</div>
                  <span style={{ fontSize: '15px', color: '#1D1C1D', fontWeight: 700 }}>
                    prod-alerts
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '500px',
              position: 'relative'
            }}>
              {/* Messages Area */}
              <div style={{
                flex: 1,
                padding: '24px 32px',
                overflowY: 'auto',
                paddingBottom: stage === 'channel-view' ? '100px' : '120px'
              }}>
                {/* CHANNEL VIEW: Show initial error alert */}
                {stage === 'channel-view' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Instructional hint */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center pb-4"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                        style={{
                          background: 'rgba(10, 37, 64, 0.08)',
                          border: '1px solid rgba(10, 37, 64, 0.15)',
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-[#0A2540]" />
                        <span style={{ fontSize: '13px', color: '#0A2540', fontWeight: 600 }}>
                          Click Send to reply in thread and see the magic
                        </span>
                      </div>
                    </motion.div>

                    {/* Initial Error Alert from GitHub */}
                    <div className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: '#24292F' }}
                      >
                        <GithubLogo size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontSize: '15px', fontWeight: 900, color: '#1D1C1D' }}>GitHub</span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#616061',
                            background: 'rgba(0, 0, 0, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                          }}>APP</span>
                          <span style={{ color: '#616061', fontSize: '13px' }}>3:41 PM</span>
                        </div>

                        {/* Error Alert - Slack authentic style */}
                        <div
                          className="rounded p-3 mb-1"
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                          }}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-1 h-1 rounded-full bg-[#DC2626] mt-1.5" />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#DC2626' }}>
                              Deployment Failed
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p style={{ fontSize: '13px', color: '#1D1C1D', lineHeight: '1.5' }}>
                              <strong>Production deployment failing</strong> - Ticket service degraded
                            </p>
                            <p style={{ fontSize: '13px', color: '#616061', lineHeight: '1.5' }}>
                              marketplace-service build passing, but production showing: <code style={{
                                background: 'rgba(0, 0, 0, 0.08)',
                                padding: '2px 4px',
                                borderRadius: '3px',
                                fontFamily: 'Monaco, monospace',
                                fontSize: '12px',
                                color: '#1D1C1D'
                              }}>405 Method Not Allowed</code>
                            </p>
                            <p style={{ fontSize: '12px', color: '#616061' }}>
                              Users unable to create/view tickets since 01:58 AM
                            </p>
                          </div>
                        </div>

                        {/* Thread indicator - Slack style */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex -space-x-1">
                            <div className="w-6 h-6 rounded flex items-center justify-center ring-2 ring-white" style={{ background: '#007A5A' }}>
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff' }}>JD</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '13px', color: '#1264A3', fontWeight: 400, cursor: 'pointer' }}>
                            1 reply
                          </span>
                          <span style={{ fontSize: '13px', color: '#616061' }}>Last reply 3:42 PM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* THREAD VIEW: User message + Bot response */}
                {(stage === 'thread-sent' || stage === 'thread-ack' || stage === 'thread-investigating' || stage === 'thread-complete') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Thread Header */}
                    <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: '#1D1C1D' }}>Thread</span>
                    </div>

                    {/* Original Error Alert (in thread) - GitHub */}
                    <div className="flex gap-3 opacity-90">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: '#24292F' }}
                      >
                        <GithubLogo size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontSize: '15px', fontWeight: 900, color: '#1D1C1D' }}>GitHub</span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#616061',
                            background: 'rgba(0, 0, 0, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                          }}>APP</span>
                          <span style={{ color: '#616061', fontSize: '13px' }}>3:41 PM</span>
                        </div>
                        <div
                          className="rounded p-3"
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                          }}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-1 h-1 rounded-full bg-[#DC2626] mt-1.5" />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#DC2626' }}>
                              Deployment Failed
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p style={{ fontSize: '13px', color: '#1D1C1D', lineHeight: '1.5' }}>
                              <strong>Production deployment failing</strong> - Ticket service degraded
                            </p>
                            <p style={{ fontSize: '13px', color: '#616061', lineHeight: '1.5' }}>
                              marketplace-service build passing, but production showing: <code style={{
                                background: 'rgba(0, 0, 0, 0.08)',
                                padding: '2px 4px',
                                borderRadius: '3px',
                                fontFamily: 'Monaco, monospace',
                                fontSize: '12px',
                                color: '#1D1C1D'
                              }}>405 Method Not Allowed</code>
                            </p>
                            <p style={{ fontSize: '12px', color: '#616061' }}>
                              Users unable to create/view tickets since 01:58 AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User's reply - Slack style */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#007A5A' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>JD</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '15px', color: '#1D1C1D', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 900 }}>John Doe</span>{' '}
                          <span style={{ color: '#616061', fontSize: '12px', fontWeight: 400 }}>3:42 PM</span>
                        </p>
                        <p style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.5' }}>
                          Hey <span style={{ color: '#1264A3', fontWeight: 600 }}>@vibemonitor-bot</span>, why are my customers facing issues creating/viewing tickets?
                        </p>
                      </div>
                    </motion.div>

                    {/* Bot acknowledging - with Vibemonitor logo */}
                    {(stage === 'thread-ack' || stage === 'thread-investigating') && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image src="/images/VibeMonitor1.png" alt="Vibemonitor" width={36} height={36} className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ fontSize: '15px', fontWeight: 900, color: '#1D1C1D' }}>
                              Vibemonitor
                            </span>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#616061',
                                background: 'rgba(0, 0, 0, 0.1)',
                                padding: '2px 6px',
                                borderRadius: '3px',
                              }}
                            >
                              APP
                            </span>
                            <span style={{ color: '#616061', fontSize: '12px', fontWeight: 400 }}>3:42 PM</span>
                            {stage === 'thread-ack' && (
                              <span style={{ fontSize: '12px', color: '#616061', fontStyle: 'italic', marginLeft: '2px' }}>
                                is typing...
                              </span>
                            )}
                          </div>

                          {/* Investigation Card - Slack style with light background */}
                          <div
                            className="rounded p-3"
                            style={{
                              background: '#F8F8F8',
                              border: '1px solid #E0E0E0',
                            }}
                          >
                            {/* Acknowledgment */}
                            <div className="mb-3">
                              <p style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.5', marginBottom: '6px' }}>
                                🔍 <strong>Got it! I'm analyzing:</strong>{' '}
                                <span style={{ fontStyle: 'italic', color: '#616061' }}>"why are customers unable to create/view tickets"</span>
                              </p>
                              <p style={{ fontSize: '13px', color: '#616061', lineHeight: '1.5' }}>
                                This may take a moment while I investigate code, logs, and metrics.
                              </p>
                            </div>

                            {/* Investigation steps appear progressively */}
                            {stage === 'thread-investigating' && (
                              <div className="border-t pt-3" style={{ borderColor: '#E0E0E0' }}>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: '#0A2540', marginBottom: '10px' }}>
                                  📊 The Investigation (Real-Time)
                                </p>
                                <div className="space-y-2">
                                  {investigationStep >= 1 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Mapping GitHub repos with linked Grafana services
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 2 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Correlating desk-service, marketplace-service, and auth-service
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 3 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Reviewing desk-service logs showing 405 errors
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 4 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Tracing marketplace-service → auth-service requests returning 405
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 5 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Checking auth-service and verifying method contracts
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 6 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', color: '#1D1C1D' }}>
                                        Scanning recent commits in marketplace-service for method changes
                                      </span>
                                    </motion.div>
                                  )}
                                  {investigationStep >= 7 && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <Sparkles className="w-4 h-4 text-[#0A2540] flex-shrink-0" />
                                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A2540' }}>
                                        Investigation complete
                                      </span>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Bot's complete RCA response - Authentic design */}
                    {stage === 'thread-complete' && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image src="/images/VibeMonitor1.png" alt="Vibemonitor" width={36} height={36} className="object-cover" />
                        </div>
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ fontSize: '15px', fontWeight: 900, color: '#1D1C1D' }}>
                              Vibemonitor
                            </span>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#616061',
                                background: 'rgba(0, 0, 0, 0.1)',
                                padding: '2px 6px',
                                borderRadius: '3px',
                              }}
                            >
                              APP
                            </span>
                            <span style={{ color: '#616061', fontSize: '12px', fontWeight: 400 }}>Yesterday at 3:40 PM</span>
                          </div>

                          {/* Message content */}
                          {(completeSection >= 1) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668', marginBottom: '8px' }}>
                                🔍 Got it! I'm analyzing: <strong>"Why can't my users create tickets?"</strong>
                              </div>
                              <div style={{ fontSize: '15px', color: '#616061', lineHeight: '1.46668', marginBottom: '12px' }}>
                                This may take a moment while I investigate code, logs and metrics. I'll reply here once I have the analysis ready.
                              </div>
                            </motion.div>
                          ) : null}

                          {/* Investigation checklist */}
                          {(completeSection >= 2) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-1 mb-4"
                            >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Mapping GitHub repos with linked Grafana services{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Correlating{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>desk-service</code>
                                ,{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>
                                , and{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>auth-service</code>{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Reviewing{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>desk-service</code>{' '}
                                logs showing{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405 s</code>{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Tracing{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>
                                {' → '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>auth-service</code>{' '}
                                requests returning{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405</code>{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Checking{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>auth-service</code>
                                {' '}/ verifying method contract{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Scanning recent commits in{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>{' '}
                                for method changes{' '}
                                <span style={{ color: '#616061', fontSize: '13px' }}>(edited)</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                              <span style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                                Investigation complete
                              </span>
                            </div>
                            </motion.div>
                          ) : null}

                          {/* What's going on */}
                          {(completeSection >= 3) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ marginBottom: '16px' }}
                            >
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1D1C1D', marginBottom: '4px' }}>
                              What's going on
                            </p>
                            <p style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                              Users are unable to create/view tickets in Desk. Requests from{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>desk-service</code>
                              {' '}to{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>
                              {' '}are failing with{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405 Method Not Allowed</code>
                              , confirmed across multiple pods since 01:58 AM{' '}
                              <a href="#" style={{ color: '#1264A3', textDecoration: 'none' }}>[1]</a>.
                            </p>
                            </motion.div>
                          ) : null}

                          {/* Root cause */}
                          {(completeSection >= 4) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ marginBottom: '16px' }}
                            >
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1D1C1D', marginBottom: '4px' }}>
                              Root cause
                            </p>
                            <p style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668' }}>
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>
                              {' '}is calling{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>auth-service</code>
                              {' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>/verify</code>
                              {' '}with{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>GET</code>
                              , while{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>auth-service</code>
                              {' '}only accepts{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>POST</code>
                              . A recent change in{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>
                              {' '}(commit{' '}
                              <a href="https://github.com/Vibe-Monitor/marketplace/commit/da3c6383" target="_blank" rel="noopener noreferrer" style={{ color: '#1264A3', textDecoration: 'none' }}>da3c6383</a>
                              ) switched the method{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>POST</code>
                              {' → '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>GET</code>
                              , producing{' '}
                              <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405 s</code>
                              {' '}during token verification{' '}
                              <a href="#" style={{ color: '#1264A3', textDecoration: 'none' }}>[2]</a>
                              {' '}
                              <a href="#" style={{ color: '#1264A3', textDecoration: 'none' }}>[3]</a>.
                            </p>
                            </motion.div>
                          ) : null}

                          {/* Next steps */}
                          {(completeSection >= 5) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ marginBottom: '16px' }}
                            >
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1D1C1D', marginBottom: '4px' }}>
                              Next steps
                            </p>
                            <ul style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668', paddingLeft: '20px', margin: 0, listStyle: 'disc' }}>
                              <li>
                                Change request method back to{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>POST</code>
                                {' '}in{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace/main.py</code>
                                {' '}(around line 123) and deploy{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>marketplace-service</code>.
                              </li>
                              <li>Run smoke tests for Desk → Marketplace → Auth ticket flows.</li>
                              <li>
                                Monitor{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405</code>
                                {' '}rate and Desk ticket success SLO for 30 minutes post-deployment.
                              </li>
                            </ul>
                            </motion.div>
                          ) : null}

                          {/* Prevention */}
                          {(completeSection >= 6) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ marginBottom: '16px' }}
                            >
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1D1C1D', marginBottom: '4px' }}>
                              Prevention
                            </p>
                            <ul style={{ fontSize: '15px', color: '#1D1C1D', lineHeight: '1.46668', paddingLeft: '20px', margin: 0, listStyle: 'disc' }}>
                              <li>
                                Add a contract test enforcing{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>POST</code>
                                {' '}for{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>/verify</code>.
                              </li>
                              <li>Add a synthetic check for Desk ticket creation.</li>
                              <li>
                                Create an alert for spikes in{' '}
                                <code style={{ background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px', fontFamily: 'Monaco, monospace', fontSize: '12px', color: '#DC2626' }}>405 s</code>
                                {' '}between Marketplace ⚡ Auth.
                              </li>
                            </ul>
                            </motion.div>
                          ) : null}

                          {/* CTA Button */}
                          {(completeSection >= 6) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 mt-3"
                              style={{ borderTop: '1px solid #E0E0E0' }}
                            >
                              <motion.a
                                href="/auth"
                                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-md sm:rounded-lg flex-1 sm:flex-initial"
                                style={{
                                  background: '#0A2540',
                                  color: '#ffffff',
                                  fontWeight: 700,
                                  fontSize: 'clamp(11px, 2vw, 13px)',
                                  textDecoration: 'none',
                                  boxShadow: '0 2px 8px rgba(10, 37, 64, 0.3)',
                                  padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)'
                                }}
                                whileHover={{
                                  scale: 1.05,
                                  boxShadow: '0 4px 16px rgba(10, 37, 64, 0.5)'
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                <span>Try Now</span>
                              </motion.a>
                              <motion.button
                                onClick={handleClick}
                                className="inline-flex items-center justify-center rounded-md sm:rounded-lg"
                                style={{
                                  background: 'transparent',
                                  border: '1px solid #E0E0E0',
                                  color: '#616061',
                                  fontWeight: 600,
                                  fontSize: 'clamp(10px, 2vw, 12px)',
                                  cursor: 'pointer',
                                  padding: 'clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 14px)'
                                }}
                                whileHover={{
                                  background: '#F8F8F8',
                                  borderColor: '#CCCCCC',
                                  color: '#1D1C1D'
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Reset Demo
                              </motion.button>
                            </motion.div>
                          ) : null}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Message Input Box (Slack-style at bottom) - Always visible */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stage === 'thread-complete' ? 0.6 : 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px 16px',
                  background: '#FFFFFF',
                  borderTop: '1px solid #E0E0E0',
                }}
              >
                {/* Show different content based on stage */}
                {stage === 'channel-view' ? (
                  <div
                    className="rounded"
                    style={{
                      background: '#F8F8F8',
                      border: '2px solid #0A2540',
                      boxShadow: '0 0 0 1px rgba(10, 37, 64, 0.1)'
                    }}
                  >
                    <div className="p-2">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#007A5A' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>JD</span>
                        </div>
                        <div className="flex-1">
                          <p style={{ fontSize: '13px', color: '#1D1C1D', lineHeight: '1.5' }}>
                            Hey <span style={{ color: '#1264A3', fontWeight: 600 }}>@vibemonitor-bot</span>, why are my customers facing issues creating/viewing tickets?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #E0E0E0' }}>
                        <span style={{ fontSize: '11px', color: '#616061' }}>
                          💬 Reply in thread
                        </span>
                        <motion.button
                          onClick={handleClick}
                          className="relative flex items-center gap-1.5"
                          style={{
                            padding: '8px 18px',
                            background: '#0A2540',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(10, 37, 64, 0.4)'
                          }}
                          animate={{
                            boxShadow: [
                              '0 2px 8px rgba(10, 37, 64, 0.4), 0 0 0 0px rgba(59, 130, 246, 0.5)',
                              '0 4px 24px rgba(10, 37, 64, 0.6), 0 0 0 8px rgba(59, 130, 246, 0.35)',
                              '0 2px 8px rgba(10, 37, 64, 0.4), 0 0 0 0px rgba(59, 130, 246, 0.5)',
                            ],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          whileHover={{
                            scale: 1.08,
                            boxShadow: '0 4px 28px rgba(10, 37, 64, 0.7), 0 0 0 10px rgba(59, 130, 246, 0.45)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="w-4 h-4 text-white" />
                          <span style={{
                            fontWeight: 700,
                            fontSize: '14px',
                            color: '#ffffff',
                          }}>
                            Send
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Thread view with follow-up question */
                  <div
                    className="rounded"
                    style={{
                      background: '#F8F8F8',
                      border: '1px solid #E0E0E0',
                    }}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-[#616061] mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p style={{ fontSize: '13px', color: '#616061', lineHeight: '1.5', marginBottom: '8px' }}>
                            Ask a follow-up question...
                          </p>
                          <div
                            className="rounded p-2"
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #E0E0E0',
                            }}
                          >
                            <p style={{ fontSize: '13px', color: '#616061', lineHeight: '1.5', fontStyle: 'italic' }}>
                              "Can you show me the exact code change that caused this?"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoShowcaseSection;
