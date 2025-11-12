'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, FileText, Bell, BarChart2, X } from 'lucide-react';

const screenshots = [
  {
    icon: Activity,
    title: 'Servers Dashboard',
    description: 'Real-time status and alerts',
    details: 'Monitor all your servers in one unified view. See uptime, error rates, and active alerts at a glance.',
  },
  {
    icon: FileText,
    title: 'Error Detection',
    description: 'File path, line number, stack trace',
    details: 'Get precise error locations with full context. No more hunting through logs—jump straight to the problem.',
  },
  {
    icon: Bell,
    title: 'Slack Alert',
    description: 'Severity, location, timestamp',
    details: 'Receive actionable alerts in Slack with all the context your team needs to fix issues fast.',
  },
  {
    icon: BarChart2,
    title: 'Metrics View',
    description: 'Error graphs and traces',
    details: 'Visualize error patterns over time. Identify trends and prevent future incidents before they happen.',
  },
];

export function ScreenshotsSection() {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);

  return (
    <section className="relative px-8 py-24 bg-[#2D425A]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700, color: '#E5E7EB' }}>
            Visual Proof of Simplicity
          </h2>
          <p className="text-xl text-[#98A3B1]">
            Everything you need, nothing you don't
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedScreenshot(index)}
              className="bg-[#2D425A]/40 backdrop-blur-sm rounded-lg border border-[#3F4F67] hover:border-[#FFD11B] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Screenshot Preview */}
              <div className="relative h-48 bg-gradient-to-br from-[#0F1828] to-[#2D425A] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-[#FFD11B]/5" />
                <screenshot.icon className="w-16 h-16 text-[#FFD11B] relative z-10" />
                
                {/* Mock UI Elements */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  {[60, 80, 40].map((width, i) => (
                    <div
                      key={i}
                      className="h-2 bg-[#6266FA]/30 rounded"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl mb-2" style={{ fontWeight: 600, color: '#E5E7EB' }}>
                  {screenshot.title}
                </h3>
                <p className="text-sm text-[#98A3B1]" style={{ lineHeight: 1.5 }}>
                  {screenshot.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#FFD11B]">
                  <div className="w-2 h-2 bg-[#FFD11B] rounded-full" />
                  <span>Click to explore</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedScreenshot !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0F1828]/95 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedScreenshot(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#2D425A] rounded-lg border-2 border-[#FFD11B] max-w-4xl w-full max-h-[80vh] overflow-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#3F4F67]">
                  <div className="flex items-center gap-3">
                    {screenshots[selectedScreenshot] && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#FFD11B]/20 flex items-center justify-center">
                          {(() => {
                            const Icon = screenshots[selectedScreenshot].icon;
                            return <Icon className="w-5 h-5 text-[#FFD11B]" />;
                          })()}
                        </div>
                        <div>
                          <h3 className="text-xl text-[#E5E7EB]" style={{ fontWeight: 600 }}>
                            {screenshots[selectedScreenshot].title}
                          </h3>
                          <p className="text-sm text-[#98A3B1]">
                            {screenshots[selectedScreenshot].description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedScreenshot(null)}
                    className="w-8 h-8 rounded-full hover:bg-[#3F4F67] flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-[#98A3B1]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-[#0F1828] to-[#2D425A] rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#FFD11B]/5" />
                    {screenshots[selectedScreenshot] && (
                      (() => {
                        const Icon = screenshots[selectedScreenshot].icon;
                        return <Icon className="w-24 h-24 text-[#FFD11B] relative z-10" />;
                      })()
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F1828] to-transparent" />
                  </div>

                  {screenshots[selectedScreenshot] && (
                    <p className="text-[#E5E7EB]" style={{ lineHeight: 1.6 }}>
                      {screenshots[selectedScreenshot].details}
                    </p>
                  )}

                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-[#6266FA] hover:bg-[#4F53E5] text-[#E5E7EB] rounded-lg transition-colors">
                      Try in Demo
                    </button>
                    <button className="flex-1 px-6 py-3 border border-[#6266FA] text-[#6266FA] rounded-lg hover:bg-[#6266FA]/10 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#6266FA] hover:text-[#FFD11B] transition-colors"
          >
            <span>Explore in our demo Slack workspace</span>
            <Bell className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
