'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)] px-4 py-8">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/images/VM_full.svg"
          alt="Vibe Monitor"
          width={150}
          height={40}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Auth card container */}
      <div className="w-full max-w-md">
        {children}
      </div>

      {/* Footer links */}
      <div className="mt-8 flex gap-4 text-sm text-[var(--color-text-tertiary)]">
        <Link
          href="/terms"
          className="hover:text-[var(--color-text-secondary)] transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[var(--color-text-secondary)] transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/contact"
          className="hover:text-[var(--color-text-secondary)] transition-colors"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}
