'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OutcomeSection: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-6 text-center">
                <motion.h2 
                    className="text-2xl md:text-4xl font-bold text-foreground mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Observability that builds itself
                </motion.h2>
                <motion.p 
                    className="text-lg md:text-xl text-foreground-accent max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Your codebase gets complete observability coverage without manual setup. 
                    Dashboards, alerts, and service graphs appear automatically as you ship code. 
                    When something breaks, you instantly get the exact change that caused it—and how to fix it.
                </motion.p>
                
                <motion.div 
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Auto</div>
                        <div className="text-foreground-accent">Instrumentation & Setup</div>
                    </motion.div>
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Complete</div>
                        <div className="text-foreground-accent">Coverage</div>
                    </motion.div>
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Instant</div>
                        <div className="text-foreground-accent">Error Resolution</div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default OutcomeSection;