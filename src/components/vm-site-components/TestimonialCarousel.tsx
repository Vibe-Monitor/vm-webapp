'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    quote: "Saved 3 hours per incident",
    author: "Sarah K., Eng Manager at Scaleup X",
  },
  {
    quote: "Cut our MTTR by 80%",
    author: "David L., DevOps Lead at TechCorp",
  },
  {
    quote: "No more midnight firefighting",
    author: "Maya P., CTO at StartupHub",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-[#98A3B1] italic"
        >
          "{testimonials[current].quote}" — {testimonials[current].author}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
