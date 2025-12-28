'use client'

import { SettingsLayout } from '@/components/layouts'

export default function SettingsGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container max-w-6xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Space Settings</h1>
        <p className="text-muted-foreground">
          Configure LLM, team members, and billing for this space
        </p>
      </div>
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  )
}
