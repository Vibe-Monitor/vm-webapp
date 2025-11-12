'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export function CountdownTimer() {
  const [count, setCount] = useState(73);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 99) return 50;
        return prev + 1;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D425A]/30 border border-[#FFD11B]/30">
      <Users className="w-4 h-4 text-[#FFD11B]" />
      <span className="text-sm text-[#FFD11B]">
        Join {count} of 100 teams this week
      </span>
    </div>
  );
}
