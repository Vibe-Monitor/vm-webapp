'use client';

import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={logout}
      className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20 flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-200 hover:scale-105 group"
      style={{
        background: 'rgba(41, 67, 89, 0.5)',
        border: '1px solid #294359',
        backdropFilter: 'blur(10px)',
      }}
      title="Logout"
    >
      <span
        className="hidden sm:inline text-xs md:text-sm text-[#E5E7EB]"
        style={{
          lineHeight: '21px',
          letterSpacing: '-0.150391px',
          fontWeight: 500
        }}
      >
        Logout
      </span>
      <LogOut
        className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#FFCF00] transition-transform duration-200 group-hover:translate-x-1"
      />
    </motion.button>
  );
}
