'use client'

import * as React from 'react'
import Header from '@/vm-site-landing/components/Header'
import Footer from '@/vm-site-landing/components/Footer'

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  // Override body background for public/landing pages
  React.useEffect(() => {
    document.body.style.background = '#ffffff'
    document.body.style.color = '#171717'

    return () => {
      document.body.style.background = ''
      document.body.style.color = ''
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#ffffff', color: '#171717' }}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
