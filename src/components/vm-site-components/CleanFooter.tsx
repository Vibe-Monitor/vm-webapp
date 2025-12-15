'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';

export function CleanFooter() {
  const links = [

    { label: 'Support', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=support@vibemonitor.ai' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },

  ];

  const handleFooterLinkClick = (linkLabel: string) => {
    trackInteraction(`footer_${linkLabel.toLowerCase()}_link_clicked`, {
      link_label: linkLabel,
      section: 'footer'
    });

    posthog.capture(`footer_${linkLabel.toLowerCase()}_link_clicked`, {
      link_label: linkLabel,
      page_section: 'footer',
      interaction_type: 'navigation'
    });
  };

  return (
    <footer className="py-8 px-8" style={{ background: '#1E293B' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/VibeMonitor1.png"
              alt="Vibemonitor.ai"
              width={160}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => handleFooterLinkClick(link.label)}
                style={{ fontSize: '13px', color: '#98A3B1', textDecoration: 'none' }}
                className="hover:text-[#E5E7EB] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '13px', color: '#98A3B1' }}>
            © 2025 Vibemonitor.ai
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
