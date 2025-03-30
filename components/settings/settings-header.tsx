import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function SettingsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}