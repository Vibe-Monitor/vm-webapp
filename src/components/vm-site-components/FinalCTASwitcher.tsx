'use client';

import { useState } from 'react';
import { FinalCTAOption1 } from './FinalCTAOption1';
import { FinalCTAOption2 } from './FinalCTAOption2';
import { FinalCTAOption3 } from './FinalCTAOption3';
import { FinalCTAOption4 } from './FinalCTAOption4';
import { FinalCTAOption5 } from './FinalCTAOption5';

export function FinalCTASwitcher() {
  const [selectedOption, setSelectedOption] = useState(1);

  const options = [
    { id: 1, name: 'Split Screen Dramatic', component: FinalCTAOption1 },
    { id: 2, name: 'Centered Minimal Orb', component: FinalCTAOption2 },
    { id: 3, name: 'Diagonal Slash Design', component: FinalCTAOption3 },
    { id: 4, name: '3D Floating Island', component: FinalCTAOption4 },
    { id: 5, name: 'Gradient Mesh', component: FinalCTAOption5 },
  ];

  const SelectedComponent = options.find(opt => opt.id === selectedOption)?.component || FinalCTAOption1;

  return (
    <div>
      {/* Floating Switcher */}
      <div 
        className="fixed top-20 right-4 z-50 p-4 rounded-xl backdrop-blur-md"
        style={{
          background: 'rgba(30, 41, 59, 0.9)',
          border: '1px solid rgba(98, 102, 250, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#95A3B2', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Final CTA Options
        </p>
        <div className="space-y-2">
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className="w-full text-left px-3 py-2 rounded-lg transition-all"
              style={{
                background: selectedOption === option.id ? '#6266FA' : 'transparent',
                color: selectedOption === option.id ? '#fff' : '#95A3B2',
                fontSize: '13px',
                fontWeight: selectedOption === option.id ? 600 : 400,
                border: selectedOption === option.id ? 'none' : '1px solid transparent',
              }}
            >
              {option.id}. {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Component */}
      <SelectedComponent />
    </div>
  );
}
