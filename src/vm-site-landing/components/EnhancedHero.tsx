'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
                className="relative px-6 sm:px-8 md:px-5 w-full"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl md:leading-tight font-bold max-w-lg md:max-w-3xl mx-auto" style={{ color: '#171717' }}>
                        Root Cause Analysis, Powered by AI
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: '#454545' }}>
                        Correlates logs, metrics, traces, code and deployments to pinpoint root cause.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default EnhancedHero;