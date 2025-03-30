import type { Metadata } from "next"
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"
export const metadata: Metadata = {
  title: "Settings | FinShield",
  description: "Configure system settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  )
}