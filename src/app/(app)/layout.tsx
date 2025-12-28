import { AppLayout } from '@/components/layouts'

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
