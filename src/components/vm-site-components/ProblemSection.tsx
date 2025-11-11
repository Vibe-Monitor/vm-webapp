'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, Clock, DollarSign, Search, Users } from 'lucide-react';

export function ProblemSection() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="relative px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16"
          style={{ fontWeight: 700, color: '#E5E7EB' }}
        >
          You Know This Pain Too Well
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-[#2D425A]/30 rounded-lg p-8 border border-[#3F4F67] backdrop-blur-sm">
              {/* Slider Control */}
              <div className="relative h-12 mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-1 bg-[#3F4F67] rounded-full">
                    <motion.div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${sliderPosition}%` }}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFD11B] rounded-full border-2 border-[#0F1828] cursor-pointer shadow-lg"
                  style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>

              {/* Before Content */}
              <div
                className={`transition-opacity duration-300 ${
                  sliderPosition < 50 ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                  <h3 className="text-xl text-[#EF4444]" style={{ fontWeight: 600 }}>
                    Before Vibemonitor
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '2:00 PM', label: 'Deploy', icon: Clock },
                    { time: '5:00 PM', label: 'Customer Complaint', icon: AlertCircle },
                    { time: '6:30 PM', label: 'Manual Log Hunt', icon: Search },
                    { time: '8:00 PM', label: 'Finally Fixed', icon: CheckCircle },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-16 text-[#98A3B1]">{step.time}</div>
                      <div className="flex-1 h-px bg-[#EF4444]" />
                      <step.icon className="w-4 h-4 text-[#EF4444]" />
                      <div className="text-[#E5E7EB]">{step.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#EF4444]">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">3 hours delay + revenue loss</span>
                </div>
              </div>

              {/* After Content */}
              <div
                className={`transition-opacity duration-300 ${
                  sliderPosition >= 50 ? 'opacity-100' : 'opacity-30'
                } ${sliderPosition < 50 ? 'absolute top-8 left-8 right-8' : ''}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  <h3 className="text-xl text-[#10B981]" style={{ fontWeight: 600 }}>
                    With Vibemonitor
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '2:00 PM', label: 'Deploy', icon: Clock },
                    { time: '2:01 PM', label: 'Error Detected', icon: AlertCircle },
                    { time: '2:01 PM', label: 'Team Alerted', icon: Users },
                    { time: '2:05 PM', label: 'Fixed', icon: CheckCircle },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-16 text-[#98A3B1]">{step.time}</div>
                      <div className="flex-1 h-px bg-[#10B981]" />
                      <step.icon className="w-4 h-4 text-[#10B981]" />
                      <div className="text-[#E5E7EB]">{step.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#10B981]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">5 minutes total + customers happy</span>
                </div>
              </div>
            </div>

            <p className="text-center mt-4 text-sm text-[#98A3B1]">
              Drag to compare ←→
            </p>
          </motion.div>

          {/* Pain Points */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              {
                icon: AlertCircle,
                text: 'Errors hide until customers complain—losing trust and revenue.',
              },
              {
                icon: Search,
                text: 'Scattered logs mean hours of manual searching across servers.',
              },
              {
                icon: Clock,
                text: 'No clear view of affected services, slowing your team down.',
              },
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-4 p-6 bg-[#2D425A]/20 rounded-lg border border-[#3F4F67]/50"
              >
                <pain.icon className="w-6 h-6 text-[#FFD11B] flex-shrink-0 mt-1" />
                <p className="text-[#E5E7EB]" style={{ lineHeight: 1.5 }}>
                  {pain.text}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-[#3F4F67]"
            >
              <p className="text-xl text-[#FFD11B] text-center" style={{ fontWeight: 600 }}>
                Vibemonitor changes that—one alert, one fix.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
