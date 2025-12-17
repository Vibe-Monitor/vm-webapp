'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { tokenService } from '@/services/tokenService';
import { LayoutDashboard, UserPlus } from 'lucide-react';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(tokenService.hasValidToken());
    }, []);

    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 shadow-sm">
            <div className="flex items-center justify-between px-10 py-3">
                <Link href="/" className="flex items-center" aria-label="VibeMonitor Home">
                    <Image src="/images/VM_full.svg" alt="VibeMonitor" width={100} height={50} className="h-3 w-auto" style={{ objectFit: 'contain' }} />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                     <Link
                        href="#video-showcase"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        Benefits
                    </Link>
                    <Link
                        href="#integrations"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        Features
                    </Link>
                   
                    <Link
                        href="#final-cta-video"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        How it Works
                    </Link>
                </nav>

                <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href={isLoggedIn ? "/setup" : "/auth"}
                        className="rounded-full px-4 py-2 text-sm font-medium shadow transition-colors flex items-center gap-2"
                        style={{
                            backgroundColor: '#0A2540',
                        }}
                    >
                        {isLoggedIn ? (
                            <>
                                <LayoutDashboard className="w-4 h-4" style={{ color: '#ffffff' }} />
                                <span style={{ color: '#ffffff' }}>Dashboard</span>
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4" style={{ color: '#ffffff' }} />
                                <span style={{ color: '#ffffff' }}>Sign Up</span>
                            </>
                        )}
                    </Link>
                </motion.div>
            </div>

        </header>
    );
};

export default Header;
