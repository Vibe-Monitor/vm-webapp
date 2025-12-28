'use client'

import { SettingsLayout } from '@/components/layouts'

export default function SettingsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>
        <p className="text-[var(--color-text-secondary)]">
          Manage your account settings and preferences
        </p>
      </div>
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  )
}
