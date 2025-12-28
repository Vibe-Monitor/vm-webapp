import { SettingsLayout } from '@/components/layouts'

export default function SettingsGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SettingsLayout>{children}</SettingsLayout>
}
