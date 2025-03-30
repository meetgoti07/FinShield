import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function AlertsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fraud Alerts</h1>
        <p className="text-muted-foreground">Review and manage detected suspicious activities</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Alerts
        </Button>
      </div>
    </div>
  )
}