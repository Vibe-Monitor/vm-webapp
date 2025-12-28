import { redirect } from 'next/navigation'

export default function SettingsPage() {
  // Redirect to the default settings page
  redirect('/settings/integrations')
}
