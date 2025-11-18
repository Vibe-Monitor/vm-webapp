'use client';

import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { VibemonitorLogo } from './VibemonitorLogo';
import { GrafanaLogo } from './GrafanaLogo';
import { GithubLogo } from './GithubLogo';
import { SlackLogo } from './SlackLogo';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';

// OPTION 1: Clean Minimal Cards
// Shows Vibemonitor integrating with each tool

export function IntegrationsV2Option1() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleIntegrationClick = (integrationName: string) => {
    trackInteraction(`integration_${integrationName.toLowerCase()}_card_clicked`, {
      integration_name: integrationName,
      section: 'integrations'
    });

    posthog.capture(`integration_${integrationName.toLowerCase()}_card_clicked`, {
      integration_name: integrationName,
      page_section: 'integrations',
      interaction_type: 'card_click'
    });
  };

  const integrations = [
    {
      logo: GrafanaLogo,
      name: 'Grafana',
      description: 'Analyzes logs and metrics. Get insights—not just thread dumps',
      color: '#F59E0B',
      stat: 'Symptom → Insight in 2.3s',
    },
    {
      logo: GithubLogo,
      name: 'GitHub',
      description: 'Maps Repos into Graphs. Finds breaking change across services.',
      color: '#E5E7EB',
      stat: 'Instant fix ready',
    },
    {
      logo: SlackLogo,
      name: 'Slack',
      description: 'Instant answers in a multi-turn conversation, all within slack.',
      color: '#6266FA',
      stat: 'No dashboard hopping',
    },
  ];

  return (
    <section data-section-name="integrations" className="relative py-32 px-8 overflow-hidden">
      {/* Animated Background - matching other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(98, 102, 250, 0.12) 0%, transparent 70%)',
            top: '20%',
            left: '-200px',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 207, 0, 0.1) 0%, transparent 70%)',
            bottom: '20%',
            right: '-150px',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
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
        {/* Header with badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div
              className="px-5 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(98, 102, 250, 0.2) 0%, rgba(157, 126, 255, 0.2) 100%)',
                border: '1px solid rgba(98, 102, 250, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(98, 102, 250, 0.3)'
              }}
            >
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6266FA 0%, #9D7EFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.5px'
              }}>
                🔌 INTEGRATIONS
              </span>
            </div>
          </motion.div>
          
          <h2 
            className="mb-6"
            style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(36px, 6vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#E5E7EB',
            }}
          >
            Plugs into{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #6266FA 0%, #A38BF4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              your world
            </span>
          </h2>
          
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 18px)', 
            color: '#95A3B2',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Built to fit the tools already in your workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {integrations.map((item, index) => {
            const Logo = item.logo;
            const isHovered = hoveredCard === index;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleIntegrationClick(item.name)}
                className="glass p-8 text-center relative overflow-hidden cursor-pointer"
                whileHover={{ y: -4 }}
                style={{
                  transition: 'all 0.3s ease',
                  borderColor: isHovered ? `${item.color}60` : '#2F4257',
                }}
              >
                {/* Subtle gradient on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${item.color}08, transparent 70%)`,
                  }}
                />

                {/* Integration Visual: Product + Vibemonitor */}
                <div className="flex items-center justify-center gap-3 mb-6 relative">
                  {/* Product Logo */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center relative z-10"
                    style={{
                      background: item.name === 'Slack' ? '#FFFFFF' : `${item.color}15`,
                      border: `2px solid ${item.color}40`,
                    
                      
                    }}
                    animate={{
                      borderColor: isHovered ? `${item.color}80` : `${item.color}40`,
                    }}
                  >
                  <Logo size={28} />
                  </motion.div>

                  {/* Plus Sign */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? 90 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Plus className="w-4 h-4 text-[#98A3B1]" />
                  </motion.div>

                  {/* Vibemonitor Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center relative z-10"
                    style={{
                      background: 'rgba(15, 24, 40, 0.8)',
                      border: '2px solid #4D53B9',
                      boxShadow: isHovered ? '0 8px 20px rgba(77, 83, 185, 0.4)' : '0 4px 12px rgba(77, 83, 185, 0.2)',
                    }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <VibemonitorLogo size={28} />
                  </motion.div>

                  {/* Connection line on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-24 h-0.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 0.3 }}
                      style={{ background: item.color }}
                    />
                  )}
                </div>
                
                <motion.h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: '#E5E7EB', 
                    marginBottom: '8px',
                  }}
                  animate={{
                    color: isHovered ? item.color : '#E5E7EB',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.h3>
                
                <p style={{ fontSize: '14px', color: '#98A3B1', marginBottom: '16px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                
                <motion.div
                  className="inline-block px-4 py-2 rounded-lg"
                  style={{ 
                    background: `${item.color}10`, 
                    border: `1px solid ${item.color}30`,
                  }}
                  animate={{
                    background: isHovered ? `${item.color}20` : `${item.color}10`,
                    borderColor: isHovered ? `${item.color}60` : `${item.color}30`,
                  }}
                >
                  <p style={{ fontSize: '12px', color: item.color, fontWeight: 600 }}>
                    {item.stat}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(98, 102, 250, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ fontSize: '14px', color: '#95A3B2' }}>
              Upcoming Integrations:
            </span>
            <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 600 }}>
              AWS Cloudwatch • Splunk • MS Teams • and more
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}