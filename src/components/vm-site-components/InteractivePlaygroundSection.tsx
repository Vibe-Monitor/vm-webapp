'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function InteractivePlaygroundSection() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    setIsTyping(true);
    setShowResponse(false);
    
    setTimeout(() => {
      setIsTyping(false);
      setResponse(`🔍 Found: payment-service.js:234\n✅ Fix: Replace api.call() with api.retry()\n⚡ Time: 2.3s`);
      setShowResponse(true);
    }, 1500);
  };

  return (
    <section className="py-32 px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: '16px' }}>
            See It Work Right Now
          </h2>
          <p style={{ fontSize: '18px', color: '#98A3B1' }}>
            Try the AI-powered error detection in action
          </p>
        </motion.div>

        {/* Interactive Slack Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass p-8 lg:p-12"
          style={{ boxShadow: 'var(--glow-primary)' }}
        >
          {/* Slack Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#2F4257]">
            <div className="w-10 h-10 rounded-lg bg-[#6266FA] flex items-center justify-center">
              <span className="text-white" style={{ fontWeight: 700, fontSize: '16px' }}>
                VM
              </span>
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#E5E7EB', fontSize: '16px' }}>
                Vibemonitor Bot
              </p>
              <p style={{ fontSize: '12px', color: '#98A3B1' }}>
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-1" />
                Active
              </p>
            </div>
            <motion.div
              className="ml-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-[#FFD11B]" />
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <label style={{ fontSize: '14px', color: '#98A3B1', marginBottom: '8px', display: 'block' }}>
              Ask Vibemonitor to debug an error:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="@vibemonitor debug payment error"
                className="flex-1 px-4 py-3 rounded-xl bg-[#0F1828] border border-[#2F4257] text-[#E5E7EB] focus:border-[#6266FA] focus:outline-none transition-colors"
                style={{ fontSize: '15px' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-[#6266FA] hover:bg-[#5558E3] transition-colors flex items-center gap-2 relative"
                style={{ fontWeight: 600, color: '#E5E7EB' }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(98, 102, 250, 0.5)',
                    '0 0 30px rgba(98, 102, 250, 0.8)',
                    '0 0 20px rgba(98, 102, 250, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Send className="w-4 h-4" />
                Send
              </motion.button>
            </div>
          </div>

          {/* Response Area */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 py-4"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#6266FA]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '14px', color: '#98A3B1' }}>
                  Vibemonitor is analyzing...
                </span>
              </motion.div>
            )}

            {showResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(98, 102, 250, 0.1)',
                  border: '1px solid rgba(98, 102, 250, 0.3)',
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#6266FA] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                      VM
                    </span>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: '12px', color: '#98A3B1', marginBottom: '8px' }}>
                      Vibemonitor • Just now
                    </p>
                    <pre
                      className="whitespace-pre-wrap"
                      style={{
                        fontSize: '14px',
                        color: '#E5E7EB',
                        lineHeight: 1.8,
                        fontFamily: 'monospace',
                      }}
                    >
                      {response}
                    </pre>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#0F1828] border border-[#2F4257] hover:border-[#6266FA] transition-colors text-[#6266FA]"
                  style={{ fontSize: '13px', fontWeight: 600 }}
                >
                  Try in your Slack →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Examples */}
          {!showResponse && !isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              <p style={{ fontSize: '12px', color: '#98A3B1', width: '100%', marginBottom: '8px' }}>
                Try these:
              </p>
              {[
                '@vibemonitor check API errors',
                '@vibemonitor debug checkout',
                '@vibemonitor latest incidents',
              ].map((example, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setInput(example)}
                  className="px-3 py-1.5 rounded-lg bg-[#0F1828] border border-[#2F4257] hover:border-[#6266FA] transition-colors"
                  style={{ fontSize: '12px', color: '#98A3B1' }}
                >
                  {example}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
