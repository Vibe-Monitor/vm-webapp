import { redirect } from 'next/navigation'

export default function SettingsPage() {
  // Redirect to the default settings page (LLM Config)
  redirect('/settings/llm')
}
