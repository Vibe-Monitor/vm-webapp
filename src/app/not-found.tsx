'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0C1829 0%, #1a1f35 100%)',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(98, 102, 250, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 102, 250, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          opacity: 0.4
        }}
      />

      {/* Yellow Glow */}
      <div
        className="absolute pointer-events-none animate-pulse"
        style={{
          width: '800px',
          height: '800px',
          left: '-20%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(255, 207, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Purple Glow */}
      <div
        className="absolute pointer-events-none animate-pulse"
        style={{
          width: '700px',
          height: '700px',
          right: '-15%',
          bottom: '10%',
          background: 'radial-gradient(circle, rgba(163, 139, 244, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '1s'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-6 relative">
          <h1
            className="text-8xl sm:text-9xl font-extrabold"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 207, 0, 0.9) 0%, rgba(163, 139, 244, 0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            404
          </h1>
        </div>

        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4 text-center"
          style={{ color: '#F9FAFB', letterSpacing: '-0.02em' }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="text-base sm:text-lg mb-10 text-center max-w-lg"
          style={{ color: '#cbd5e1', lineHeight: '1.7' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 text-center"
            style={{
              background: 'linear-gradient(135deg, #6266fa 0%, #a38bf4 100%)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(98, 102, 250, 0.4)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(98, 102, 250, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(98, 102, 250, 0.4)';
            }}
          >
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#E5E7EB',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  )
}
