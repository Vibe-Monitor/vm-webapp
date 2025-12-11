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
      className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-20 flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-200 hover:scale-105 group"
      style={{
        background: 'rgba(41, 67, 89, 0.5)',
        border: '1px solid #294359',
        backdropFilter: 'blur(10px)',
      }}
      title="Back"
    >
      <ArrowLeft
        className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#FFCF00] transition-transform duration-200 group-hover:-translate-x-1"
      />
      <span
        className="hidden sm:inline text-xs md:text-sm text-[#E5E7EB]"
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
