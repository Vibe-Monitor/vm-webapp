'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { IntegrationsOption1 } from './IntegrationsOption1';
import { IntegrationsOption2 } from './IntegrationsOption2';
import { IntegrationsOption3 } from './IntegrationsOption3';
import { Layers } from 'lucide-react';

export function IntegrationsSwitcher() {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3>(2);

  const options = [
    {
      id: 1 as const,
      name: 'Icon Grid',
      description: 'Visual cards with animations',
      component: IntegrationsOption1,
    },
    {
      id: 2 as const,
      name: 'Bento Hover',
      description: 'Compact with hover reveals (Recommended)',
      component: IntegrationsOption2,
    },
    {
      id: 3 as const,
      name: 'Timeline',
      description: 'Before/after transformation',
      component: IntegrationsOption3,
    },
  ];

  const CurrentComponent = options.find(opt => opt.id === selectedOption)?.component || IntegrationsOption2;

  return (
    <div className="relative">
      {/* Fixed Layout Switcher - Top Right */}
      <div className="fixed top-24 right-8 z-50">
        <div 
          className="glass p-3 rounded-xl"
          style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(98, 102, 250, 0.3)',
          }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#2F4257]">
            <Layers className="w-4 h-4 text-[#FFD11B]" />
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Integrations Layout
            </p>
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className="w-full text-left rounded-lg p-2.5 transition-all"
                style={{
                  background: selectedOption === option.id ? 'rgba(98, 102, 250, 0.2)' : 'transparent',
                  border: selectedOption === option.id ? '1px solid rgba(98, 102, 250, 0.5)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.background = 'rgba(98, 102, 250, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: selectedOption === option.id ? '#6266FA' : 'rgba(98, 102, 250, 0.2)',
                      border: '2px solid',
                      borderColor: selectedOption === option.id ? '#6266FA' : 'rgba(98, 102, 250, 0.3)',
                    }}
                  >
                    {selectedOption === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: selectedOption === option.id ? '#E5E7EB' : '#98A3B1'
                  }}>
                    Option {option.id}
                  </p>
                </div>
                <p style={{
                  fontSize: '10px',
                  color: '#98A3B1',
                  paddingLeft: '29px',
                  lineHeight: 1.3
                }}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#2F4257]">
            <p style={{ fontSize: '9px', color: '#6B7280', textAlign: 'center', lineHeight: 1.4 }}>
              Compare layouts to find best fit
            </p>
          </div>
        </div>
      </div>

      {/* Render Selected Component */}
      <motion.div
        key={selectedOption}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <CurrentComponent />
      </motion.div>
    </div>
  );
}
