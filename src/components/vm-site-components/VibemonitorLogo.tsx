'use client';

// Vibemonitor Logo Component
export function VibemonitorLogo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 175 175" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M87.5 172.5C134.444 172.5 172.5 134.444 172.5 87.5C172.5 40.5558 134.444 2.5 87.5 2.5C40.5558 2.5 2.5 40.5558 2.5 87.5C2.5 134.444 40.5558 172.5 87.5 172.5Z" 
        stroke="#31396D" 
        strokeWidth="4" 
        strokeDasharray="4 4"
      />
      <path 
        d="M87.5 152.5C123.399 152.5 152.5 123.399 152.5 87.5C152.5 51.6015 123.399 22.5 87.5 22.5C51.6015 22.5 22.5 51.6015 22.5 87.5C22.5 123.399 51.6015 152.5 87.5 152.5Z" 
        stroke="#4D53B9" 
        strokeWidth="4"
      />
      <path 
        d="M87.5 132.5C112.353 132.5 132.5 112.353 132.5 87.5C132.5 62.6472 112.353 42.5 87.5 42.5C62.6472 42.5 42.5 62.6472 42.5 87.5C42.5 112.353 62.6472 132.5 87.5 132.5Z" 
        stroke="#4D53B9" 
        strokeWidth="4"
      />
      <path 
        d="M10 88L70 88" 
        stroke="#FFD11B" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M104 88L164 88" 
        stroke="#FFD11B" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M87 12V72" 
        stroke="#FFD11B" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M87 104V164" 
        stroke="#FFD11B" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M87 97C91.9706 97 96 92.9706 96 88C96 83.0294 91.9706 79 87 79C82.0294 79 78 83.0294 78 88C78 92.9706 82.0294 97 87 97Z" 
        fill="#2C514D"
      />
      <path 
        d="M87 92C89.2091 92 91 90.2091 91 88C91 85.7909 89.2091 84 87 84C84.7909 84 83 85.7909 83 88C83 90.2091 84.7909 92 87 92Z" 
        fill="#FFD11B"
      />
    </svg>
  );
}
