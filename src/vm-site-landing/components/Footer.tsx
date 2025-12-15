'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import posthog from 'posthog-js';
import { trackInteraction } from '@/lib/posthog-utils';

const Footer: React.FC = () => {
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
        <footer className="py-8 px-8" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(10, 37, 64, 0.1)' }}>
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
                            src="/images/VM_full.png"
                            alt="Vibemonitor.ai"
                            width={200}
                            height={50}
                            className="h-12 w-auto"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                onClick={() => handleFooterLinkClick(link.label)}
                                style={{ fontSize: '13px', color: '#4A5568', textDecoration: 'none' }}
                                className="hover:text-[#0A2540] transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p style={{ fontSize: '13px', color: '#4A5568' }}>
                        © {new Date().getFullYear()} Vibemonitor.ai
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
