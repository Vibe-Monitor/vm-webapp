'use client';

import { motion } from 'motion/react';

export function MinimalFooter() {
  const links = [
    { label: 'Docs', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Privacy', href: '#' },
  ];

  return (
    <footer className="py-12 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Glass Strip */}
        <div
          className="glass px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-6"
          style={{ borderRadius: '16px' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6266FA] to-[#FFD11B] flex items-center justify-center">
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>V</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#E5E7EB' }}>
              Vibemonitor.ai
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                whileHover={{ color: '#6266FA' }}
                style={{ fontSize: '14px', color: '#98A3B1', textDecoration: 'none' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '13px', color: '#98A3B1' }}>
            © 2025 — Errors fixed at light speed ⚡
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
