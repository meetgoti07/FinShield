import type { Metadata } from "next"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { AnalyticsHeader } from "@/components/analytics/analytics-header"
export const metadata: Metadata = {
  title: "Analytics | FinShield",
  description: "Fraud detection analytics and insights",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsDashboard />
    </div>
  )
}