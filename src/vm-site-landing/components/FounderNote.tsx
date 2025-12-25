'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa6';

const FounderNote: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-6">
                <motion.div 
                    className="bg-gray-50 rounded-xl p-8 md:p-12 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4">
                            <Image 
                                src="/images/ankesh.png"
                                alt="Ankesh Khemani, Founder of VibeMonitor"
                                width={64}
                                height={64}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>
                    
                    <motion.blockquote 
                        className="text-lg md:text-xl text-foreground leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        &ldquo;I&apos;m Ankesh, ex-Atlassian engineer who spent too many weekends fixing bugs that could have been caught and explained in minutes. 
                        VibeMonitor is built for small teams who want to spend time building features, not firefighting production issues.&rdquo;
                    </motion.blockquote>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-foreground-accent">
                            <strong>Ankesh Khemani</strong><br />
                            Founder, VibeMonitor
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.linkedin.com/in/ankeshkhemani/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Connect with Ankesh on LinkedIn"
                                className="hover:opacity-80 transition-colors"
                                style={{ color: '#0077B5' }}
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://calendly.com/ankesh-vibemonitor/meet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black px-6 py-3 rounded-full hover:opacity-90 transition-all font-medium"
                                style={{ backgroundColor: '#FED835' }}
                                aria-label="Schedule a chat with Ankesh Khemani, VibeMonitor founder"
                            >
                                Schedule a Chat
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default FounderNote;