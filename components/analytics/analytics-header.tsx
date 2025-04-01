import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Fraud detection metrics and insights</p>
      </div>

    </div>
  )
}