'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { tokenService } from '@/services/tokenService';
import { LayoutDashboard, UserPlus, Mail, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoggedIn(tokenService.hasValidToken());
    }, []);

    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
                <Link href="/" className="flex items-center" aria-label="VibeMonitor Home">
                    <Image src="/images/VM_full.svg" alt="VibeMonitor" width={100} height={50} className="h-3 w-auto" style={{ objectFit: 'contain' }} />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                     <Link
                        href="/#benefits"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        Benefits
                    </Link>
                    <Link
                        href="/#features"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        Features
                    </Link>

                    <Link
                        href="/#how-it-works"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: '#454545' }}
                    >
                        How it Works
                    </Link>
                </nav>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">
                    <Link
                        href="/contact"
                        className="rounded-full px-4 py-2 text-sm font-medium shadow transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(10,37,64,0.4)]"
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #0A2540',
                        }}
                    >
                        <Mail className="w-4 h-4" style={{ color: '#0A2540' }} />
                        <span style={{ color: '#0A2540' }}>Contact</span>
                    </Link>

                    <Link
                        href={isLoggedIn ? "/setup" : "/auth"}
                        className="rounded-full px-4 py-2 text-sm font-medium shadow transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(10,37,64,0.6)]"
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
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" style={{ color: '#0A2540' }} />
                    ) : (
                        <Menu className="w-6 h-6" style={{ color: '#0A2540' }} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
                    <nav className="flex flex-col px-4 py-4 space-y-3">
                        <Link
                            href="/#benefits"
                            className="text-sm font-medium transition-colors hover:text-gray-900 py-2"
                            style={{ color: '#454545' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Benefits
                        </Link>
                        <Link
                            href="/#features"
                            className="text-sm font-medium transition-colors hover:text-gray-900 py-2"
                            style={{ color: '#454545' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="text-sm font-medium transition-colors hover:text-gray-900 py-2"
                            style={{ color: '#454545' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            How it Works
                        </Link>
                        <div className="pt-3 space-y-2 border-t border-gray-200">
                            <Link
                                href="/contact"
                                className="rounded-full px-4 py-2.5 text-sm font-medium shadow transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(10,37,64,0.4)]"
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #0A2540',
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Mail className="w-4 h-4" style={{ color: '#0A2540' }} />
                                <span style={{ color: '#0A2540' }}>Contact</span>
                            </Link>
                            <Link
                                href={isLoggedIn ? "/setup" : "/auth"}
                                className="rounded-full px-4 py-2.5 text-sm font-medium shadow transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(10,37,64,0.6)]"
                                style={{
                                    backgroundColor: '#0A2540',
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
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
                        </div>
                    </nav>
                </div>
            )}

        </header>
    );
};

export default Header;
