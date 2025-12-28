import Auth from "@/components/auth/auth";

export default function AuthPage() {

  return (
  <div
    className="flex min-h-screen flex-col items-center justify-center bg-secondary"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(128, 128, 128, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(128, 128, 128, 0.08) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    }}
  >
    <Auth />
  </div>
  )
}