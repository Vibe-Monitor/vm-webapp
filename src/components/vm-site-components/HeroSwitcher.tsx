'use client';

import { useState } from 'react';
import { HeroOption1 } from './HeroOption1';
import { HeroOption2 } from './HeroOption2';
import { HeroOption3 } from './HeroOption3';
import { HeroOption4 } from './HeroOption4';
import { HeroOption5 } from './HeroOption5';
import { motion, AnimatePresence } from 'motion/react';

export function HeroSwitcher() {
  const [activeOption, setActiveOption] = useState(1);

  const options = [
    { id: 1, name: 'Bold Power', component: HeroOption1, desc: 'Gradient punch with floating code' },
    { id: 2, name: 'Minimal Zen', component: HeroOption2, desc: 'Clean elegance with subtle motion' },
    { id: 3, name: 'Dynamic Split', component: HeroOption3, desc: 'Split layout with terminal preview' },
    { id: 4, name: 'Feature Grid', component: HeroOption4, desc: 'Stats-driven with feature cards' },
    { id: 5, name: 'Premium Centered', component: HeroOption5, desc: 'Luxury feel with trust badges' },
  ];

  const ActiveComponent = options.find(opt => opt.id === activeOption)?.component || HeroOption1;

  return (
    <div className="relative">
      {/* Switcher Controls - Fixed at top */}
      <div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-2xl backdrop-blur-xl"
        style={{
          background: 'rgba(15, 24, 40, 0.9)',
          border: '1px solid rgba(98, 102, 250, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            style={{
              padding: '10px 20px',
              background: activeOption === option.id 
                ? 'linear-gradient(135deg, #6266FA, #5558E3)' 
                : 'transparent',
              border: activeOption === option.id 
                ? 'none' 
                : '1px solid rgba(98, 102, 250, 0.2)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {activeOption === option.id && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 -z-10"
                style={{
                  background: 'linear-gradient(135deg, #6266FA, #5558E3)',
                  borderRadius: '12px',
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <div className="relative z-10">
              <div 
                style={{ 
                  fontSize: '13px', 
                  fontWeight: 600,
                  color: activeOption === option.id ? '#FFFFFF' : '#95A3B2',
                  marginBottom: '2px',
                  transition: 'color 0.2s ease'
                }}
              >
                {option.name}
              </div>
              <div 
                style={{ 
                  fontSize: '10px',
                  color: activeOption === option.id ? 'rgba(255, 255, 255, 0.7)' : '#6B7280',
                  transition: 'color 0.2s ease'
                }}
              >
                {option.desc}
              </div>
            </div>

            {/* Hover glow */}
            {activeOption !== option.id && (
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                  background: 'rgba(98, 102, 250, 0.05)',
                  borderRadius: '12px',
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Hero Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      {/* Option Indicator */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-2 rounded-full backdrop-blur-xl"
        style={{
          background: 'rgba(15, 24, 40, 0.8)',
          border: '1px solid rgba(98, 102, 250, 0.2)',
        }}
      >
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className="relative"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeOption === option.id ? '#6266FA' : 'rgba(98, 102, 250, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: activeOption === option.id ? 'scale(1.3)' : 'scale(1)'
            }}
          >
            {activeOption === option.id && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: '#6266FA' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
