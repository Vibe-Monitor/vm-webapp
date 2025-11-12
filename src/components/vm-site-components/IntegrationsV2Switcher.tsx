'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { IntegrationsV2Option1 } from './IntegrationsV2Option1';
import { IntegrationsV2Option2 } from './IntegrationsV2Option2';
import { IntegrationsV2Option3 } from './IntegrationsV2Option3';
import { IntegrationsV2Option4 } from './IntegrationsV2Option4';
import { IntegrationsV2Option5 } from './IntegrationsV2Option5';
import { Layers } from 'lucide-react';

export function IntegrationsV2Switcher() {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3 | 4 | 5>(1);

  const options = [
    {
      id: 1 as const,
      name: 'Minimal Cards',
      description: 'Simple, clean card layout',
      component: IntegrationsV2Option1,
    },
    {
      id: 2 as const,
      name: 'Before/After',
      description: 'Side-by-side comparison',
      component: IntegrationsV2Option2,
    },
    {
      id: 3 as const,
      name: 'Flow Diagram',
      description: 'Visual workflow',
      component: IntegrationsV2Option3,
    },
    {
      id: 4 as const,
      name: 'Feature List',
      description: 'Compact list format',
      component: IntegrationsV2Option4,
    },
    {
      id: 5 as const,
      name: 'Screenshot',
      description: 'Product mockup style',
      component: IntegrationsV2Option5,
    },
  ];

  const CurrentComponent = options.find(opt => opt.id === selectedOption)?.component || IntegrationsV2Option1;

  return (
    <div className="relative">
      {/* Fixed Layout Switcher */}
      <div className="fixed top-24 right-8 z-50">
        <div 
          className="glass p-4 rounded-xl"
          style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(98, 102, 250, 0.3)',
            maxWidth: '220px',
          }}
        >
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#2F4257]">
            <Layers className="w-4 h-4 text-[#FFD11B]" />
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Integrations
            </p>
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className="w-full text-left rounded-lg p-2.5 transition-all"
                style={{
                  background: selectedOption === option.id ? 'rgba(98, 102, 250, 0.15)' : 'transparent',
                  border: selectedOption === option.id ? '1px solid rgba(98, 102, 250, 0.4)' : '1px solid transparent',
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
                    {option.name}
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
