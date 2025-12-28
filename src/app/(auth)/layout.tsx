import { AuthLayout } from '@/components/layouts'

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>
}
