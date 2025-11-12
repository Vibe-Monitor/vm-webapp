'use client';

import { motion } from 'motion/react';

export function FooterSection() {
  return (
    <footer className="py-20 px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent mb-16" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3.5L17.5 10.5H24.5L19.25 15.75L21 24.5L14 19.25L7 24.5L8.75 15.75L3.5 10.5H10.5L14 3.5Z"
                stroke="#6266FA"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <span style={{ fontWeight: 600, fontSize: '18px', color: '#E5E7EB' }}>
              Vibemonitor.ai
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-10">
            <a
              href="#"
              className="hover:text-[#6266FA] transition-colors"
              style={{ fontSize: '15px', color: '#98A3B1' }}
            >
              Docs
            </a>
            <a
              href="#"
              className="hover:text-[#6266FA] transition-colors"
              style={{ fontSize: '15px', color: '#98A3B1' }}
            >
              Pricing
            </a>
            <a
              href="#"
              className="hover:text-[#6266FA] transition-colors"
              style={{ fontSize: '15px', color: '#98A3B1' }}
            >
              Support
            </a>
            <a
              href="#"
              className="hover:text-[#6266FA] transition-colors"
              style={{ fontSize: '15px', color: '#98A3B1' }}
            >
              Privacy
            </a>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '14px', color: '#98A3B1' }}>
            © 2025 Vibemonitor.ai
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p style={{ fontSize: '13px', color: '#98A3B1', opacity: 0.7, fontStyle: 'italic' }}>
            Errors caught. Teams happy.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
