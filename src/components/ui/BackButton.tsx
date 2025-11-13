'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBack}
      className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 group"
      style={{
        background: 'rgba(41, 67, 89, 0.5)',
        border: '1px solid #294359',
        backdropFilter: 'blur(10px)',
      }}
    >
      <ArrowLeft
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFCF00] transition-transform duration-200 group-hover:-translate-x-1"
      />
      <span
        className="text-xs sm:text-sm text-[#E5E7EB]"
        style={{
          lineHeight: '21px',
          letterSpacing: '-0.150391px',
          fontWeight: 500
        }}
      >
        Back
      </span>
    </motion.button>
  );
}
