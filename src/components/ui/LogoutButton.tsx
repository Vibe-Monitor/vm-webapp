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
      className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:opacity-90 group bg-primary text-primary-foreground shadow-md"
    >
      <span className="text-xs sm:text-sm font-medium">
        Logout
      </span>
      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </motion.button>
  );
}
