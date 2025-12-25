'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import '@/vm-site-landing/types/global';

const EnhancedHero: React.FC = () => {
    useEffect(() => {
        
        // Function to load Tally forms
        const loadTallyForms = () => {
            if (typeof window !== 'undefined' && window.Tally) {
                window.Tally.loadEmbeds();
            }
        };
        
        // Try to load immediately if script is already loaded
        loadTallyForms();
        
        // Also try after a short delay to ensure script is loaded
        const timeoutId = setTimeout(() => {
            loadTallyForms();
        }, 1000);
        
        // Listen for script load event
        const handleScriptLoad = () => {
            loadTallyForms();
        };
        
        // Check if script element exists and add listener
        const script = document.querySelector('script[src*="tally.so"]');
        if (script) {
            script.addEventListener('load', handleScriptLoad);
        }
        
        return () => {
            clearTimeout(timeoutId);
            if (script) {
                script.removeEventListener('load', handleScriptLoad);
            }
        };
    }, []);

    return (
        <div
            className="relative w-full"
            style={{
                backgroundColor: '#F3F3F5',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Grid Background - Always visible */}
            <div className="hero-grid-background" style={{ zIndex: 0 }}></div>

            {/* Content */}
            <motion.div
                className="relative px-4 sm:px-6 md:px-8 w-full"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-lg md:max-w-3xl mx-auto leading-tight">
                        <span style={{ color: '#00305f' }}>Debug Faster</span><br />
                        <span style={{ color: '#36454f' }}>Sleep Better</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto px-2" style={{ color: '#36454f' }}>
                        An AI Agent that investigates your code, logs, and metrics<br className="hidden sm:block" /><span className="sm:hidden"> </span>and explains the root cause with clear fixes — <span style={{ color: '#00305f', fontWeight: 600 }}>right in Slack.</span>
                    </p>

                    {/* Contact Button */}
                    <div className="mt-6 mb-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,37,64,0.6)]"
                            style={{
                                backgroundColor: '#0A2540',
                                color: '#ffffff',
                                fontSize: 'clamp(14px, 2.5vw, 16px)',
                                textDecoration: 'none',
                            }}
                        >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#ffffff' }} />
                            <span style={{ color: '#ffffff' }}>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EnhancedHero;