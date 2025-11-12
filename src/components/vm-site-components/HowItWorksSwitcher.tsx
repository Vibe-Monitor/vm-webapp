'use client';

import { useState } from 'react';
import { HowItWorksOption1 } from './HowItWorksOption1';
import { HowItWorksOption2 } from './HowItWorksOption2';
import { HowItWorksOption3 } from './HowItWorksOption3';
import { HowItWorksOption4 } from './HowItWorksOption4';
import { HowItWorksOption5 } from './HowItWorksOption5';
import { HowItWorksOption6 } from './HowItWorksOption6';
import { motion } from 'motion/react';

export function HowItWorksSwitcher() {
  const [activeOption, setActiveOption] = useState<1 | 2 | 3 | 4 | 5 | 6>(4);

  const options = [
    { id: 1 as const, label: 'Timeline', description: 'Horizontal flow' },
    { id: 2 as const, label: 'Expandable', description: 'Click to reveal' },
    { id: 3 as const, label: 'Carousel', description: 'Step through' },
    { id: 4 as const, label: 'Icon Grid', description: 'Hover reveals' },
    { id: 5 as const, label: 'Journey', description: 'Animated path' },
    { id: 6 as const, label: 'Big Numbers', description: 'Micro-interact' },
  ];

  return (
    <div className="relative">
      {/* Floating Switcher */}
      <div className="fixed top-24 right-8 z-50">
        <div
          className="rounded-2xl p-3 shadow-2xl"
          style={{
            background: 'rgba(15, 24, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(98, 102, 250, 0.3)',
          }}
        >
          <p style={{ 
            fontSize: '10px', 
            color: '#95A3B2', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600
          }}>
            How It Works
          </p>
          
          <div className="space-y-2">
            {options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                className="w-full text-left px-3 py-2 rounded-lg"
                style={{
                  background: activeOption === option.id 
                    ? 'linear-gradient(135deg, #6266FA 0%, #8B8EFF 100%)'
                    : 'rgba(30, 41, 59, 0.5)',
                  border: activeOption === option.id 
                    ? '1px solid rgba(98, 102, 250, 0.5)'
                    : '1px solid rgba(98, 102, 250, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p style={{ 
                      fontSize: '12px', 
                      fontWeight: 700,
                      color: activeOption === option.id ? '#fff' : '#E5E7EB',
                      marginBottom: '2px'
                    }}>
                      {option.label}
                    </p>
                    <p style={{ 
                      fontSize: '9px', 
                      color: activeOption === option.id ? '#E5E7EB' : '#95A3B2'
                    }}>
                      {option.description}
                    </p>
                  </div>
                  {activeOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-[#FFCF00]"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Active Option */}
      <motion.div
        key={activeOption}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeOption === 1 && <HowItWorksOption1 />}
        {activeOption === 2 && <HowItWorksOption2 />}
        {activeOption === 3 && <HowItWorksOption3 />}
        {activeOption === 4 && <HowItWorksOption4 />}
        {activeOption === 5 && <HowItWorksOption5 />}
        {activeOption === 6 && <HowItWorksOption6 />}
      </motion.div>
    </div>
  );
}
