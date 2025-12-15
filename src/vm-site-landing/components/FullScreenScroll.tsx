'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import '@/vm-site-landing/types/global';

// Custom hook for media query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

interface FullScreenScrollProps {
  children: React.ReactNode[];
  sectionIds: string[];
}

const FullScreenScroll: React.FC<FullScreenScrollProps> = ({ children, sectionIds }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const scrollToSection = useCallback((index: number) => {
    if (index >= 0 && index < children.length) {
      const section = document.getElementById(sectionIds[index]);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [children.length, sectionIds]);

  // Intersection Observer to track current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionIds.indexOf(entry.target.id);
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex);
            }
          }
        });
      },
      {
        threshold: 0.5, // Section is considered "current" when 50% visible
        rootMargin: '-10% 0px -10% 0px' // Adds some buffer
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  // Keyboard navigation only - let trackpad use native scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(children.length - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, scrollToSection, children.length]);

  return (
    <>
      {/* Navigation Dots - Desktop Only */}
      <div className="hidden md:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'scale-125 shadow-lg'
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
            }`}
            style={currentSection === index ? { backgroundColor: '#FED835' } : {}}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Sections with native scroll-snap */}
      {children.map((child, index) => (
        <section
          key={index}
          id={sectionIds[index]}
          className="scroll-snap-section min-h-screen flex items-center justify-start flex-col"
        >
          {child}
        </section>
      ))}

      {/* Scroll Hint - Desktop Only */}
      {isDesktop && currentSection < children.length - 1 && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll or use arrow keys</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xl"
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FullScreenScroll;